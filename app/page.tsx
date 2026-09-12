'use client';

import { useEffect, useRef, useState } from 'react';
import { MaintainableImage } from './components/MaintainableImage';
import { mediaContent } from '../content/site-content';

const steps = [
  ['01', 'Problem Definition', '定义问题'],
  ['02', 'Context', '提供必要背景'],
  ['03', 'Specification', '明确任务与约束'],
  ['04', 'Coding Agent', '调度执行代理'],
  ['05', 'Execution', '分析、开发与调试'],
  ['06', 'Critical Evaluation', '理解并质疑结果'],
  ['07', 'Iteration', '发现矛盾后重新约束'],
  ['08', 'Validation', '验证与交叉检查'],
  ['09', 'Human Ownership', '由我判断并承担最终责任'],
] as const;

const navItems = [
  ['top', '首页'], ['capabilities', '能力'], ['work', 'Work'],
  ['ai', 'AI Engineering'], ['about', 'About'],
] as const;

export default function Home() {
  const [active, setActive] = useState('top');
  const [compact, setCompact] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -58% 0px', threshold: [0, .2, .5] });
    navItems.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach((node) => revealObserver.observe(node));

    const update = () => {
      setCompact(window.scrollY > 36);
      const flow = flowRef.current;
      if (!flow) return;
      const rect = flow.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * .68 - rect.top) / Math.max(rect.height - window.innerHeight * .18, 1)));
      flow.style.setProperty('--flow-progress', `${progress}`);
      const current = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      flow.querySelectorAll('.flow-step').forEach((node, index) => node.classList.toggle('is-active', index <= current));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main id="top">
      <header className={`site-header ${compact ? 'is-compact' : ''}`}>
        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#top"><strong>沈鑫达</strong><span>SHEN XINDA</span></a>
          <div className="nav-links">
            {navItems.map(([id, label]) => <a className={active === id ? 'active' : ''} href={`#${id}`} key={id}>{label}</a>)}
          </div>
          <a className="contact-button" href="#contact">联系我</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-enter enter-one">ALGORITHM · RISK DECISION · AI-NATIVE</p>
          <h1 className="hero-enter enter-two" id="hero-title">沈鑫达</h1>
          <p className="hero-role hero-enter enter-three">机器学习与风险决策实践者</p>
          <div className="hero-identity hero-enter enter-four"><p>厦门大学 · 应用统计硕士</p><p>滴滴国际支付风控算法实习生</p></div>
          <p className="hero-statement hero-enter enter-four">以算法能力为主线，在支付风控中建立真实实践；以 AI-native 的方式扩大执行能力，并对最终判断负责。</p>
          <div className="actions hero-enter enter-four"><a className="button primary" href="#work">查看经历 <span>↘</span></a><a className="button quiet" href="#resume">下载简历</a></div>
        </div>
        <div className="portrait-wrap">
          <MaintainableImage className="portrait-frame" priority {...mediaContent.profile} />
          <div className="portrait-caption"><span>XIAMEN · CHINA</span><span>2026</span></div>
        </div>
        <a className="scroll-cue" href="#capabilities"><span />SCROLL TO EXPLORE</a>
      </section>

      <section className="chapter capability-section" id="capabilities">
        <div className="chapter-intro" data-reveal><p className="eyebrow">01 / CORE CAPABILITIES</p><h2>算法是主线，<br />场景让判断落地。</h2><p>不是技能标签墙。我的能力从机器学习出发，进入支付风控与智能决策，并通过 Agentic Workflow 延伸执行边界。</p></div>
        <div className="capability-list" data-reveal>
          <article><span>01</span><h3>机器学习</h3><p>以统计与机器学习方法为核心，关注问题定义、建模与评估的完整链路。</p><small>ALGORITHM</small></article>
          <article><span>02</span><h3>风控算法</h3><p>当前最深的真实业务 Domain：国际支付风险识别、分析判断与评估。</p><small>RISK DECISION</small></article>
          <article><span>03</span><h3>智能决策</h3><p>连接算法输出、业务约束与风险判断，形成可理解的决策过程。</p><small>DECISION INTELLIGENCE</small></article>
          <article><span>04</span><h3>AI Agent</h3><p>以 AI-native Operator 的角色调度 Agent，人负责理解、验证与最终责任。</p><small>AGENTIC WORKFLOW</small></article>
        </div>
        <div className="foundation" data-reveal><span>能力底座</span><p>Statistics</p><p>Python</p><p>SQL</p><p>数据分析</p></div>
      </section>

      <section className="chapter work-section" id="work">
        <div className="chapter-intro work-intro" data-reveal><p className="eyebrow light">02 / EXPERIENCE</p><h2>职业经历，<br />是一条能力进化路径。</h2><p>从数据分析基础走向算法与风险决策。所有内容仅保留已确认事实，细节将在去敏和核验后展开。</p></div>
        <div className="career-story">
          <article className="career-feature" data-reveal><div className="career-meta"><span className="status fact">FACT</span><span>EXPERIENCE 01</span></div><div className="career-company">DIDI</div><div className="career-content"><p className="career-org">滴滴</p><h3>国际支付风控算法实习</h3><p>当前最重要的算法实践场景。围绕支付风险问题参与分析、判断与评估，在真实约束中理解算法如何服务决策。</p><div className="career-tags"><span>机器学习</span><span>支付风控</span><span>风险决策</span></div><p className="privacy-note">案例内容正在进行去敏与事实核验，暂不披露业务指标或内部实现。</p></div></article>
          <article className="career-secondary" data-reveal><div><span className="status fact">FACT</span><p className="career-org">极氪</p><h3>数据分析实习</h3></div><p>职业能力路径中的数据分析实践，为后续进入算法与决策问题建立业务理解基础。</p><span className="career-index">EXPERIENCE 02</span></article>
          <article className="project-slot" data-reveal><div><span className="status wip">WIP</span><p className="career-org">代表性项目</p><h3>等待真实材料确认</h3></div><p>后续将按 Problem → Method → Evaluation → Result → Reflection 展开，不补充未经确认的项目内容。</p><span className="career-index">PROJECT 01</span></article>
        </div>
      </section>

      <section className="chapter workflow-section" id="ai">
        <div className="workflow-intro" data-reveal><p className="eyebrow">03 / HOW I WORK WITH AI</p><h2>让 Agent 扩大执行能力，<br />让人保留最终判断。</h2><p>我当前更准确的定位是 AI-native Operator：能够把 Coding Agent 嵌入真实工作流，下一阶段才是构建 Agent。</p></div>
        <div className="workflow-stage" ref={flowRef}>
          <aside className="workflow-principle"><span>CURRENT POSITION</span><strong>AI-native<br />Operator</strong><p>Define clearly.<br />Review critically.<br />Own the outcome.</p></aside>
          <div className="workflow-rail"><div className="flow-line"><span /></div>{steps.map(([number, en, zh]) => <article className="flow-step" key={number}><span className="flow-number">{number}</span><div className="flow-node" /><div><h3>{en}</h3><p>{zh}</p></div></article>)}</div>
        </div>
      </section>

      <section className="chapter about-section" id="about">
        <div className="about-visual" data-reveal><MaintainableImage className="life-image life-main" {...mediaContent.life.campus} /><MaintainableImage className="life-image life-small" {...mediaContent.life.running} /></div>
        <div className="about-copy" data-reveal><p className="eyebrow">04 / ABOUT · LIFE</p><h2>统计、算法、风险与 AI，<br />也是一个人的成长轨迹。</h2><p>从浙江工商大学经济统计学，到厦门大学应用统计，再到真实的支付风控算法场景，我正在把统计基础转化为解决现实问题的能力。</p><p>工作之外，校园、运动和持续学习构成另一面的我。这里未来只放少量真实影像，不做荣誉墙，也不做照片瀑布流。</p><div className="education-line"><span>本科</span><strong>浙江工商大学 · 经济统计学</strong></div><div className="education-line"><span>硕士</span><strong>厦门大学 · 应用统计</strong></div></div>
      </section>

      <section className="closing" id="resume" data-reveal><p className="eyebrow light">05 / RESUME · CONTACT</p><h2>保持判断，持续进化。</h2><p>PDF 简历与联系方式将在信息确认后接入。网站负责深度证明，简历负责标准招聘流程。</p><a className="button light-button" href="#contact">建立联系 <span>↗</span></a></section>
      <footer id="contact"><div><strong>沈鑫达 / Shen Xinda</strong><p>Algorithm · Risk Decision · AI-native Practice</p></div><a href="#top">返回顶部 ↑</a></footer>
    </main>
  );
}
