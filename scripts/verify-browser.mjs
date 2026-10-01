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
const mediaSource = await readFile('content/site-content.ts', 'utf8') + await readFile('content/brand-content.ts', 'utf8');
const assets = [...new Set([...mediaSource.matchAll(/(?:src|wechatQrImage):\s*['"]([^'"]+)['"]/g)].map((match) => match[1]))];
assets.push('images/brands/didi.svg', 'images/brands/zeekr.svg');
await mkdir('outputs/refresh-20260930', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--mute-audio', '--autoplay-policy=document-user-activation-required'] });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport, isMobile: viewport.width < 640, hasTouch: viewport.width < 900, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    // Observe the actual audio graph without exposing a debug API on the site.
    await page.addInitScript(() => {
      window.__audioContexts = [];
      const NativeAudioContext = window.AudioContext;
      window.AudioContext = class extends NativeAudioContext {
        constructor(...args) {
          // Render the real graph into Chromium's silent sink. This avoids
          // depending on (or changing) the user's Mac audio output device.
          super({ ...args[0], sinkId: { type: 'none' } });
          window.__audioContexts.push(this);
          const originalCreateGain = this.createGain.bind(this);
          this.createGain = () => {
            const gain = originalCreateGain();
            const connect = gain.connect.bind(gain);
            gain.connect = (destination, ...ports) => {
              if (destination === this.destination) {
                const analyser = this.createAnalyser();
                analyser.fftSize = 2048;
                window.__musicAnalyser = analyser;
                connect(analyser);
                analyser.connect(destination);
                return destination;
              }
              return connect(destination, ...ports);
            };
            return gain;
          };
        }
      };
    });
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
    assert.equal(await page.evaluate(() => window.__audioContexts.length), 1, 'Autoplay should be attempted once');
    assert.equal(await page.evaluate(() => window.__audioContexts[0].state), 'closed', 'Release blocked autoplay audio resources before a gesture');
    assert.equal(await page.getByRole('button', { name: '开启音乐', exact: true }).getAttribute('aria-pressed'), 'false');
    const sections = await page.locator('main section.hero, main section.chapter, main section.contact-section').evaluateAll((nodes) => nodes.map((node) => node.id || 'hero'));
    assert.deepEqual(sections, ['hero', 'education', 'about', 'work', 'projects', 'ai', 'exploration', 'contact']);
    // Reading without interaction is the primary user journey, not a fallback.
    for (const id of ['panel-work', 'panel-projects', 'panel-ai']) assert(await page.locator(`#${id}`).isVisible(), `${id} must be readable without a click`);
    assert.equal(await page.locator('.phase-content').count(), 3);
    assert.equal(await page.locator('.ai-case-readthrough').count(), 2);
    assert.equal(await page.locator('svg.research-svg[role="img"]').count(), 6);
    for (const figure of await page.locator('.research-figure').all()) {
      assert(await figure.isVisible(), 'Research diagrams remain visible without clicking');
      assert.equal(await figure.locator('svg title').count(), 1);
      assert.equal(await figure.locator('svg desc').count(), 1);
    }
    assert.match(await page.locator('#risk-phase-2 .research-svg').textContent(), /Score-only.*Raw-all.*Hybrid.*PySpark GBT/s);
    assert.match(await page.locator('#field-governance-detail-0').textContent(), /稳定解析/);
    for (const node of await page.locator('.process-detail').all()) assert(await node.isVisible(), 'No workflow description may be gated behind a click');
    const palette = await page.evaluate(() => ({ accent: getComputedStyle(document.documentElement).getPropertyValue('--blue').trim(), background: getComputedStyle(document.body).backgroundColor }));
    assert.equal(palette.accent, '#8e5737');
    assert.equal(palette.background, 'rgb(251, 249, 244)');
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
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.locator(`#${id}`).evaluate((node) => window.scrollTo(0, node.getBoundingClientRect().top + scrollY - 84));
      await page.waitForTimeout(120);
      if (id === 'work') {
        await page.waitForFunction(() => [...document.querySelectorAll('.company-brand-visual img')].every((image) => image.complete && image.naturalWidth > 0));
        for (const frame of await page.locator('.brand-reference-image').all()) {
          assert(await frame.evaluate((node) => {
            const outer = node.getBoundingClientRect();
            const image = node.querySelector('img').getBoundingClientRect();
            return Math.abs(outer.top - image.top) < 1 && Math.abs(outer.height - image.height) < 1 && Math.abs(outer.width - image.width) < 1;
          }), 'Brand images must stay inside their own frames, not cover company titles');
        }
      }
      if (['work', 'projects', 'ai'].includes(id)) {
        assert.equal(await page.locator(`#tab-${id}`).getAttribute('aria-current'), 'location', 'Directory must follow scrolling');
        assert(await page.locator(`.nav-links a[href="#${id}"]`).evaluate((node) => node.classList.contains('active')), 'Main navigation must follow scrolling');
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id}: horizontal overflow at ${viewport.width}`);
      if (['work', 'projects', 'education', 'exploration', 'contact'].includes(id)) await page.screenshot({ path: `outputs/refresh-20260930/${viewport.width}-${id}.png` });
    }
    await page.locator('#tab-projects').click();
    assert.equal(await page.locator('#panel-projects').isVisible(), true);
    assert.equal(await page.locator('#panel-work').isVisible(), true);
    assert.equal(await page.locator('#panel-ai').isVisible(), true);
    await page.getByRole('button', { name: '专注浏览', exact: true }).click();
    await page.locator('#tab-projects').click();
    assert.equal(await page.locator('#panel-work').isVisible(), false);
    assert.equal(await page.locator('#panel-projects').isVisible(), true);
    await page.getByRole('button', { name: '连续阅读', exact: true }).click();
    for (const id of ['panel-work', 'panel-projects', 'panel-ai']) assert(await page.locator(`#${id}`).isVisible());
    assert.match(await page.locator('#risk-pattern').innerText(), /30页/);
    await page.getByRole('button', { name: '02 · 解释候选与策略', exact: true }).click();
    assert.match(await page.locator('#risk-phase-1').innerText(), /订单级覆盖/);
    await page.locator('#risk-phase-1 .process-nodes button').nth(1).click();
    assert.match(await page.locator('#risk-phase-1 .process-detail').nth(1).innerText(), /任一事件曾达到/);
    assert(await page.locator('#risk-phase-0').isVisible());
    await page.getByRole('button', { name: '03 · 模型发现与审计', exact: true }).click();
    await page.locator('#risk-phase-2 .process-nodes button').last().click();
    assert.match(await page.locator('#risk-phase-2 .process-detail').last().innerText(), /阻断 OOT/);
    await page.locator('#risk-phase-2').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `outputs/refresh-20260930/${viewport.width}-diagram.png` });
    const figureCaptureStyle = '.site-header, .workspace-tabs, .ambient-music { visibility: hidden !important; }';
    await page.locator('#risk-phase-2 .research-figure').screenshot({ path: `outputs/refresh-20260930/${viewport.width}-research-model.png`, style: figureCaptureStyle });
    await page.locator('#ai-case-0 .research-figure').screenshot({ path: `outputs/refresh-20260930/${viewport.width}-research-ai.png`, style: figureCaptureStyle });
    await page.locator('#feature-research .research-figure').screenshot({ path: `outputs/refresh-20260930/${viewport.width}-research-fields.png`, style: figureCaptureStyle });
    if (viewport.width < 900) {
      const pan = page.locator('#risk-phase-2 .research-pan');
      await pan.evaluate((node) => { node.scrollLeft = node.scrollWidth; });
      assert(await pan.evaluate((node) => node.scrollLeft > 0), 'Mobile diagrams must pan inside their own container');
      await pan.evaluate((node) => { node.scrollLeft = 0; });
    }
    assert.match(await page.locator('#feature-research').innerText(), /钱包字段\s+尚未做/);
    await page.locator('#tab-ai').click();
    await page.locator('.project-ai .process-nodes button').nth(1).click();
    assert.match(await page.locator('#ai-case-0 .process-detail').nth(1).innerText(), /PySpark GBT/);
    await page.getByRole('button', {name: '字段治理的协作约束', exact: true}).click();
    assert.match(await page.locator('.project-ai').innerText(), /钱包未做/);
    await page.locator('#tab-ai').focus();
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#ai');
    for (const id of ['panel-work', 'panel-projects', 'panel-ai']) assert(await page.locator(`#${id}`).isVisible());
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
    assert.equal(await page.evaluate(() => window.__audioContexts.length), 1, 'Do not duplicate the autoplay audio context');
    await page.getByRole('button', { name: '开启音乐', exact: true }).click();
    await page.getByRole('button', { name: '暂停音乐', exact: true }).waitFor();
    await page.waitForTimeout(1600);
    const signal = await page.evaluate(() => {
      const samples = new Float32Array(window.__musicAnalyser.fftSize);
      window.__musicAnalyser.getFloatTimeDomainData(samples);
      return { state: window.__audioContexts.at(-1).state, peak: Math.max(...samples.map(Math.abs)), rms: Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length) };
    });
    assert.equal(signal.state, 'running');
    assert(signal.rms > .00001 && signal.peak < .5, `Music must generate a restrained, non-clipped signal: ${JSON.stringify(signal)}`);
    await page.getByRole('button', { name: '音乐设置', exact: true }).click();
    await page.locator('#music-volume').fill('0');
    await page.waitForTimeout(700);
    assert.equal(await page.locator('#music-volume').inputValue(), '0');
    assert(await page.evaluate(() => {
      const samples = new Float32Array(window.__musicAnalyser.fftSize);
      window.__musicAnalyser.getFloatTimeDomainData(samples);
      return Math.max(...samples.map(Math.abs)) < .001;
    }), 'Zero volume must actually mute the signal');
    await page.locator('#music-volume').fill('25');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Music panel must fit mobile');
    await page.screenshot({ path: `outputs/refresh-20260930/${viewport.width}-music.png` });
    await page.getByRole('button', { name: '收起音乐设置' }).click();
    await page.getByRole('button', { name: '暂停音乐', exact: true }).click();
    await page.waitForFunction(() => window.__audioContexts.at(-1).state === 'suspended');
    await page.getByRole('button', { name: '开启音乐', exact: true }).click();
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.waitForFunction(() => window.__audioContexts.at(-1).state === 'suspended');
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
    });
    assert.equal(await page.getByRole('button', { name: '开启音乐', exact: true }).getAttribute('aria-pressed'), 'false', 'Returning to the page must not restart music');
    assert.equal(await page.evaluate(() => window.__audioContexts.filter((context) => context.state !== 'closed').length), 1, 'Only keep one live audio engine');
    const images = await page.locator('img').evaluateAll((nodes) => nodes.map((node) => ({ src: node.getAttribute('src'), loaded: node.complete && node.naturalWidth > 0 })));
    assert(images.every((image) => image.loaded), `Unloaded images: ${JSON.stringify(images)}`);
    if (viewport.width < 900) {
      await page.locator('.mobile-nav summary').click();
      await page.locator('.mobile-nav a[href="#projects"]').click();
      assert.equal(new URL(page.url()).hash, '#projects');
      assert.equal(await page.locator('.mobile-nav').evaluate((node) => node.open), false);
    }
    assert.deepEqual(errors, [], 'Client JavaScript errors');
    results.push({ url: siteUrl, viewport, sections, images: images.length, audioSignal: signal, checks: 'continuous content; 6 research diagrams and mobile panning; brand imagery; warm palette; navigation/carousel/clipboard/QR; autoplay blocked fallback, volume, pause, background suspend', passed: true });
    await context.close();
  }
  // Motion enabled: content becomes visible as it enters the viewport.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(siteUrl, { waitUntil: 'networkidle' });
  for (const id of ['work', 'projects', 'ai', 'exploration', 'education', 'about', 'contact']) {
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
  assert.equal(await noJsPage.locator('.phase-content').count(), 3);
  for (const node of await noJsPage.locator('.process-detail').all()) assert(await node.isVisible());
  await noJs.close();
} finally {
  await browser.close();
}
// Test the allowed-autoplay path too, always muted at the operating-system level.
const autoplayBrowser = await chromium.launch({ headless: true, args: ['--mute-audio', '--autoplay-policy=no-user-gesture-required'] });
try {
  const page = await autoplayBrowser.newPage();
  await page.addInitScript(() => {
    const Original = window.AudioContext;
    window.AudioContext = class extends Original {
      constructor(...args) {
        super({ ...args[0], sinkId: { type: 'none' } });
        window.__autoplayContext = this;
        const createGain = this.createGain.bind(this);
        this.createGain = () => {
          const gain = createGain();
          const connect = gain.connect.bind(gain);
          gain.connect = (destination, ...ports) => {
            if (destination === this.destination) {
              const analyser = this.createAnalyser();
              analyser.fftSize = 2048;
              window.__autoplayAnalyser = analyser;
              connect(analyser);
              analyser.connect(destination);
              return destination;
            }
            return connect(destination, ...ports);
          };
          return gain;
        };
      }
    };
  });
  await page.goto(siteUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '暂停音乐', exact: true }).waitFor({ timeout: 10000 });
  assert.equal(await page.getByRole('button', { name: '暂停音乐', exact: true }).getAttribute('aria-pressed'), 'true', 'Allowed autoplay starts without a click');
  await page.waitForFunction(() => window.__autoplayContext?.currentTime > 1, undefined, { timeout: 5000 });
  const autoplaySignal = await page.evaluate(() => {
    const samples = new Float32Array(window.__autoplayAnalyser.fftSize);
    window.__autoplayAnalyser.getFloatTimeDomainData(samples);
    return { state: window.__autoplayContext.state, peak: Math.max(...samples.map(Math.abs)), rms: Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length) };
  });
  assert(autoplaySignal.rms > .00001 && autoplaySignal.peak < .5, 'Allowed autoplay must render actual audio, not just change button text');
  const report = { passed: true, results, allowedAutoplay: { withoutInteraction: true, audioSignal: autoplaySignal, passed: true } };
  await writeFile('outputs/refresh-20260930/browser-result.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally { await autoplayBrowser.close(); }
