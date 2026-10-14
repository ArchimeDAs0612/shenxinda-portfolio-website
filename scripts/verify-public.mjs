// Public, dependency-free health check. Never collects private career context.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const url = new URL(process.argv[2] || 'https://archimedas0612.github.io/');
const get = async (target) => {
  const response = await fetch(target, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `Unavailable: ${target}`);
  return response;
};
const htmlResponse = await get(url);
const html = await htmlResponse.text();
assert.match(html, /阿基米达/);
assert.doesNotMatch(html, /沈鑫达/, 'Public homepage must not disclose the career-view name');
for (const id of ['internships', 'projects', 'education']) assert(html.includes(`id="${id}"`), `Public homepage must retain ${id}`);
for (const asset of ['images/brands/didi.svg', 'images/brands/zeekr.svg', 'images/brands/99pay-app.webp', 'images/brands/zeekr-9x-front.webp']) assert(html.includes(asset), `Public homepage must display ${asset}`);
assert.match(html, /property="og:image"/);
assert.match(html, /rel="canonical"/);
assert.match(html, /static\.cloudflareinsights\.com\/beacon\.min\.js/);
assert.match(html, /data-cf-beacon/);
assert.equal(new URL(html.match(/rel="canonical"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*rel="canonical"/)?.slice(1).find(Boolean)).href, 'https://archimedas0612.github.io/');
const careerUrl = new URL('career/', url);
const careerResponse = await get(careerUrl);
const careerHtml = await careerResponse.text();
assert.match(careerHtml, /沈鑫达/);
assert.match(careerHtml, /noindex/);
assert.match(careerHtml, /\?view=career/);
const styles = [...html.matchAll(/href="([^"<>]+\.css)"/g)].map((match) => match[1]);
assert(styles.length > 0, 'Stylesheet missing');
const site = await readFile('content/site-content.ts', 'utf8') + await readFile('content/brand-content.ts', 'utf8');
const images = [...new Set([...site.matchAll(/(?:src|wechatQrImage):\s*['"]([^'"]+)['"]/g)].map((match) => match[1]))];
const assets = [...styles, ...images, 'favicon.svg', 'images/brands/didi.svg', 'images/brands/zeekr.svg', 'images/promo/archimedas-one-minute-v1.jpg', '404.html', 'from/intro.css', 'from/intro.js'];
await Promise.all(assets.map(async (asset) => {
  const response = await get(new URL(asset, url));
  if (images.includes(asset)) assert.match(response.headers.get('content-type'), /^image\//);
  if (asset.endsWith('.css')) assert.match(response.headers.get('content-type'), /text\/css/);
}));
const missing = await fetch(new URL('portal-page-not-found', url), { signal: AbortSignal.timeout(20000) });
const movie = await fetch(new URL('media/archimedas-one-minute-v1.mp4', url), { method: 'HEAD', signal: AbortSignal.timeout(20000) });
assert.equal(movie.status, 200);
assert.match(movie.headers.get('content-type'), /video\/mp4/);
assert.equal(missing.status, 404, 'Unknown route must return an actual 404');
assert.match(await missing.text(), /返回个人主页/);
for (const [source, target] of [['xhs', '/?from=xhs'], ['douyin', '/?from=douyin']]) {
  const entry = await get(new URL(`from/${source}/`, url));
  const entryHtml = await entry.text();
  assert.match(entryHtml, new RegExp(target.replace(/[?]/g, '\\?')));
  assert.match(entryHtml, /static\.cloudflareinsights\.com\/beacon\.min\.js/);
  assert(!entryHtml.includes('#exploration'), 'Entry starts at the homepage');
}
const career = await readFile('content/career-content.ts', 'utf8');
const evidence = await readFile('content/project-evidence.ts', 'utf8');
const report = {
  checkedAt: new Date().toISOString(), publicUrl: url.href, careerUrl: careerUrl.href, passed: true,
  assetsChecked: assets.length,
  socialEntriesChecked: 2,
  // Fingerprints establish which approved public content was checked, not a new fact source.
  approvedContentHash: createHash('sha256').update(career).update(evidence).digest('hex'),
  mediaConfigHash: createHash('sha256').update(site).digest('hex'),
};
await mkdir('outputs/refresh-20260930', { recursive: true });
await writeFile('outputs/refresh-20260930/public-health.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
