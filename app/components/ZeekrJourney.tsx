/* eslint-disable @next/next/no-img-element -- Stable local brand files. */
import { careerContent } from '../../content/career-content';
import { brandContent } from '../../content/brand-content';
import { MaintainableImage } from './MaintainableImage';

export function InternshipOverview() {
  const experience = careerContent.zeekr;
  const overview = careerContent.internshipOverview;
  return <div className="internship-overview" aria-label="两段实习履历">
    <article className="internship-summary internship-didi">
      <div className="internship-summary-heading"><div><span className="field-label">当前 / 实习履历</span><div className="company-logo-shell didi-logo-shell"><img className="company-logo didi-logo" src="images/brands/didi.svg" alt="滴滴出行 Logo" /></div><h3>国际支付风控算法实习</h3><p className="internship-company">滴滴国际事业群（IBG）· 国际支付风险</p></div></div>
      <ul className="internship-bullets" aria-label="滴滴工作内容">
        {overview.didi.bullets.map((item) => <li key={item.title}><strong className="internship-point-title">{item.title}</strong><p>{item.text}</p></li>)}
      </ul>
      <p className="internship-foundation">{overview.didi.progress}</p>
      <a className="internship-detail-link" href="#projects">下方展开项目、流程与评价方法 ↘</a>
    </article>
    <article className="career-secondary internship-summary internship-zeekr">
      <div className="internship-summary-heading"><div><span className="field-label">{experience.period} / 实习履历</span><div className="company-logo-shell zeekr-logo-shell"><img className="company-logo zeekr-logo" src="images/brands/zeekr.svg" alt="极氪 ZEEKR Logo" /></div><h3>数据分析实习</h3><p className="internship-company">品牌营销中心 · 吉利控股集团旗下智能电动品牌</p></div><figure className="company-brand-visual zeekr-brand-visual"><MaintainableImage className="brand-reference-image" src={brandContent.zeekr.src} alt={brandContent.zeekr.alt} label="ZEEKR 9X" fallbackTitle="极氪品牌产品形象" /><figcaption><a href={brandContent.zeekr.source} target="_blank" rel="noreferrer">9X 品牌示意 ↗</a></figcaption></figure></div>
      <ul className="internship-bullets" aria-label="极氪工作内容与成果">
        {overview.zeekr.bullets.map((item) => <li key={item.title}><strong className="internship-point-title">{item.title}</strong><p>{item.text}</p>{'metric' in item && <strong className="internship-point-metric">{item.metric}</strong>}</li>)}
      </ul>
    </article>
  </div>;
}
