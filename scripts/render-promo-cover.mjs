// Code-native editorial cover based on the approved photograph; no generated person.
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || 'playwright');
const photo = (await readFile('public/images/background/ee50ae865578ee88302cdbbf08897ff9.jpg')).toString('base64');
const browser = await chromium.launch({headless:true,...(process.env.PORTFOLIO_CHROMIUM?{executablePath:process.env.PORTFOLIO_CHROMIUM}:{}),args:['--mute-audio']});
try {
  const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
  await page.setContent(`<html lang="zh-CN"><style>*{box-sizing:border-box}body{margin:0;background:#0b1118;color:#f0f5f4;font-family:Arial,'PingFang SC',sans-serif}.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:bottom}.shade{position:absolute;inset:0 28% 0 0;background:linear-gradient(90deg,#0b1118f0,#0b1118c9 64%,#0b111800)}main{position:relative;padding:56px 58px;width:780px}.name{font-size:21px;letter-spacing:3px;border-bottom:2px solid #ecb45a;padding-bottom:12px;width:max-content}h1{font-size:84px;line-height:1.08;letter-spacing:-3px;margin:50px 0 20px}em{font-style:normal;color:#2dd3bf}p{font-size:26px;letter-spacing:1px;color:#c2d1cf;margin:0 0 24px}.badge{font:18px Arial;border:1px solid #2dd3bf;color:#2dd3bf;display:inline-block;padding:8px 14px;border-radius:4px}svg{position:absolute;left:58px;top:500px;width:650px;height:160px;opacity:.65}</style><img class="photo" src="data:image/jpeg;base64,${photo}" alt="阿基米达海滩照片"><div class="shade"></div><main><div class="name">阿基米达 / ARCHIMEDAS</div><h1>统计 × <em>AI</em><br>我在做什么</h1><p>风控研究 · Agent 实践 · 自动化</p><div class="badge">83秒 · A配乐版</div></main><svg viewBox="0 0 650 160" aria-hidden="true"><g fill="#2dd3bf">${Array.from({length:96},(_,i)=>`<rect x="${i%16*14}" y="${Math.floor(i/16)*17+25}" width="7" height="7" opacity="${.2+(i*7%9)/12}"/>`).join('')}</g><g fill="none" stroke="#2dd3bf" stroke-width="2"><path d="M238 78H302L354 30H435M302 78L354 127H435M435 30L487 78H610M435 127L487 78"/></g><g fill="#ecb45a"><circle cx="302" cy="78" r="5"/><circle cx="487" cy="78" r="5"/></g></svg></html>`);
  await page.locator('img').evaluate(image=>image.decode());
  await page.screenshot({path:'public/images/promo/archimedas-83s-a-v1.jpg',type:'jpeg',quality:90});
} finally {await browser.close();}
