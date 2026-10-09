// Headless portal regression: no foreground browser or audible system output.
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || 'playwright');
const siteUrl = process.argv[2] || 'http://127.0.0.1:3100/';
const output = 'outputs/refresh-20260930';
await mkdir(output, { recursive: true });
const media = await readFile('content/site-content.ts', 'utf8') + await readFile('content/brand-content.ts', 'utf8');
const assets = [...new Set([...media.matchAll(/(?:src|wechatQrImage):\s*['"]([^'"]+)['"]/g)].map((m) => m[1]))];
assets.push('images/brands/didi.svg', 'images/brands/zeekr.svg', 'images/portal-share.png');
const launch = { headless: true, ...(process.env.PORTFOLIO_CHROMIUM ? { executablePath: process.env.PORTFOLIO_CHROMIUM } : {}), args: ['--mute-audio', '--autoplay-policy=document-user-activation-required'] };
const browser = await chromium.launch(launch);
const results = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport, isMobile: viewport.width < 640, hasTouch: viewport.width < 900, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__audioContexts = [];
      const Native = window.AudioContext;
      window.AudioContext = class extends Native {
        constructor(...args) {
          super({ ...args[0], sinkId: { type: 'none' } }); window.__audioContexts.push(this);
          const createGain = this.createGain.bind(this);
          this.createGain = () => {
            const gain = createGain(), connect = gain.connect.bind(gain);
            gain.connect = (destination, ...ports) => {
              if (destination === this.destination) { const analyser = this.createAnalyser(); analyser.fftSize = 2048; window.__musicAnalyser = analyser; connect(analyser); analyser.connect(destination); return destination; }
              return connect(destination, ...ports);
            }; return gain;
          };
        }
      };
    });
    const errors = []; page.on('pageerror', (error) => errors.push(error.message));
    assert.equal((await page.goto(siteUrl, { waitUntil: 'networkidle' })).status(), 200);
    if (viewport.width === 1440) await Promise.all(assets.map(async (asset) => { const r = await context.request.get(new URL(asset, siteUrl).href); assert.equal(r.status(), 200, asset); assert.match(r.headers()['content-type'], /^image\//, asset); }));
    await page.waitForFunction(() => [...document.querySelectorAll('.hero img')].every((image) => image.complete && image.naturalWidth > 0));
    assert.equal(await page.getByRole('heading', { name: '沈鑫达', exact: true }).count(), 1);
    assert.equal(await page.locator('.hero .actions a').count(), 3);
    assert(await page.evaluate(() => document.querySelector('.hero-copy > .eyebrow').getBoundingClientRect().bottom <= document.querySelector('.hero h1').getBoundingClientRect().top), 'Hero label and name must not overlap');
    assert.match(await page.locator('.hero').innerText(), /2028年毕业.*2027届校招/);
    assert.match(await page.locator('#education').innerText(), /2028年毕业.*2027届校招/s);
    assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /2028年毕业.*2027届校招/);
    assert.equal(await page.locator('.portrait-aperture').evaluate((n) => getComputedStyle(n).animationName), 'none');
    assert.equal(await page.evaluate(() => window.__audioContexts.length), 0, 'Music waits for visitor consent');
    if (viewport.width < 640) assert(await page.locator('.hero .actions').evaluate((n) => n.getBoundingClientRect().bottom <= innerHeight - 30), 'Mobile first-screen CTAs');
    assert.equal(await page.locator('.hero-proof a').count(), 3);
    assert.equal(await page.locator('.portrait-frame img').evaluate((n) => getComputedStyle(n).objectPosition), '50% 100%');
    for (const company of ['didi', 'zeekr']) assert.equal(await page.locator(`.internship-${company} .internship-bullets > li`).count(), 4);
    assert.match(await page.locator('.internship-didi').innerText(), /Pattern Agent/);
    for (const metric of ['3000+', '20万+', '20+', '约3小时 → 约5分钟']) assert((await page.locator('.internship-zeekr').innerText()).includes(metric));
    assert.equal(await page.locator('.portal-project').count(), 2);
    assert.match(await page.locator('.portal-project').first().innerText(), /PySpark GBT.*OOT.*Rej→Pass/s);
    assert.match(await page.locator('.portal-project').last().innerText(), /钱包字段尚未做/);
    assert.equal(await page.locator('#research-details').getAttribute('open'), null);
    assert.equal(await page.locator('#risk-pattern').isVisible(), false);
    assert.equal(await page.locator('#ai details').count(), 0, 'Core AI collaboration is never gated by a disclosure');
    assert.equal(await page.locator('#ai .ai-case-readthrough').count(), 2);
    for (const item of await page.locator('#ai .ai-case-readthrough').all()) assert(await item.isVisible(), 'Both AI projects are visible without clicking');
    for (const anchor of await page.locator('a[href^="#"]').evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href')))) assert.equal(await page.locator(`[id="${anchor.slice(1)}"]`).count(), 1, anchor);
    assert(!/PDF|简历下载|RESUME/.test(await page.locator('main').innerText()));
    assert.match(await page.title(), /统计.*风险决策.*AI 创作/);
    assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href, 'https://archimedas0612.github.io/');
    assert.equal(await page.locator('meta[property="og:image"]').count(), 1);
    assert.equal(await page.locator('#exploration a').getAttribute('href'), 'https://www.xiaohongshu.com/user/profile/5c5054a7000000001000b66e');
    assert.equal(await page.locator('a[href*="douyin.com/user/self"]').count(), 0);
    assert.match(await page.locator('#exploration').innerText(), /210万\+.*5万\+.*2026-10-07/s);
    assert.match(await page.locator('#exploration').innerText(), /尚未作为已发布作品/);
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(251, 249, 244)');
    await page.screenshot({ path: `${output}/${viewport.width}-hero.png` });
    for (const id of ['internships', 'education', 'about', 'projects', 'ai', 'exploration', 'contact']) { await page.locator(`#${id}`).scrollIntoViewIfNeeded(); await page.waitForTimeout(120); assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} overflow ${viewport.width}`); await page.screenshot({ path: `${output}/${viewport.width}-${id}.png` }); }
    await page.locator('#research-details > summary').click(); assert(await page.locator('#risk-pattern').isVisible());
    assert.equal(await page.locator('#research-details .research-svg[role="img"]').count(), 4);
    await page.getByRole('button', { name: '03 · 模型发现与审计', exact: true }).click();
    assert.match(await page.locator('#risk-phase-2 .research-svg').textContent(), /PySpark GBT/);
    await page.locator('#risk-phase-2 .process-nodes button').last().click(); assert.match(await page.locator('#risk-phase-2 .process-detail').last().innerText(), /阻断 OOT/);
    assert.match(await page.locator('#field-governance-detail-0').innerText(), /稳定解析/);
    if (viewport.width < 900) { const pan = page.locator('#risk-phase-2 .research-pan'); await pan.evaluate((n) => { n.scrollLeft = n.scrollWidth; }); assert(await pan.evaluate((n) => n.scrollLeft > 0)); }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator('#research-details > summary').click();
    assert.equal(await page.locator('#ai .research-svg[role="img"]').count(), 2);
    for (const kind of ['experiment-feedback-loop', 'semantic-evidence-atlas']) assert.equal(await page.locator(`[data-diagram-layout="${kind}"]`).count(), 1);
    for (const f of await page.locator('#ai .research-figure').all()) { assert.equal(await f.locator('svg title').count(), 1); assert.equal(await f.locator('svg desc').count(), 1); }
    await page.getByRole('button', { name: '下一张生活照片' }).click(); assert.match(await page.locator('.carousel-controls').innerText(), /02/);
    await page.getByRole('button', { name: '复制邮箱', exact: true }).click(); await page.getByRole('status').filter({ hasText: '已复制' }).waitFor(); assert.equal(await page.evaluate(() => navigator.clipboard.readText()), '19357506009@163.com');
    assert.equal(await page.getByRole('link', { name: /发送邮件/ }).getAttribute('href'), 'mailto:19357506009@163.com');
    await page.getByRole('button', { name: /微信联系/ }).click(); await page.waitForFunction(() => document.querySelector('.wechat-qr img')?.naturalWidth > 0);
    assert(await page.getByRole('dialog').evaluate((n) => { const r = n.getBoundingClientRect(); return r.width <= innerWidth && r.height <= innerHeight; }));
    await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), '关闭微信二维码'); await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').count(), 0);
    await page.getByRole('button', { name: '开启音乐', exact: true }).click(); await page.getByRole('button', { name: '暂停音乐', exact: true }).waitFor(); await page.waitForTimeout(1600);
    const signal = await page.evaluate(() => { const s = new Float32Array(window.__musicAnalyser.fftSize); window.__musicAnalyser.getFloatTimeDomainData(s); return { state: window.__audioContexts.at(-1).state, peak: Math.max(...s.map(Math.abs)), rms: Math.sqrt(s.reduce((a, v) => a + v * v, 0) / s.length) }; });
    assert.equal(signal.state, 'running'); assert(signal.rms > .00001 && signal.peak < .5, JSON.stringify(signal));
    await page.getByRole('button', { name: '音乐设置', exact: true }).click(); await page.locator('#music-volume').fill('0'); await page.waitForTimeout(700);
    assert(await page.evaluate(() => { const s = new Float32Array(window.__musicAnalyser.fftSize); window.__musicAnalyser.getFloatTimeDomainData(s); return Math.max(...s.map(Math.abs)) < .001; }));
    await page.locator('#music-volume').fill('25'); await page.getByRole('button', { name: '收起音乐设置' }).click(); await page.getByRole('button', { name: '暂停音乐', exact: true }).click(); await page.waitForFunction(() => window.__audioContexts.at(-1).state === 'suspended');
    await page.getByRole('button', { name: '开启音乐', exact: true }).click(); await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); }); await page.waitForFunction(() => window.__audioContexts.at(-1).state === 'suspended');
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); }); assert.equal(await page.getByRole('button', { name: '开启音乐', exact: true }).getAttribute('aria-pressed'), 'false'); assert.equal(await page.evaluate(() => window.__audioContexts.length), 1);
    const images = await page.locator('img').evaluateAll((nodes) => nodes.map((n) => ({ src: n.getAttribute('src'), loaded: n.complete && n.naturalWidth > 0 }))); assert(images.every((i) => i.loaded), JSON.stringify(images));
    if (viewport.width < 900) { await page.locator('.mobile-nav summary').click(); await page.locator('.mobile-nav a[href="#projects"]').click(); assert.equal(new URL(page.url()).hash, '#projects'); assert.equal(await page.locator('.mobile-nav').evaluate((n) => n.open), false); }
    assert.deepEqual(errors, []); results.push({ viewport, images: images.length, audioSignal: signal, passed: true }); await context.close();
  }
  const motion = await browser.newContext({ viewport: { width: 1440, height: 900 } }); const p = await motion.newPage(); await p.goto(siteUrl, { waitUntil: 'networkidle' }); await p.waitForTimeout(1600); assert.equal(await p.locator('.hero-identity').evaluate((n) => getComputedStyle(n).opacity), '1'); assert(await p.getByRole('link', { name: /职业与项目/ }).isVisible()); await p.goto(`${siteUrl.split('#')[0]}#contact`, { waitUntil: 'networkidle' }); assert.equal(await p.locator('.portrait-aperture').evaluate((n) => getComputedStyle(n).animationName), 'none'); await motion.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } }); const n = await noJs.newPage(); await n.goto(siteUrl, { waitUntil: 'networkidle' }); assert.equal(await n.locator('.portal-project').count(), 2); assert.equal(await n.locator('#ai details').count(), 0); for (const item of await n.locator('#ai .ai-case-readthrough').all()) assert(await item.isVisible()); assert.equal(await n.locator('#contact').evaluate((node) => getComputedStyle(node).opacity), '1'); await n.locator('#research-details > summary').click(); assert(await n.locator('#risk-pattern').isVisible()); await noJs.close();
} finally { await browser.close(); }
const permissive = await chromium.launch({ ...launch, args: ['--mute-audio', '--autoplay-policy=no-user-gesture-required'] });
try { const p = await permissive.newPage(); await p.addInitScript(() => { window.__created = 0; const N = window.AudioContext; window.AudioContext = class extends N { constructor(...a) { super(...a); window.__created++; } }; }); await p.goto(siteUrl, { waitUntil: 'networkidle' }); await p.waitForTimeout(500); assert.equal(await p.evaluate(() => window.__created), 0, 'Default off even when autoplay allowed'); } finally { await permissive.close(); }
const report = { passed: true, url: siteUrl, results, checks: '4 viewports; mobile CTAs; optional diagrams/panning; navigation; images; clipboard; QR/focus; consent-only audio signal/volume/background pause; motion and no-JS reading', externalPlatforms: 'Platform login and app launch not verified' };
await writeFile(`${output}/browser-result.json`, JSON.stringify(report, null, 2)); console.log(JSON.stringify(report));
