// Public, dependency-free health check. Never collects private career context.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const url = new URL(process.argv[2] || 'https://archimedas0612.github.io/shenxinda-portfolio-website/');
const get = async (target) => {
  const response = await fetch(target, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `Unavailable: ${target}`);
  return response;
};
const htmlResponse = await get(url);
const html = await htmlResponse.text();
assert.match(html, /沈鑫达/);
assert.match(html, /property="og:image"/);
assert.match(html, /rel="canonical"/);
const styles = [...html.matchAll(/href="([^"<>]+\.css)"/g)].map((match) => match[1]);
assert(styles.length > 0, 'Stylesheet missing');
const site = await readFile('content/site-content.ts', 'utf8');
const images = [...new Set([...site.matchAll(/(?:src|wechatQrImage):\s*['"]([^'"]+)['"]/g)].map((match) => match[1]))];
const assets = [...styles, ...images, 'favicon.svg', 'images/brands/didi.svg', 'images/brands/zeekr.svg', '404.html'];
await Promise.all(assets.map(async (asset) => {
  const response = await get(new URL(asset, url));
  if (images.includes(asset)) assert.match(response.headers.get('content-type'), /^image\//);
  if (asset.endsWith('.css')) assert.match(response.headers.get('content-type'), /text\/css/);
}));
const career = await readFile('content/career-content.ts', 'utf8');
const evidence = await readFile('content/project-evidence.ts', 'utf8');
const report = {
  checkedAt: new Date().toISOString(), publicUrl: url.href, passed: true,
  assetsChecked: assets.length,
  // Fingerprints establish which approved public content was checked, not a new fact source.
  approvedContentHash: createHash('sha256').update(career).update(evidence).digest('hex'),
  mediaConfigHash: createHash('sha256').update(site).digest('hex'),
};
await mkdir('outputs/refresh-20260930', { recursive: true });
await writeFile('outputs/refresh-20260930/public-health.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
