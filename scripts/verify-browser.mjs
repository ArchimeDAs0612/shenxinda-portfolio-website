// Headless portal regression: no foreground browser or audible system output.
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || 'playwright');
const siteUrl = process.argv[2] || 'http://127.0.0.1:3100/';
const filmSource = await readFile('content/promo-content.ts', 'utf8');
const filmPublished = /published:\s*true/.test(filmSource);
const filmDuration = Number(filmSource.match(/durationSeconds:\s*(\d+)/)?.[1]);
const filmPath = filmSource.match(/video:\s*'([^']+)'/)?.[1];
const filmPoster = filmSource.match(/poster:\s*'([^']+)'/)?.[1];
const output = 'outputs/refresh-20260930';
await mkdir(output, { recursive: true });
const media = await readFile('content/site-content.ts', 'utf8') + await readFile('content/brand-content.ts', 'utf8');
const assets = [...new Set([...media.matchAll(/(?:src|wechatQrImage):\s*['"]([^'"]+)['"]/g)].map((m) => m[1]))];
assets.push('images/brands/didi.svg', 'images/brands/zeekr.svg', filmPoster.replace(/^\//, ''));
const launch = { headless: true, ...(process.env.PORTFOLIO_CHROMIUM ? { executablePath: process.env.PORTFOLIO_CHROMIUM } : {}), args: ['--mute-audio', '--autoplay-policy=document-user-activation-required'] };
const browser = await chromium.launch(launch);
const results = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 820, height: 1180 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport, isMobile: viewport.width < 640, hasTouch: viewport.width < 900, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    const filmRequests = [];
    page.on('request', request => { if (new URL(request.url()).pathname === filmPath) filmRequests.push(request.url()); });
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
    const analytics = page.locator('script[src="https://static.cloudflareinsights.com/beacon.min.js"]');
    await analytics.waitFor({ state: 'attached' });
    assert.equal(await analytics.getAttribute('data-cf-beacon'), '{"token":"86fa2109d1784ac79a8f4b6cbea5d608"}');
    if (viewport.width === 1440) await Promise.all(assets.map(async (asset) => { const r = await context.request.get(new URL(asset, siteUrl).href); assert.equal(r.status(), 200, asset); assert.match(r.headers()['content-type'], /^image\//, asset); }));
    await page.waitForFunction(() => [...document.querySelectorAll('.hero img')].every((image) => image.complete && image.naturalWidth > 0));
    assert.equal(await page.getByRole('heading', { name: '阿基米达', exact: true }).count(), 1);
    assert.equal(await page.getByText('沈鑫达', { exact: true }).count(), 0, 'Public view does not visibly disclose the career name');
    assert.equal(await page.locator('.hero .actions a').count(), 3);
    assert.equal(await page.locator('.hero .actions a').first().getAttribute('href'), '#internships', 'All visitors can discover career and projects');
    assert(await page.evaluate(() => document.querySelector('#projects').compareDocumentPosition(document.querySelector('#ai')) & Node.DOCUMENT_POSITION_FOLLOWING), 'AI follows research');
    assert(await page.evaluate(() => document.querySelector('#ai').compareDocumentPosition(document.querySelector('#exploration')) & Node.DOCUMENT_POSITION_FOLLOWING), 'Agent practice precedes AIGC');
    assert.equal(await page.locator('.nav-links a[href="#exploration"]').count(), 1);
    assert.equal(await page.locator('.mobile-nav a[href="#exploration"]').count(), 1);
    assert.equal(await page.locator('.nav-links a[href="#internships"]').count(), 1);
    assert.equal(await page.locator('.creation-paths a').count(), 3);
    assert.equal(await page.locator('.social-source-welcome').count(), 0, 'Normal visits do not get a source greeting');
    assert(await page.evaluate(() => document.querySelector('.hero-copy > .eyebrow').getBoundingClientRect().bottom <= document.querySelector('.hero h1').getBoundingClientRect().top), 'Hero label and name must not overlap');
    assert.match(await page.locator('.hero').innerText(), /2028年6月毕业 · 计划参加2027年秋招/);
    assert.doesNotMatch(await page.locator('meta[name="description"]').getAttribute('content'), /沈鑫达|滴滴国际支付风控/);
    assert.equal(await page.locator('.portrait-aperture').evaluate((n) => getComputedStyle(n).animationName), 'none');
    assert.equal(await page.evaluate(() => window.__audioContexts.length), 0, 'Music waits for visitor consent');
    if (viewport.width < 640) assert(await page.locator('.hero .actions').evaluate((n) => n.getBoundingClientRect().bottom <= innerHeight - 30), 'Mobile first-screen CTAs');
    assert.equal(await page.locator('.hero-proof a').count(), 3);
    assert.equal(await page.locator('.portrait-frame img').evaluate((n) => getComputedStyle(n).objectPosition), '50% 100%');
    // Public identity is an alias, not a gate that removes approved career content.
    for (const id of ['internships', 'projects', 'education']) assert.equal(await page.locator(`#${id}`).isVisible(), true, `Public ${id} must remain visible`);
    for (const company of ['didi', 'zeekr']) {
      assert.equal(await page.locator(`.internship-${company} .internship-bullets > li`).count(), 4);
      await page.locator(`.internship-${company}`).scrollIntoViewIfNeeded();
      await page.waitForFunction((name) => [...document.querySelectorAll(`.internship-${name} img`)].every(img => img.complete && img.naturalWidth > 0), company);
      assert.equal(await page.locator(`.internship-${company} .company-logo`).isVisible(), true);
      assert.equal(await page.locator(`.internship-${company} .brand-reference-image img`).isVisible(), true);
    }
    assert.match(await page.locator('#education').innerText(), /厦门大学.*浙江工商大学/s);
    assert.equal(await page.locator('.portal-project').count(), 2);
    await page.locator('#internships').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${viewport.width}-public-internships.png` });
    await page.locator('#education').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => { const image = document.querySelector('.life-current img'); return image?.complete && image.naturalWidth > 0; });
    await page.screenshot({ path: `${output}/${viewport.width}-public-education.png` });
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `${output}/${viewport.width}-public-hero.png` });
    for (const anchor of await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')))) assert.equal(await page.locator(`[id="${anchor.slice(1)}"]`).count(), 1, anchor);
    if (filmPublished) {
    assert(await page.evaluate(() => document.querySelector('.hero').compareDocumentPosition(document.querySelector('#film')) & Node.DOCUMENT_POSITION_FOLLOWING));
    assert(await page.evaluate(() => document.querySelector('#film').compareDocumentPosition(document.querySelector('#internships')) & Node.DOCUMENT_POSITION_FOLLOWING), 'Film precedes internships');
    assert(await page.evaluate(() => document.querySelector('#film').compareDocumentPosition(document.querySelector('#exploration')) & Node.DOCUMENT_POSITION_FOLLOWING));
    assert.equal(await page.locator('#film video').evaluate(v => v.paused && !v.autoplay && v.preload === 'none'), true, 'Film waits for explicit play');
    assert.equal(await page.locator('#film video').getAttribute('src'), null, 'Video URL stays detached before consent');
    assert.equal(filmRequests.length, 0, 'No video download before a visitor clicks');
    await page.locator('#film').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${viewport.width}-film-cover.png` });
    await page.getByRole('button', { name: '播放阿基米达83秒技术实践', exact: true }).click();
    await page.waitForFunction(() => { const v = document.querySelector('#film video'); return v.readyState >= 2 && v.currentTime > .15 && !v.paused; });
    assert(Math.abs(await page.locator('#film video').evaluate(v => v.duration) - filmDuration) < .2);
    assert.equal(new URL(await page.locator('#film video').getAttribute('src'), siteUrl).pathname, filmPath);
    assert.equal(await page.locator('#film video').getAttribute('playsinline'), '');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Film overflow ${viewport.width}`);
    await page.screenshot({ path: `${output}/${viewport.width}-film-playing.png` });
    await page.getByRole('button', { name: '收起短片' }).click();
    assert.equal(await page.locator('#film video').evaluate(v => v.paused), true);
    } else {
      assert.equal(await page.locator('#film').count(), 0, 'Unapproved film must not appear on the website');
    }
    const careerEntry = ['127.0.0.1', 'localhost'].includes(new URL(siteUrl).hostname) ? '?view=career' : 'career/';
    await page.goto(new URL(careerEntry, siteUrl).href, { waitUntil: 'networkidle' });
    await page.waitForURL(/\?view=career$/);
    await page.waitForFunction(() => [...document.querySelectorAll('.hero img')].every((image) => image.complete && image.naturalWidth > 0));
    assert.equal(await page.getByRole('heading', { name: '沈鑫达', exact: true }).count(), 1);
    assert.match(await page.locator('.hero').innerText(), /2028年6月毕业 · 计划参加2027年秋招/);
    assert.match(await page.locator('#education').innerText(), /2028年6月毕业 · 计划参加2027年秋招/s);
    assert.doesNotMatch(await page.locator('main').innerText(), /2027届校招|2027届应届/);
    assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /阿基米达/);
    assert.equal(await page.locator('.hero-proof a').count(), 3);
    for (const company of ['didi', 'zeekr']) assert.equal(await page.locator(`.internship-${company} .internship-bullets > li`).count(), 4);
    assert.match(await page.locator('.internship-didi').innerText(), /Pattern.*Agent/);
    for (const metric of ['3000+', '20万+', '20+', '约3小时 → 约5分钟']) assert((await page.locator('.internship-zeekr').innerText()).includes(metric));
    assert.equal(await page.locator('.portal-project').count(), 2);
    for (const card of await page.locator('.portal-project').all()) assert.match(await card.innerText(), /研究与交付已结项/);
    assert.match(await page.locator('.portal-project').first().innerText(), /LGBM.*四个研究阶段.*Rej→Pass.*OOT/s);
    assert.match(await page.locator('.portal-project').last().innerText(), /钱包.*外卖.*已结项.*评估设计/s);
    assert.doesNotMatch(await page.locator('#projects').innerText(), /进行中|WIP|LGBM未完成|只有GBT/);
    assert.equal(await page.locator('#research-details').evaluate(n => n.tagName), 'SECTION', 'Research is permanent content, not collapsible');
    assert.equal(await page.locator('#research-details > summary').count(), 0);
    assert.equal(await page.locator('.research-directory a').count(), 6);
    assert.equal(await page.locator('#risk-pattern').isVisible(), true);
    assert.doesNotMatch(await page.locator('main').innerText(), /钱包字段尚未做|钱包尚未开展|钱包待开展|PySpark GBT/);
    for (const id of ['risk-phase-0', 'risk-phase-1', 'risk-phase-2', 'feature-research', 'ai-case-0', 'ai-case-1']) assert(await page.locator(`#${id}`).isVisible(), `${id} visible without disclosure`);
    assert.equal(await page.locator('#ai details').count(), 0, 'Core AI collaboration is never gated by a disclosure');
    assert.equal(await page.locator('#ai .ai-case-readthrough').count(), 2);
    for (const item of await page.locator('#ai .ai-case-readthrough').all()) assert(await item.isVisible(), 'Both AI projects are visible without clicking');
    for (const anchor of await page.locator('a[href^="#"]').evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href')))) assert.equal(await page.locator(`[id="${anchor.slice(1)}"]`).count(), 1, anchor);
    assert(!/PDF|简历下载|RESUME/.test(await page.locator('main').innerText()));
    assert.match(await page.title(), /阿基米达.*统计.*AI 创作/);
    assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href, 'https://archimedas0612.github.io/');
    assert.equal(await page.locator('meta[property="og:image"]').count(), 1);
    assert.equal(await page.locator('#exploration .portal-social-link').count(), 1);
    assert.equal(await page.locator('#exploration .portal-social-link').getAttribute('href'), 'https://www.xiaohongshu.com/user/profile/5c5054a7000000001000b66e');
    assert.equal(await page.locator('a[href*="douyin.com/user/self"]').count(), 0);
    assert.match(await page.locator('#exploration').innerText(), /230万.*6万\+.*2026-10-20/s);
    assert.doesNotMatch(await page.locator('#exploration').innerText(), /首集制作验收中|尚未作为已发布作品/);
    assert.equal(await page.locator('.aigc-collections article').last().locator('ul li').count(), 0);
    assert.doesNotMatch(await page.locator('#exploration').innerText(), /代表作|作品直链待补/);
    assert.doesNotMatch(await page.locator('.aigc-collections article').last().innerText(), /EP\d|已核对抖音|已有多集发布|只回了三条消息|制作状态|待审|重制版/);
    assert.equal(await page.locator('.aigc-collections article').last().locator('h3').innerText(), '《阿基米达的概率引擎》');
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(251, 249, 244)');
    await page.screenshot({ path: `${output}/${viewport.width}-hero.png` });
    await page.locator('.hero .actions a').nth(1).click();
    assert.equal(new URL(page.url()).hash, '#exploration');
    await page.waitForFunction(() => { const top = document.querySelector('#exploration').getBoundingClientRect().top; return top >= 0 && top < innerHeight / 2; });
    await page.getByRole('button', { name: '复制职业页链接' }).click();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'https://archimedas0612.github.io/career/');
    assert.equal(await page.locator('.portal-share [role="status"]').innerText(), '主页链接已复制');
    await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: () => Promise.reject(new Error('Clipboard disabled')) }); });
    await page.getByRole('button', { name: '复制职业页链接' }).click();
    await page.waitForFunction(() => document.querySelector('.portal-share [role="status"]').textContent === '请长按下方网址复制');
    assert.equal(await page.locator('.portal-share > a').getAttribute('href'), 'https://archimedas0612.github.io/career/');
    await page.evaluate(() => { delete navigator.clipboard.writeText; });
    for (const id of ['internships', 'education', 'about', 'projects', 'ai', 'exploration', 'contact']) { await page.locator(`#${id}`).scrollIntoViewIfNeeded(); await page.waitForTimeout(120); assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} overflow ${viewport.width}`); await page.screenshot({ path: `${output}/${viewport.width}-${id}.png` }); }
    assert(await page.locator('#risk-pattern').isVisible());
    assert.equal(await page.locator('#research-details .research-svg[role="img"]').count(), 4);
    await page.getByRole('button', { name: '03 · 模型发现与候选深化', exact: true }).click();
    assert.match(await page.locator('#risk-phase-2 .research-svg').textContent(), /结构重现.*独立业务核验/s);
    await page.locator('#risk-phase-2 .process-nodes button').last().click(); assert.match(await page.locator('#risk-phase-2 .process-detail').last().innerText(), /版本化交接.*恢复/s);
    assert.match(await page.locator('#field-governance-detail-0').innerText(), /全量技术项.*业务目录/);
    if (viewport.width < 900) { const pan = page.locator('#risk-phase-2 .research-pan'); await pan.evaluate((n) => { n.scrollLeft = n.scrollWidth; }); assert(await pan.evaluate((n) => n.scrollLeft > 0)); }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    assert.equal(await page.locator('#ai .research-svg[role="img"]').count(), 2);
    for (const kind of ['experiment-feedback-loop', 'evidence-recovery-namespace', 'model-candidate-evolution', 'field-knowledge-admission']) assert.equal(await page.locator(`[data-diagram-layout="${kind}"]`).count(), 1);
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
    if (viewport.width === 1440 && filmPublished) {
      await page.getByRole('button', { name: '播放阿基米达83秒技术实践', exact: true }).click();
      await page.waitForFunction(() => window.__audioContexts.at(-1).state === 'suspended');
      await page.waitForFunction(() => !document.querySelector('#film video').paused);
      await page.getByRole('button', { name: '开启音乐', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('#film video').paused);
      await page.getByRole('button', { name: '收起短片' }).click();
    }
    await page.getByRole('button', { name: '音乐设置', exact: true }).click(); await page.locator('#music-volume').fill('0'); await page.waitForTimeout(700);
    assert(await page.evaluate(() => { const s = new Float32Array(window.__musicAnalyser.fftSize); window.__musicAnalyser.getFloatTimeDomainData(s); return Math.max(...s.map(Math.abs)) < .001; }));
    await page.locator('#music-volume').fill('25'); await page.getByRole('button', { name: '收起音乐设置' }).click(); await page.getByRole('button', { name: '暂停音乐', exact: true }).click(); await page.waitForFunction(() => window.__audioContexts.at(-1).state === 'suspended');
    await page.getByRole('button', { name: '开启音乐', exact: true }).click(); await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); }); await page.waitForFunction(() => window.__audioContexts.at(-1).state === 'suspended');
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); }); assert.equal(await page.getByRole('button', { name: '开启音乐', exact: true }).getAttribute('aria-pressed'), 'false'); assert.equal(await page.evaluate(() => window.__audioContexts.length), 1);
    const images = await page.locator('img').evaluateAll((nodes) => nodes.map((n) => ({ src: n.getAttribute('src'), loaded: n.complete && n.naturalWidth > 0 }))); assert(images.every((i) => i.loaded), JSON.stringify(images));
    if (viewport.width < 900) { await page.locator('.mobile-nav summary').click(); await page.locator('.mobile-nav a[href="#projects"]').click(); assert.equal(new URL(page.url()).hash, '#projects'); assert.equal(await page.locator('.mobile-nav').evaluate((n) => n.open), false); }
    for (const [source, expected] of [['xhs', '从小红书来的朋友'], ['douyin', '从抖音来的朋友']]) {
      // The static /from/* files are checked in source and after publication.
      // Vinext's app server intentionally does not expose public files as routes,
      // so this browser regression exercises their final destination directly.
      const publicHost = !['127.0.0.1', 'localhost'].includes(new URL(siteUrl).hostname);
      await page.goto(new URL(publicHost ? `from/${source}/` : `?from=${source}`, siteUrl).href, { waitUntil: 'domcontentloaded' });
      await page.waitForURL(new RegExp(`\\?from=${source}$`));
      await page.locator('.social-source-welcome').waitFor();
      assert.match(await page.locator('.social-source-welcome').innerText(), new RegExp(expected));
      assert.equal(new URL(page.url()).hash, '');
      assert(await page.evaluate(() => scrollY < 10), 'Social arrivals start at the homepage top');
      assert(await page.locator('.hero .actions').isVisible());
    }
    assert.deepEqual(errors, []); results.push({ viewport, images: images.length, audioSignal: signal, passed: true }); await context.close();
  }
  const motion = await browser.newContext({ viewport: { width: 1440, height: 900 } }); const p = await motion.newPage(); await p.goto(new URL('?view=career', siteUrl).href, { waitUntil: 'networkidle' }); await p.waitForTimeout(1600); assert.equal(await p.locator('.hero-identity').evaluate((n) => getComputedStyle(n).opacity), '1'); assert(await p.getByRole('link', { name: /职业与项目/ }).isVisible()); await p.goto(`${new URL('?view=career', siteUrl).href}#contact`, { waitUntil: 'networkidle' }); assert.equal(await p.locator('.portrait-aperture').evaluate((n) => getComputedStyle(n).animationName), 'none'); await motion.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } }); const n = await noJs.newPage(); await n.goto(siteUrl, { waitUntil: 'networkidle' }); assert.equal(await n.getByRole('heading', { name: '阿基米达', exact: true }).count(), 1); for (const id of ['internships', 'projects', 'education', 'risk-phase-0', 'risk-phase-1', 'risk-phase-2', 'feature-research', 'ai-case-0', 'ai-case-1']) assert.equal(await n.locator(`#${id}`).isVisible(), true, `No-JS ${id} remains readable`); assert.equal(await n.locator('#contact').evaluate((node) => getComputedStyle(node).opacity), '1'); await noJs.close();
  const phone = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  await phone.addInitScript(() => {
    window.__mobileOpeningCount = 0;
    const show = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = function (...args) {
      if (this.classList.contains('mobile-opening')) window.__mobileOpeningCount++;
      return show.apply(this, args);
    };
  });
  const arrival = await phone.newPage();
  await arrival.goto(siteUrl,{waitUntil:'commit'});
  await arrival.locator('.mobile-opening[open]').waitFor();
  assert.equal(await arrival.locator('.mobile-opening button').evaluate(n => n === document.activeElement),true);
  await arrival.locator('.mobile-opening button').click();
  await arrival.locator('.mobile-opening[open]').waitFor({state:'hidden'});
  assert.equal(await arrival.evaluate(() => scrollY),0);
  await arrival.reload({waitUntil:'networkidle'});
  assert.equal(await arrival.evaluate(() => window.__mobileOpeningCount),0,'Opening plays only once per tab');
  await phone.clearCookies();
  await arrival.evaluate(() => sessionStorage.removeItem('portfolio-opening-shown'));
  await arrival.reload({waitUntil:'commit'});
  await arrival.locator('.mobile-opening[open]').waitFor();
  await arrival.locator('.mobile-opening[open]').waitFor({state:'hidden'});
  assert.equal(await arrival.evaluate(() => scrollY),0,'Automatic opening leaves the homepage at the top');
  if (!['127.0.0.1','localhost'].includes(new URL(siteUrl).hostname)) {
    for (const source of ['xhs','douyin']) {
      await arrival.evaluate(() => sessionStorage.removeItem('portfolio-opening-shown'));
      await arrival.goto(new URL(`from/${source}/`,siteUrl).href,{waitUntil:'commit'});
      await arrival.waitForURL(new RegExp(`\\?from=${source}$`),{waitUntil:'networkidle'});
      assert.equal(await arrival.evaluate(() => window.__mobileOpeningCount),0,'Social entry does not play a second mobile opening');
    }
  }
  await phone.close();
} finally { await browser.close(); }
const permissive = await chromium.launch({ ...launch, args: ['--mute-audio', '--autoplay-policy=no-user-gesture-required'] });
try { const p = await permissive.newPage(); await p.addInitScript(() => { window.__created = 0; const N = window.AudioContext; window.AudioContext = class extends N { constructor(...a) { super(...a); window.__created++; } }; }); await p.goto(siteUrl, { waitUntil: 'networkidle' }); await p.waitForTimeout(500); assert.equal(await p.evaluate(() => window.__created), 0, 'Default off even when autoplay allowed'); } finally { await permissive.close(); }
const report = { passed: true, url: siteUrl, results, checks: '4 viewports; public/career views; restored public internships/projects/education and brand imagery; mobile CTAs; mobile opening/skip/session replay; optional diagrams/panning; navigation; images; clipboard; QR/focus; audio signal/volume/background pause; reduced motion and public no-JS reading', filmChecks: filmPublished ? 'Consent/playback/duration/collapse and BGM mutual exclusion passed' : 'Film absence passed; playback and mutual exclusion skipped because the film is unpublished', externalPlatforms: 'Physical devices, platform login and in-app browsers not verified' };
await writeFile(`${output}/browser-result.json`, JSON.stringify(report, null, 2)); console.log(JSON.stringify(report));
