// Headless regression checks. Never attaches to a user's foreground browser.
// npm install --no-save playwright is optional; a bundled module can be supplied
// with PORTFOLIO_PLAYWRIGHT_MODULE, without adding a project dependency.
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || 'playwright');
const siteUrl = process.argv[2] || 'http://127.0.0.1:3100/';
const results = [];
const mediaSource = await readFile('content/site-content.ts', 'utf8');
const assets = [...new Set([...mediaSource.matchAll(/(?:src|wechatQrImage):\s*['"]([^'"]+)['"]/g)].map((match) => match[1]))];
assets.push('images/brands/didi.svg', 'images/brands/zeekr.svg');
await mkdir('outputs/refresh-20260930', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport, isMobile: viewport.width < 640, hasTouch: viewport.width < 900, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(siteUrl, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, 'Public HTML must load');
    if (viewport.width === 1440) {
      await Promise.all(assets.map(async (asset) => {
        const assetResponse = await context.request.get(new URL(asset, siteUrl).href);
        assert.equal(assetResponse.status(), 200, `Missing public asset: ${asset}`);
        assert.match(assetResponse.headers()['content-type'], /^image\//, `Wrong public asset type: ${asset}`);
      }));
    }
    await page.waitForFunction(() => document.querySelector('.hero-role') && getComputedStyle(document.querySelector('.hero-role')).fontSize !== '16px');
    await page.waitForFunction(() => [...document.querySelectorAll('.hero img')].every((image) => image.complete && image.naturalWidth > 0));
    await page.locator('.hero img').evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
    await page.waitForTimeout(150);
    const sections = await page.locator('main section.hero, main section.chapter, main section.contact-section').evaluateAll((nodes) => nodes.map((node) => node.id || 'hero'));
    assert.deepEqual(sections, ['hero', 'education', 'about', 'work', 'projects', 'ai', 'exploration', 'contact']);
    assert.match(await page.locator('#projects').textContent(), /PySpark GBT/);
    assert.match(await page.locator('#exploration').innerText(), /约183万/);
    assert.match(await page.locator('#exploration').innerText(), /2026-09-30/);
    assert.match(await page.locator('#education').innerText(), /GPA 3.93/);
    assert.match(await page.locator('.career-secondary').innerText(), /3000\+/);
    assert.match(await page.locator('.career-secondary').innerText(), /约 5 分钟/);
    assert.match(await page.locator('#education').innerText(), /挑战杯国家级特等奖（国赛前3%）/);
    assert.equal(await page.locator('meta[property="og:image"]').count(), 1);
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
    const anchors = await page.locator('a[href^="#"]').evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href')));
    for (const anchor of anchors) assert.equal(await page.locator(`[id="${anchor.slice(1)}"]`).count(), 1, `Broken anchor: ${anchor}`);
    await page.screenshot({ path: `outputs/refresh-20260930/${viewport.width}-hero.png` });
    for (const id of ['work', 'projects', 'ai', 'exploration', 'education', 'about', 'contact']) {
      if (['work', 'projects', 'ai'].includes(id)) await page.locator(`#tab-${id}`).click();
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.locator(`#${id}`).evaluate((node) => window.scrollTo(0, node.getBoundingClientRect().top + scrollY - 84));
      await page.waitForTimeout(120);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id}: horizontal overflow at ${viewport.width}`);
      if (['work', 'projects', 'education', 'exploration', 'contact'].includes(id)) await page.screenshot({ path: `outputs/refresh-20260930/${viewport.width}-${id}.png` });
    }
    await page.locator('#tab-projects').click();
    assert.equal(await page.locator('#panel-projects').isVisible(), true);
    assert.equal(await page.locator('#panel-work').isVisible(), false);
    assert.match(await page.locator('#risk-pattern').innerText(), /30页/);
    await page.getByRole('button', { name: '02 · 解释候选与策略', exact: true }).click();
    assert.match(await page.locator('.phase-content').innerText(), /订单级覆盖/);
    await page.locator('.phase-content .process-nodes button').nth(1).click();
    assert.match(await page.locator('.phase-content .process-detail').innerText(), /任一事件曾达到/);
    await page.getByRole('button', { name: '03 · 模型发现与审计', exact: true }).click();
    await page.locator('.phase-content .process-nodes button').last().click();
    assert.match(await page.locator('.phase-content .process-detail').innerText(), /阻断 OOT/);
    await page.locator('.phase-content').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `outputs/refresh-20260930/${viewport.width}-diagram.png` });
    assert.match(await page.locator('#feature-research').innerText(), /钱包字段\s+尚未做/);
    await page.locator('#tab-ai').click();
    await page.locator('.project-ai .process-nodes button').nth(1).click();
    assert.match(await page.locator('.project-ai .process-detail').innerText(), /PySpark GBT/);
    await page.getByRole('button', {name: '字段治理的协作约束', exact: true}).click();
    assert.match(await page.locator('.project-ai').innerText(), /钱包未做/);
    await page.locator('#tab-ai').focus();
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#tab-projects').getAttribute('aria-selected'), 'true');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'tab-projects');
    await page.getByRole('button', { name: '下一张生活照片' }).click();
    assert.match(await page.locator('.carousel-controls').innerText(), /02/);
    await page.getByRole('button', { name: '复制邮箱', exact: true }).click();
    await page.getByRole('status').filter({ hasText: '已复制' }).waitFor();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), '19357506009@163.com');
    assert.equal(await page.getByRole('link', { name: /发送邮件/ }).getAttribute('href'), 'mailto:19357506009@163.com');
    await page.getByRole('button', { name: /微信联系/ }).click();
    await page.getByRole('dialog').waitFor();
    await page.waitForFunction(() => document.querySelector('.wechat-qr img')?.naturalWidth > 0);
    assert(await page.getByRole('dialog').evaluate((node) => node.getBoundingClientRect().width <= innerWidth));
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), '关闭微信二维码');
    await page.screenshot({ path: `outputs/refresh-20260930/${viewport.width}-wechat.png` });
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    const images = await page.locator('img').evaluateAll((nodes) => nodes.map((node) => ({ src: node.getAttribute('src'), loaded: node.complete && node.naturalWidth > 0 })));
    assert(images.every((image) => image.loaded), `Unloaded images: ${JSON.stringify(images)}`);
    if (viewport.width < 900) {
      await page.locator('.mobile-nav summary').click();
      await page.locator('.mobile-nav a[href="#projects"]').click();
      assert.equal(new URL(page.url()).hash, '#projects');
      assert.equal(await page.locator('.mobile-nav').evaluate((node) => node.open), false);
    }
    assert.deepEqual(errors, [], 'Client JavaScript errors');
    results.push({ url: siteUrl, viewport, sections, images: images.length, checks: 'HTML/CSS, anchors, overflow, workspace tabs/keyboard, research stages/process nodes, scope, carousel, clipboard, mailto, QR, mobile menu', passed: true });
    await context.close();
  }
  // Motion enabled: content becomes visible as it enters the viewport.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(siteUrl, { waitUntil: 'networkidle' });
  for (const id of ['work', 'projects', 'ai', 'exploration', 'education', 'about', 'contact']) {
    if (['work', 'projects', 'ai'].includes(id)) await page.locator(`#tab-${id}`).click();
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const candidates = page.locator(`#${id}[data-reveal], #${id} [data-reveal]`);
    for (const element of await candidates.all()) {
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      assert.equal(await element.evaluate((node) => getComputedStyle(node).opacity), '1', `${id}: hidden reveal content`);
    }
  }
  await context.close();
  // Without JavaScript the public content must stay readable, not reveal as blank.
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(siteUrl, { waitUntil: 'networkidle' });
  assert.equal(await noJsPage.locator('#work [data-reveal]').first().evaluate((node) => getComputedStyle(node).opacity), '1');
  assert.equal(await noJsPage.locator('#contact').evaluate((node) => getComputedStyle(node).opacity), '1');
  await noJs.close();
  await writeFile('outputs/refresh-20260930/browser-result.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ passed: true, results }));
} finally {
  await browser.close();
}
