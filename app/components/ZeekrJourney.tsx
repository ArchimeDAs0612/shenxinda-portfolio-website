/* eslint-disable @next/next/no-img-element -- Stable local brand files. */
import { careerContent } from '../../content/career-content';
import { brandContent } from '../../content/brand-content';
import { MaintainableImage } from './MaintainableImage';

export function ZeekrJourney() {
  const experience = careerContent.zeekr;
  return <article className="career-secondary journey-zeekr">
    <div className="journey-zeekr-heading"><div><span className="field-label">{experience.period} / 实习履历</span><div className="company-logo-shell zeekr-logo-shell"><img className="company-logo zeekr-logo" src="images/brands/zeekr.svg" alt="极氪 ZEEKR Logo" /></div><h3>数据分析，成为算法实践的起点。</h3><p className="zeekr-role">{experience.role}</p><p className="company-description">{experience.company} · {experience.context}</p></div><figure className="company-brand-visual zeekr-brand-visual"><MaintainableImage className="brand-reference-image" src={brandContent.zeekr.src} alt={brandContent.zeekr.alt} label="ZEEKR 9X" fallbackTitle="极氪品牌产品形象" /><figcaption><a href={brandContent.zeekr.source} target="_blank" rel="noreferrer">9X 品牌产品示意 ↗</a></figcaption></figure></div>
    <div className="journey-automation"><strong>约 3 小时 <span>→</span> 约 5 分钟</strong><p>Python 数据清洗、指标计算与经营报表自动化 · 个人流程交付</p></div>
    <div className="experience-metrics">{experience.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <dl className="zeekr-work">{experience.work.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
    <p className="experience-takeaway">从经营指标、用户分群到决策支持，为后来的风险研究建立数据与业务基础；这是一段数据分析经历，不包装成算法实习。</p>
  </article>;
}
