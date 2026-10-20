import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { createHash } from 'node:crypto';

const projectRoot = process.cwd();
const pagePath = join(projectRoot, 'app/page.tsx');
const contentPath = join(projectRoot, 'content/site-content.ts');
const requiredDirectories = [
  'public/images/profile',
  'public/images/life',
  'public/images/projects',
  'public/images/contact',
];
const requiredFiles = ['public/favicon.svg', 'app/globals.css', 'app/layout.tsx', 'public/career/index.html', 'content/career-content.ts', 'public/images/brands/didi.svg', 'public/images/brands/zeekr.svg', 'public/from/xhs/index.html', 'public/from/douyin/index.html'];
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);
const errors = [];
const warnings = [];
const promoSource = readFileSync(join(projectRoot, 'content/promo-content.ts'), 'utf8');
const promoVideo = promoSource.match(/video:\s*'([^']+)'/)?.[1];
const promoPoster = promoSource.match(/poster:\s*'([^']+)'/)?.[1];
for (const path of [promoVideo, promoPoster].filter(Boolean).map(path => `public${path}`)) {
  if (!existsSync(join(projectRoot, path))) errors.push(`宣传片资源缺少：${path}`);
}
if (!promoVideo || !promoPoster) errors.push('宣传片资源配置缺失');
if (promoVideo && existsSync(join(projectRoot, 'public', promoVideo))) {
  const expected = promoSource.match(/sha256:\s*'([a-f0-9]{64})'/)?.[1];
  if (createHash('sha256').update(readFileSync(join(projectRoot, 'public', promoVideo))).digest('hex') !== expected) errors.push('宣传片不是获批的83秒A版文件');
}

for (const relativePath of [...requiredDirectories, ...requiredFiles]) {
  if (!existsSync(join(projectRoot, relativePath))) errors.push(`缺少：${relativePath}`);
}

const pageSource = readFileSync(pagePath, 'utf8') + readFileSync(join(projectRoot, 'app/components/PortfolioHero.tsx'), 'utf8');
const portalSource = readFileSync(join(projectRoot, 'content/portal-content.ts'), 'utf8');
const layoutSource = readFileSync(join(projectRoot, 'app/layout.tsx'), 'utf8');
const contentSource = readFileSync(contentPath, 'utf8') + readFileSync(join(projectRoot, 'content/brand-content.ts'), 'utf8');
const careerSource = readFileSync(join(projectRoot, 'content/career-content.ts'), 'utf8');
if (/2027届校招|2028年毕业/.test(pageSource + portalSource)) errors.push('毕业与秋招口径未同步');
if (!pageSource.includes('2028年6月毕业 · 计划参加2027年秋招')) errors.push('缺少已确认毕业与秋招时间');
if (/status:\s*'WIP'|首集制作验收中/.test(careerSource)) errors.push('仍保留过期项目或创作总状态');
if ((careerSource.match(/status: '研究与交付已结项'/g) || []).length !== 2) errors.push('两大项目应明确标为研究与交付已结项');
const ids = new Set([...pageSource.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const literalAnchors = [...pageSource.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);

for (const anchor of literalAnchors) {
  if (!ids.has(anchor)) errors.push(`页面锚点不存在：#${anchor}`);
}

const imagePaths = [...contentSource.matchAll(/(?:src|wechatQrImage):\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
for (const imagePath of imagePaths) {
  if (!imagePath.startsWith('images/')) {
    errors.push(`图片路径必须从 images/ 开始：${imagePath}`);
    continue;
  }
  const extension = extname(imagePath).toLowerCase();
  if (!allowedExtensions.has(extension)) errors.push(`不支持的图片格式：${imagePath}`);
  const diskPath = join(projectRoot, 'public', imagePath);
  if (!existsSync(diskPath)) {
    errors.push(`配置图片不存在：public/${imagePath}（页面虽有安全占位，不能算交付）`);
    continue;
  }
  const sizeMb = statSync(diskPath).size / 1024 / 1024;
  if (sizeMb > 5) errors.push(`图片大于 5MB，请压缩：public/${imagePath}`);
  else if (sizeMb > 0.8) warnings.push(`图片超过建议的 800KB：public/${imagePath}`);
}

for (const warning of warnings) console.warn(`提示：${warning}`);
if (!/analyticsToken:\s*['"][a-z0-9]{32}['"]/.test(portalSource)) errors.push('Cloudflare Analytics site tag 缺失或格式不正确');
if (!/careerUrl:\s*['"]https:\/\/archimedas0612\.github\.io\/career\//.test(portalSource)) errors.push('职业页入口缺失或不是唯一职业页地址');
if (!/name="robots" content="noindex, nofollow"/.test(readFileSync(join(projectRoot, 'public/career/index.html'), 'utf8'))) errors.push('职业入口必须禁止搜索引擎索引');
if (!/static\.cloudflareinsights\.com\/beacon\.min\.js/.test(layoutSource) || !/data-cf-beacon/.test(layoutSource)) errors.push('Cloudflare Analytics 信标未接入根布局');
for (const [source, target] of [['xhs', '/?from=xhs'], ['douyin', '/?from=douyin']]) {
  const entryPath = join(projectRoot, `public/from/${source}/index.html`);
  if (!existsSync(entryPath)) continue;
  const entrySource = readFileSync(entryPath, 'utf8');
  if (!entrySource.includes(target)) errors.push(`社媒入口跳转不正确：${source}`);
  if (entrySource.includes('#exploration')) errors.push(`社媒入口必须从首页开始：${source}`);
  if (!entrySource.includes(portalSource.match(/analyticsToken:\s*['"]([^'"]+)/)?.[1] ?? '')) errors.push(`社媒入口未接入统计：${source}`);
}
if (errors.length) {
  for (const error of errors) console.error(`错误：${error}`);
  process.exit(1);
}

console.log(`维护检查通过：${literalAnchors.length} 个页面入口，${imagePaths.length} 个图片位置。`);
