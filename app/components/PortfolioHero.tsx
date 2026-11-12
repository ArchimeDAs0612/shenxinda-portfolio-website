import type { CSSProperties } from 'react';
import { MaintainableImage } from './MaintainableImage';
import { mediaContent } from '../../content/site-content';
import { SocialSourceWelcome } from './SocialSourceWelcome';
import { ResearchMotif } from './ResearchMotif';

type HeroView = 'public' | 'career';

/** One visual system, with a public-facing name and an invited career view. */
export function PortfolioHero({ view = 'public' }: { view?: HeroView }) {
  const career = view === 'career';
  const identity = career
    ? { cn: '沈鑫达', en: 'SHEN XINDA' }
    : { cn: '阿基米达', en: 'ARCHIMEDAS' };

  return (
    <section className="hero hero-editorial hero-portal" aria-labelledby="hero-title">
      <MaintainableImage className="hero-background" priority {...mediaContent.heroBackground} />
      <ResearchMotif />
      <div className="hero-copy">
        <h1 id="hero-title" aria-label={identity.cn}><span className="hero-name-mask" aria-hidden="true">{identity.cn.split('').map((letter, index) => <span className="hero-name-letter" style={{ '--letter-index': index } as CSSProperties} key={`${letter}-${index}`}>{letter}</span>)}</span></h1>
        <p className="hero-name-en hero-intro-copy" aria-hidden="true">{identity.en}</p>
        <p className="hero-role hero-intro-copy">{career ? '应用统计背景，聚焦支付风险研究与 Agent 工程实践。' : '用统计理解世界，用 AI 创作表达。'}</p>
        <div className="hero-identity hero-intro-copy"><p>厦门大学 · 应用统计硕士 · 2028年6月毕业 · 计划参加2027年秋招</p><p>滴滴国际支付风控算法实习 · Risk / Decision Algorithm</p><p>支付风控研究 · 特征治理 · Agent 工程实践</p></div>
        <SocialSourceWelcome />
        <div className="actions hero-intro-copy"><a className="button primary" href="#internships">职业与项目 <span aria-hidden="true">↗</span></a><a className="button quiet" href="#exploration">看 AI 创作与生活</a><a className="button quiet" href="#contact">联系我</a></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-aperture"><MaintainableImage className="portrait-frame" priority {...mediaContent.profile} /></div>
        <span className="portrait-register register-top" aria-hidden="true" /><span className="portrait-register register-bottom" aria-hidden="true" />
        <div className="portrait-caption"><span>XIAMEN · CHINA</span></div>
      </div>
      <div className="hero-proof" aria-label="核心经历">
        <a href="#internships"><b>滴滴</b><span>国际支付风控算法实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#internships"><b>ZEEKR 极氪</b><span>数据分析实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#education"><b>厦门大学</b><span>应用统计硕士</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
      </div>
      <a className="scroll-cue" href="#internships"><span />从正在做的事开始 <b aria-hidden="true">↓</b></a>
    </section>
  );
}
