/* eslint-disable @next/next/no-img-element -- Stable local brand files. */
import { careerContent } from '../../content/career-content';
import { brandContent } from '../../content/brand-content';
import { MaintainableImage } from './MaintainableImage';

export function InternshipOverview() {
  const experience = careerContent.zeekr;
  return <div className="internship-overview" aria-label="两段实习履历">
    <article className="internship-summary internship-didi">
      <div className="internship-summary-heading"><div><span className="field-label">当前 / 实习履历</span><div className="company-logo-shell didi-logo-shell"><img className="company-logo didi-logo" src="images/brands/didi.svg" alt="滴滴出行 Logo" /></div><h3>国际支付风控算法实习</h3><p className="internship-company">滴滴国际事业群（IBG）· 国际支付风险</p></div></div>
      <p className="internship-summary-copy">研究短窗口误伤与风险 Pattern，推进样本比较、策略条件解释、树模型对照实验与字段语义治理；以 Coding Agent 辅助分析，人工审查方法与结论。</p>
      <p className="internship-evidence"><strong>3 组输入 · 5 折 · 5 种子</strong><span>已完成实验贡献 · 项目仍 WIP，未宣称上线收益</span></p>
      <a className="internship-detail-link" href="#projects">下方展开项目、流程与评价方法 ↘</a>
    </article>
    <article className="career-secondary internship-summary internship-zeekr">
      <div className="internship-summary-heading"><div><span className="field-label">{experience.period} / 实习履历</span><div className="company-logo-shell zeekr-logo-shell"><img className="company-logo zeekr-logo" src="images/brands/zeekr.svg" alt="极氪 ZEEKR Logo" /></div><h3>数据分析实习</h3><p className="internship-company">品牌营销中心 · 吉利控股集团旗下智能电动品牌</p></div><figure className="company-brand-visual zeekr-brand-visual"><MaintainableImage className="brand-reference-image" src={brandContent.zeekr.src} alt={brandContent.zeekr.alt} label="ZEEKR 9X" fallbackTitle="极氪品牌产品形象" /><figcaption><a href={brandContent.zeekr.source} target="_blank" rel="noreferrer">9X 品牌示意 ↗</a></figcaption></figure></div>
      <p className="internship-summary-copy">开展全国经营指标分析、潜客分群与区域差异研究；用 Python 完成清洗、指标计算与报表自动化，支持营销与经营判断。</p>
      <p className="internship-evidence"><strong>约 3 小时 → 约 5 分钟</strong><span>报表流程自动化 · 3000+销售终端 · 20万+潜客 · 20+分析交付</span></p>
      <p className="internship-foundation">业务分析与工程化基础，随后迁移到风险算法实践。</p>
    </article>
  </div>;
}
