'use client';

/* eslint-disable @next/next/no-img-element -- Brand SVG files use stable relative paths across GitHub Pages and local previews. */

import { useEffect, useRef, useState } from 'react';
import { MaintainableImage } from './components/MaintainableImage';
import { contactContent, mediaContent } from '../content/site-content';
import { careerContent } from '../content/career-content';

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
  ['top', '首页'], ['work', '经历'], ['projects', '项目'],
  ['ai', 'AI 实践'], ['about', '关于我'],
] as const;

export default function Home() {
  const [active, setActive] = useState('top');
  const [compact, setCompact] = useState(false);
  const [lifeIndex, setLifeIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailCopyError, setEmailCopyError] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [wechatQrMissing, setWechatQrMissing] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);
  const copyFeedbackTimerRef = useRef<number | null>(null);
  const wechatTriggerRef = useRef<HTMLButtonElement>(null);
  const wechatCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setLifeIndex((current) => (current + 1) % mediaContent.life.photos.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!wechatOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = wechatTriggerRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setWechatOpen(false);
      // This dialog has one interactive control; keep keyboard focus inside it.
      if (event.key === 'Tab') {
        event.preventDefault();
        wechatCloseRef.current?.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.requestAnimationFrame(() => wechatCloseRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      trigger?.focus();
    };
  }, [wechatOpen]);

  useEffect(() => () => {
    if (copyFeedbackTimerRef.current) window.clearTimeout(copyFeedbackTimerRef.current);
  }, []);

  const copyEmail = async () => {
    setEmailCopyError(false);
    try {
      await navigator.clipboard.writeText(contactContent.email);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = contactContent.email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand('copy');
      textArea.remove();
      if (!copied) {
        setEmailCopyError(true);
        setEmailCopied(false);
        return;
      }
    }

    setEmailCopied(true);
    if (copyFeedbackTimerRef.current) window.clearTimeout(copyFeedbackTimerRef.current);
    copyFeedbackTimerRef.current = window.setTimeout(() => setEmailCopied(false), 1800);
  };

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
          <details className="mobile-nav"><summary>导航</summary><div>{[...navItems, ['exploration', 'AI 创作'], ['education', '教育背景']].map(([id, label]) => <a href={`#${id}`} key={id} onClick={(event) => event.currentTarget.closest('details')?.removeAttribute('open')}>{label}</a>)}</div></details>
          <a className="contact-button" href="#contact">联系我</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <MaintainableImage className="hero-background" priority {...mediaContent.heroBackground} />
        <div className="hero-copy">
          <p className="eyebrow hero-enter enter-one">ALGORITHM · RISK DECISION · AI-NATIVE</p>
          <h1 className="hero-enter enter-two" id="hero-title">沈鑫达</h1>
          <p className="hero-role hero-enter enter-three">机器学习与风险决策实践者</p>
          <div className="hero-identity hero-enter enter-four"><p>厦门大学 · 应用统计硕士</p><p>滴滴国际支付风控算法实习生</p></div>
          <p className="hero-statement hero-enter enter-four">以应用统计为底座，以算法与机器学习为主线。支付风险与智能决策是我当前最深的业务实践；AI Agent 是执行杠杆，而非判断的替代品。</p>
          <div className="actions hero-enter enter-four"><a className="button primary" href="#projects">查看项目 <span>↘</span></a><a className="button quiet" href="#contact">简历与联系</a></div>
          <div className="hero-proof hero-enter enter-four" aria-label="核心经历"><span><b>滴滴</b> 国际支付风控算法实习</span><span><b>ZEEKR 极氪</b> 数据分析实习</span><span><b>国家级竞赛</b> 特等奖 / 一等奖</span></div>
        </div>
        <div className="portrait-wrap">
          <MaintainableImage className="portrait-frame" priority {...mediaContent.profile} />
          <div className="portrait-caption"><span>XIAMEN · CHINA</span><span>2026</span></div>
        </div>
        <a className="scroll-cue" href="#work"><span />SCROLL TO EXPLORE</a>
      </section>

      <section className="chapter work-section" id="work">
        <div className="chapter-intro work-intro" data-reveal><p className="eyebrow light">01 / CURRENT EXPERIENCE</p><h2>真实场景，<br />锻炼判断。</h2><p>统计与数据分析是起点；当前的工作重心，是支付风险中的特征、模型、Pattern 与决策验证。</p></div>
        <div className="career-story">
          <article className="career-feature" data-reveal><div className="career-meta"><span className="status fact">FACT · 实习经历</span><span>INTERNATIONAL PAYMENT RISK</span></div><div className="career-company" aria-hidden="true">DIDI</div><div className="career-content"><div className="company-logo-shell didi-logo-shell"><img className="company-logo didi-logo" src="images/brands/didi.svg" alt="滴滴出行 Logo" /></div><p className="company-description">滴滴 · 移动出行平台 · 国际支付风险场景</p><h3>国际支付风控算法实习</h3><p>关注风险识别，也关注误伤与策略判断。从特征分析走向机器学习辅助发现，再回到证据是否支持业务结论。</p><ul className="experience-focus">{careerContent.didiFocus.map((focus) => <li key={focus}>{focus}</li>)}</ul><div className="career-tags"><span>支付风险业务理解</span><span>机器学习</span><span>风险决策</span><span>AI-native Workflow</span></div><a className="career-project-link" href="#projects">阅读两条项目线与验证边界 ↘</a><p className="privacy-note">以下项目均为 WIP。仅展示去敏方法，不披露内部数据、规则、业务指标或实现。</p></div></article>
          <article className="career-secondary" data-reveal><div><span className="status fact">FACT</span><div className="company-logo-shell zeekr-logo-shell"><img className="company-logo zeekr-logo" src="images/brands/zeekr.svg" alt="极氪 ZEEKR Logo" /></div><p className="company-description">高端智能电动品牌 · 数据分析实习</p><h3>数据分析实习</h3></div><p>职业能力路径中的数据分析实践，为后续进入算法与决策问题建立业务理解基础。</p><span className="career-index">EXPERIENCE 02</span></article>
        </div>
      </section>

      <section className="chapter projects-section" id="projects" aria-labelledby="projects-title">
        <div className="chapter-intro" data-reveal><p className="eyebrow">02 / SELECTED PROJECTS</p><h2 id="projects-title">讲清方法，<br />守住边界。</h2><p>两条互补的支付风险研究线：一条探索 Pattern 与模型，一条建设可信的特征输入。阶段工作已发生，项目结论仍在验证。</p></div>
        <div className="project-narratives">
          {careerContent.projects.map((project) => <article className="project-narrative" id={project.id} key={project.id} data-reveal>
            <div className="project-heading"><div className="project-number">{project.number}</div><div><span className="status wip">{project.status}</span><h3>{project.title}</h3><p className="project-english">{project.english}</p></div></div>
            <div className="project-body"><div><span className="field-label">PROBLEM / 问题</span><p>{project.problem}</p></div><div><span className="field-label">MY WORK / 我的工作</span><p>{project.work}</p></div></div>
            <p className="project-evidence"><strong>当前进展</strong>{project.evidence}</p>
            <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <details className="project-details"><summary>展开方法、评价与反思 <span aria-hidden="true">＋</span></summary><dl>{project.details.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl></details>
          </article>)}
        </div>
        <p className="content-boundary">公开摘要 ≠ 公司官方口径。没有上线、正式策略、收益提升或生产模型所有权的声明。</p>
      </section>

      <section className="chapter workflow-section" id="ai">
        <div className="workflow-intro" data-reveal><p className="eyebrow">03 / HOW I WORK WITH AI</p><h2>让 Agent 扩大执行能力，<br />让人保留最终判断。</h2><p>AI-native Practitioner / Agent Operator 是我当前的真实定位。通过 Context 管理、任务委派和多轮结果审查，把 Coding Agent 嵌入工作；不把调用工具包装成成熟 Agent 系统工程。</p><div className="agent-use"><span className="field-label">真实使用场景</span><p>{careerContent.agentUses}</p><p>我定义问题与约束，理解输出、检查矛盾、重新迭代，再验证交付。</p></div></div>
        <div className="workflow-stage" ref={flowRef}>
          <aside className="workflow-principle"><span>CURRENT POSITION</span><strong>AI-native<br />Operator</strong><p>Define clearly.<br />Review critically.<br />Own the outcome.</p></aside>
          <div className="workflow-rail"><div className="flow-line"><span /></div>{steps.map(([number, en, zh]) => <article className="flow-step" key={number}><span className="flow-number">{number}</span><div className="flow-node" /><div><h3>{en}</h3><p>{zh}</p></div></article>)}</div>
        </div>
      </section>

      <section className="chapter exploration-section" id="exploration" aria-labelledby="exploration-title">
        <div className="chapter-intro" data-reveal><p className="eyebrow">04 / AI EXPLORATION</p><h2 id="exploration-title">跨界创作，<br />持续验证。</h2><p>工作之外，我也用生成式 AI 做连续内容实验。这里展示的是产品实验意识与生产思维，不把流量当作算法能力的证明。</p></div>
        <div className="aigc-story" data-reveal>
          <div className="aigc-overview"><p className="field-label">{careerContent.aigc.english}</p><h3>《{careerContent.aigc.title}》</h3><p>{careerContent.aigc.question}</p><div className="aigc-stats"><div><strong>{careerContent.aigc.views}</strong><span>抖音累计播放</span></div><div><strong>{careerContent.aigc.likes}</strong><span>累计点赞</span></div></div><p className="metric-source"><span className="status fact">FACT · 用户确认</span>截至 {careerContent.aigc.dataAsOf} · 非实时数据</p><p className="aigc-state"><span className="status wip">WIP</span> 内容生产体系持续迭代。已发布作品与脚本储备分开记录，不承诺下一次播放结果。</p></div>
          <ol className="production-flow" aria-label="AIGC 内容生产工作流">{careerContent.aigc.process.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{title}</h4><p>{description}</p></div></li>)}</ol>
        </div>
        <p className="content-boundary">AI 协作，而非全自动发布：创意取舍、素材验收、剪辑与最终交付仍由人负责。跨平台差异保留为反馈，不宣称跨平台成功。</p>
      </section>

      <section className="chapter education-section" id="education" aria-labelledby="education-title">
        <div className="chapter-intro" data-reveal><p className="eyebrow">05 / EDUCATION & JOURNEY</p><h2 id="education-title">从统计出发，<br />走进真实问题。</h2><p>统计基础 → 数据分析 → 支付风险算法与决策。AI 工作方式伴随这条路径成长，而不是替代专业能力。</p></div>
        <div className="education-grid" data-reveal><article><span className="field-label">硕士 / FACT</span><h3>厦门大学</h3><p>应用统计硕士</p><small>统计学与数据科学系</small></article><article><span className="field-label">本科 / FACT</span><h3>浙江工商大学</h3><p>经济统计学本科</p><small>GPA 3.93 / 5 · 专业前3% · 保研综合第一</small></article></div>
        <div className="credential-line" data-reveal><span className="field-label">代表荣誉 / FACT</span><p>挑战杯国家特等奖 <span>山海协作</span></p><p>正大杯国家一等奖 <span>数字经济 × 杭州数字文旅</span></p></div>
      </section>

      <section className="chapter about-section" id="about">
        <div className="about-visual" data-reveal>
          <div className="life-carousel" aria-roledescription="carousel" aria-label="生活照片">
            <MaintainableImage key={lifeIndex} className="life-image life-current" {...mediaContent.life.photos[lifeIndex]} />
            <div className="carousel-controls"><span>{String(lifeIndex + 1).padStart(2, '0')} / {String(mediaContent.life.photos.length).padStart(2, '0')}</span><div className="carousel-buttons"><button type="button" onClick={() => setLifeIndex((lifeIndex - 1 + mediaContent.life.photos.length) % mediaContent.life.photos.length)} aria-label="上一张生活照片">←</button><button type="button" onClick={() => setLifeIndex((lifeIndex + 1) % mediaContent.life.photos.length)} aria-label="下一张生活照片">→</button></div></div>
            <div className="carousel-dots" aria-label="选择生活照片">{mediaContent.life.photos.map((photo, index) => <button type="button" className={index === lifeIndex ? 'active' : ''} onClick={() => setLifeIndex(index)} aria-label={`查看第 ${index + 1} 张生活照片`} aria-current={index === lifeIndex ? 'true' : undefined} key={photo.src} />)}</div>
          </div>
        </div>
        <div className="about-copy" data-reveal><p className="eyebrow">06 / LIFE · PERSONAL</p><h2>不只在工作里，<br />也在生活里持续探索。</h2><p>从厦大校园走到北京实习，在统计、算法和真实业务之间寻找连接；也在跑步与马拉松中，把耐心带回日常。</p><p>生活影像、AIGC 创作与小红书里的成长记录，是职业主页的另一面。它们不替代专业经历，但让这里不只是一份履历。</p><a className="life-contact-link" href="#contact">交流工作，也交流新的想法 ↘</a></div>
      </section>

      <section className="contact-section" id="contact" data-reveal aria-labelledby="contact-title">
        <div className="contact-intro">
          <p className="eyebrow light">07 / RESUME & CONTACT</p>
          <h2 id="contact-title">保持判断，<br />持续进化。</h2>
          <p>欢迎交流算法、风险决策、AI Agent，以及实习、校招与职业合作机会。</p>
          <p className="resume-note">需要 PDF 简历，可通过邮箱联系。当前尚未提供可公开下载的 PDF，不设置无效下载入口。</p>
        </div>

        <div className="contact-list">
          <article className="contact-row contact-primary">
            <div className="contact-row-heading"><span>01</span><p>Email / 邮箱</p></div>
            <div className="contact-row-content">
              <a className="contact-email" href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
              <div className="contact-actions">
                <a className="contact-action primary-contact-action" href={`mailto:${contactContent.email}`}>发送邮件 <span aria-hidden="true">↗</span></a>
                <button className="contact-action" type="button" onClick={copyEmail}>复制邮箱</button>
                <span className={`copy-feedback ${emailCopied || emailCopyError ? 'is-visible' : ''}`} role="status" aria-live="polite">{emailCopied ? '已复制' : emailCopyError ? '复制失败，请手动选择邮箱' : ''}</span>
              </div>
            </div>
          </article>

          <article className="contact-row">
            <div className="contact-row-heading"><span>02</span><p>WeChat / 微信</p></div>
            <div className="contact-row-content compact-contact-content">
              <p>国内沟通的辅助入口</p>
              <button className="contact-action" type="button" ref={wechatTriggerRef} onClick={() => { setWechatQrMissing(false); setWechatOpen(true); }}>微信联系 <span aria-hidden="true">↗</span></button>
            </div>
          </article>

          <article className="contact-row">
            <div className="contact-row-heading"><span>03</span><p>Xiaohongshu / 小红书</p></div>
            <div className="contact-row-content xiaohongshu-content">
              <div><strong>{contactContent.xiaohongshuName}</strong><p>小红书号：{contactContent.xiaohongshuId}</p><small>{contactContent.xiaohongshuDescription}</small></div>
              {contactContent.xiaohongshuUrl ? (
                <a className="contact-action" href={contactContent.xiaohongshuUrl} target="_blank" rel="noreferrer">查看小红书 <span aria-hidden="true">↗</span></a>
              ) : (
                <button className="contact-action" type="button" disabled title="准确链接接入后开放">查看小红书 <span aria-hidden="true">↗</span></button>
              )}
            </div>
          </article>
        </div>
      </section>

      <footer><div><strong>沈鑫达 / Shen Xinda</strong><p>Algorithm · Risk Decision · AI-native Practice</p><p>内容更新：{careerContent.updatedAt} · FACT 已确认 / WIP 进行中 / PLAN 未来目标 / INFERENCE 合理解释</p></div><a href="#top">返回顶部 ↑</a></footer>

      {wechatOpen && (
        <div className="wechat-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setWechatOpen(false); }}>
          <section className="wechat-modal" role="dialog" aria-modal="true" aria-labelledby="wechat-modal-title">
            <button className="wechat-modal-close" type="button" ref={wechatCloseRef} onClick={() => setWechatOpen(false)} aria-label="关闭微信二维码">×</button>
            <p className="wechat-modal-kicker">WECHAT / 微信</p>
            <h2 id="wechat-modal-title">扫码添加微信</h2>
            <div className={`wechat-qr ${wechatQrMissing ? 'is-missing' : ''}`}>
              {!wechatQrMissing && <img src={`${contactContent.wechatQrImage}?v=20260912`} alt="沈鑫达的微信二维码" onError={() => setWechatQrMissing(true)} />}
              {wechatQrMissing && <div className="wechat-qr-fallback"><span>QR</span><strong>二维码待放入</strong><p>替换图片后将自动显示</p></div>}
            </div>
            <p className="wechat-modal-note">{contactContent.wechatNote}</p>
          </section>
        </div>
      )}
    </main>
  );
}
