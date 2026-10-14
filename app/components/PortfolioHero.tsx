import type { CSSProperties } from 'react';
import { MaintainableImage } from './MaintainableImage';
import { mediaContent } from '../../content/site-content';
import { SocialSourceWelcome } from './SocialSourceWelcome';

type HeroView = 'public' | 'career';

/** One visual system, with a public-facing name and an invited career view. */
export function PortfolioHero({ view = 'public' }: { view?: HeroView }) {
  const career = view === 'career';
  const identity = career
    ? { cn: '沈鑫达', en: 'SHEN XINDA', portrait: 'PORTRAIT / SHEN XINDA', caption: 'SHEN XINDA / 2026' }
    : { cn: '阿基米达', en: 'ARCHIMEDAS', portrait: 'PORTRAIT / ARCHIMEDAS', caption: 'ARCHIMEDAS / 2026' };

  return (
    <section className="hero hero-editorial hero-portal" aria-labelledby="hero-title">
      <MaintainableImage className="hero-background" priority {...mediaContent.heroBackground} />
      <div className="hero-opening-trace" aria-hidden="true"><span>STATISTICS</span><i /><span>ALGORITHM</span><i /><span>HUMAN JUDGMENT</span></div>
      <div className="hero-copy">
        <p className="eyebrow hero-intro-copy">STATISTICS · DECISION · CREATION</p>
        <h1 id="hero-title" aria-label={identity.cn}><span className="hero-name-mask" aria-hidden="true">{identity.cn.split('').map((letter, index) => <span className="hero-name-letter" style={{ '--letter-index': index } as CSSProperties} key={`${letter}-${index}`}>{letter}</span>)}</span></h1>
        <p className="hero-name-en hero-intro-copy" aria-hidden="true">{identity.en}</p>
        <p className="hero-role hero-intro-copy">{career ? '以应用统计为底座，探索风险决策、机器学习与 AI 创作。' : '用统计理解世界，用 AI 创作表达。'}</p>
        {career && <div className="hero-identity hero-intro-copy"><p>厦门大学 · 应用统计硕士 · 2028年毕业 · 2027届校招</p><p>滴滴国际支付风控算法实习 · Risk / Decision Algorithm</p></div>}
        {!career && <div className="hero-identity hero-intro-copy"><p>统计思考 · AI 创作 · 生活记录</p><p>从一个想法，认识一个人。</p></div>}
        <SocialSourceWelcome career={career} />
        <div className="actions hero-intro-copy">{career ? <><a className="button primary" href="#internships">职业与项目 <span aria-hidden="true">↗</span></a><a className="button quiet" href="#exploration">看 AI 创作与生活</a></> : <><a className="button primary" href="#exploration">看 AI 创作与生活 <span aria-hidden="true">↗</span></a><a className="button quiet" href="#ai">AI 如何参与实践</a></>}<a className="button quiet" href="#contact">联系我</a></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-index" aria-hidden="true"><span>{identity.portrait}</span><span>01</span></div>
        <div className="portrait-aperture"><MaintainableImage className="portrait-frame" priority {...mediaContent.profile} /></div>
        <span className="portrait-register register-top" aria-hidden="true" /><span className="portrait-register register-bottom" aria-hidden="true" />
        <div className="portrait-caption"><span>XIAMEN · CHINA</span><span>{identity.caption}</span></div>
      </div>
      {career && <div className="hero-proof" aria-label="核心经历">
        <a href="#internships"><span className="proof-index" aria-hidden="true">01 / CURRENT</span><b>滴滴</b><span>国际支付风控算法实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#internships"><span className="proof-index" aria-hidden="true">02 / EXPERIENCE</span><b>ZEEKR 极氪</b><span>数据分析实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#education"><span className="proof-index" aria-hidden="true">03 / EDUCATION</span><b>厦门大学</b><span>应用统计硕士</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
      </div>}
      <a className="scroll-cue" href={career ? '#internships' : '#exploration'}><span />{career ? '从正在做的事开始' : '从正在表达的事开始'} <b aria-hidden="true">↓</b></a>
    </section>
  );
}
