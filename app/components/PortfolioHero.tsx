import type { CSSProperties } from 'react';
import { MaintainableImage } from './MaintainableImage';
import { mediaContent } from '../../content/site-content';

/** A finite CSS opening, not a loading gate. All evidence and links exist immediately. */
export function PortfolioHero() {
  return (
    <section className="hero hero-editorial hero-portal" aria-labelledby="hero-title">
      <MaintainableImage className="hero-background" priority {...mediaContent.heroBackground} />
      <div className="hero-opening-trace" aria-hidden="true"><span>STATISTICS</span><i /><span>ALGORITHM</span><i /><span>HUMAN JUDGMENT</span></div>
      <div className="hero-copy">
        <p className="eyebrow hero-intro-copy">STATISTICS · DECISION · CREATION</p>
        <h1 id="hero-title" aria-label="沈鑫达"><span className="hero-name-mask" aria-hidden="true">{'沈鑫达'.split('').map((letter, index) => <span className="hero-name-letter" style={{ '--letter-index': index } as CSSProperties} key={letter}>{letter}</span>)}</span></h1>
        <p className="hero-name-en hero-intro-copy" aria-hidden="true">SHEN XINDA</p>
        <p className="hero-role hero-intro-copy">以应用统计为底座，探索风险决策、机器学习与 AI 创作。</p>
        <div className="hero-identity hero-intro-copy"><p>厦门大学 · 应用统计硕士 · 2027 届</p><p>滴滴国际支付风控算法实习 · Risk / Decision Algorithm</p></div>
        <p className="hero-statement hero-intro-copy">这里记录我正在研究的问题、与 AI 一起完成的实践，以及工作之外的生活与表达。欢迎同行交流，也欢迎新的合作。</p>
        <div className="actions hero-intro-copy"><a className="button primary" href="#internships">职业与项目 <span aria-hidden="true">↗</span></a><a className="button quiet" href="#ai">AI 与创作</a><a className="button quiet" href="#contact">联系我</a></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-index" aria-hidden="true"><span>PORTRAIT / SHEN XINDA</span><span>01</span></div>
        <div className="portrait-aperture"><MaintainableImage className="portrait-frame" priority {...mediaContent.profile} /></div>
        <span className="portrait-register register-top" aria-hidden="true" /><span className="portrait-register register-bottom" aria-hidden="true" />
        <div className="portrait-caption"><span>XIAMEN · CHINA</span><span>SHEN XINDA / 2026</span></div>
      </div>
      <div className="hero-proof" aria-label="核心经历">
        <a href="#internships"><span className="proof-index" aria-hidden="true">01 / CURRENT</span><b>滴滴</b><span>国际支付风控算法实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#internships"><span className="proof-index" aria-hidden="true">02 / EXPERIENCE</span><b>ZEEKR 极氪</b><span>数据分析实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#education"><span className="proof-index" aria-hidden="true">03 / EDUCATION</span><b>厦门大学</b><span>应用统计硕士</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
      </div>
      <a className="scroll-cue" href="#internships"><span />从正在做的事开始 <b aria-hidden="true">↓</b></a>
    </section>
  );
}
