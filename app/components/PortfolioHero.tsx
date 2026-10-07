import type { CSSProperties } from 'react';
import { MaintainableImage } from './MaintainableImage';
import { mediaContent } from '../../content/site-content';

/** A finite CSS opening, not a loading gate. All evidence and links exist immediately. */
export function PortfolioHero() {
  return (
    <section className="hero hero-editorial" aria-labelledby="hero-title">
      <MaintainableImage className="hero-background" priority {...mediaContent.heroBackground} />
      <div className="hero-opening-trace" aria-hidden="true"><span>STATISTICS</span><i /><span>ALGORITHM</span><i /><span>HUMAN JUDGMENT</span></div>
      <div className="hero-copy">
        <p className="eyebrow hero-intro-copy">ALGORITHM · RISK DECISION · AI-NATIVE</p>
        <h1 id="hero-title" aria-label="沈鑫达"><span className="hero-name-mask" aria-hidden="true">{'沈鑫达'.split('').map((letter, index) => <span className="hero-name-letter" style={{ '--letter-index': index } as CSSProperties} key={letter}>{letter}</span>)}</span></h1>
        <p className="hero-name-en hero-intro-copy" aria-hidden="true">SHEN XINDA</p>
        <p className="hero-role hero-intro-copy"><span>机器学习</span><span>与风险决策实践者</span></p>
        <div className="hero-identity hero-intro-copy"><p>厦门大学 · 应用统计硕士</p><p>滴滴国际支付风控算法实习生</p></div>
        <p className="hero-statement hero-intro-copy">以应用统计为底座，以算法与机器学习为主线。支付风险与智能决策是我当前最深的业务实践；AI Agent 是执行杠杆，而非判断的替代品。</p>
        <div className="actions hero-intro-copy"><a className="button primary" href="#projects">查看项目 <span aria-hidden="true">↗</span></a><a className="button quiet" href="#contact">简历与联系</a></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-index" aria-hidden="true"><span>PORTRAIT / SHEN XINDA</span><span>01</span></div>
        <div className="portrait-aperture"><MaintainableImage className="portrait-frame" priority {...mediaContent.profile} /></div>
        <span className="portrait-register register-top" aria-hidden="true" /><span className="portrait-register register-bottom" aria-hidden="true" />
        <div className="portrait-caption"><span>XIAMEN · CHINA</span><span>SHEN XINDA / 2026</span></div>
      </div>
      <div className="hero-proof" aria-label="核心经历">
        <a href="#work"><span className="proof-index" aria-hidden="true">01 / CURRENT</span><b>滴滴</b><span>国际支付风控算法实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#work"><span className="proof-index" aria-hidden="true">02 / EXPERIENCE</span><b>ZEEKR 极氪</b><span>数据分析实习</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
        <a href="#education"><span className="proof-index" aria-hidden="true">03 / CREDENTIAL</span><b>挑战杯国家级特等奖</b><span>国赛前3%</span><span className="proof-arrow" aria-hidden="true">↗</span></a>
      </div>
      <a className="scroll-cue" href="#education"><span />了解背景与真实项目 <b aria-hidden="true">↓</b></a>
    </section>
  );
}
