// Render our editorial share card, not a fabricated work screenshot.
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || 'playwright');
const portrait = (await readFile('public/images/profile/bdf5afa6a8fc8fc136fd282f6c467fcd.jpg')).toString('base64');
const browser = await chromium.launch({ headless: true, ...(process.env.PORTFOLIO_CHROMIUM ? { executablePath: process.env.PORTFOLIO_CHROMIUM } : {}), args: ['--mute-audio'] });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html lang="zh-CN"><style>*{box-sizing:border-box}body{margin:0;background:#fbf9f4;color:#302b24;font-family:Arial,'PingFang SC',sans-serif}main{padding:64px;display:grid;grid-template-columns:1fr 310px;gap:48px;height:630px}.label{font-size:14px;letter-spacing:3px;color:#8e5737}h1{font-size:88px;letter-spacing:-4px;margin:35px 0 10px}.en{color:#93816a;font-size:15px;letter-spacing:5px}h2{font-size:30px;font-weight:500;line-height:1.5;margin-top:32px}p{font-size:18px;line-height:1.8;color:#776d5f}img{width:310px;height:410px;object-fit:cover;object-position:bottom;align-self:center}.footer{margin-top:28px;font-size:16px;color:#8e5737;border-top:1px solid #d6cbbb;padding-top:20px}</style><main><div><div class="label">STATISTICS · DECISION · CREATION</div><h1>沈鑫达</h1><div class="en">SHEN XINDA</div><h2>应用统计为底座<br>探索风险决策、机器学习与 AI 创作</h2><p>厦门大学应用统计硕士 · 2027 届<br>滴滴国际支付风控算法实习 · 极氪数据分析</p><div class="footer">职业与项目 / AI 与创作 / 交流与合作</div></div><img src="data:image/jpeg;base64,${portrait}" alt="沈鑫达"></main></html>`);
  await page.locator('img').evaluate((image) => image.decode()); await page.screenshot({ path: 'public/images/portal-share.png' });
} finally { await browser.close(); }
