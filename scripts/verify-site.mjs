import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const projectRoot = process.cwd();
const pagePath = join(projectRoot, 'app/page.tsx');
const contentPath = join(projectRoot, 'content/site-content.ts');
const requiredDirectories = [
  'public/images/profile',
  'public/images/life',
  'public/images/projects',
];
const requiredFiles = ['public/favicon.svg', 'app/globals.css', 'app/layout.tsx'];
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const errors = [];
const warnings = [];

for (const relativePath of [...requiredDirectories, ...requiredFiles]) {
  if (!existsSync(join(projectRoot, relativePath))) errors.push(`缺少：${relativePath}`);
}

const pageSource = readFileSync(pagePath, 'utf8');
const contentSource = readFileSync(contentPath, 'utf8');
const ids = new Set([...pageSource.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const literalAnchors = [...pageSource.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);

for (const anchor of literalAnchors) {
  if (!ids.has(anchor)) errors.push(`页面锚点不存在：#${anchor}`);
}

const imagePaths = [...contentSource.matchAll(/src:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
for (const imagePath of imagePaths) {
  if (!imagePath.startsWith('images/')) {
    errors.push(`图片路径必须从 images/ 开始：${imagePath}`);
    continue;
  }
  const extension = extname(imagePath).toLowerCase();
  if (!allowedExtensions.has(extension)) errors.push(`不支持的图片格式：${imagePath}`);
  const diskPath = join(projectRoot, 'public', imagePath);
  if (!existsSync(diskPath)) {
    warnings.push(`尚未放入（页面会显示安全占位）：public/${imagePath}`);
    continue;
  }
  const sizeMb = statSync(diskPath).size / 1024 / 1024;
  if (sizeMb > 5) errors.push(`图片大于 5MB，请压缩：public/${imagePath}`);
  else if (sizeMb > 0.8) warnings.push(`图片超过建议的 800KB：public/${imagePath}`);
}

for (const warning of warnings) console.warn(`提示：${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`错误：${error}`);
  process.exit(1);
}

console.log(`维护检查通过：${literalAnchors.length} 个页面入口，${imagePaths.length} 个图片位置。`);
