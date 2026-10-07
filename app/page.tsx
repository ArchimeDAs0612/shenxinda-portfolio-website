'use client';

/* eslint-disable @next/next/no-img-element -- Brand SVG files use stable relative paths across GitHub Pages and local previews. */

import { useEffect, useRef, useState } from 'react';
import { MaintainableImage } from './components/MaintainableImage';
import { contactContent, mediaContent } from '../content/site-content';
import { careerContent } from '../content/career-content';
import { CareerWorkspace } from './components/CareerWorkspace';
import { ContributionMetrics, ProjectAIWorkflow, ProjectEvidence } from './components/EvidenceExplorer';
import { AmbientMusic } from './components/AmbientMusic';
import { brandContent } from '../content/brand-content';
import { PortfolioHero } from './components/PortfolioHero';
import { ProjectPreview } from './components/ProjectPreview';
import { InternshipOverview } from './components/ZeekrJourney';

const navItems = [
  ['top', '首页'], ['internships', '实习履历'], ['projects', '项目'],
  ['ai', 'AI 实践'], ['about', '关于我'],
] as const;

export default function Home() {
  const [active, setActive] = useState('top');
  const [compact, setCompact] = useState(false);
  const [lifeIndex, setLifeIndex] = useState(0);
  const [lifePaused, setLifePaused] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailCopyError, setEmailCopyError] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [wechatQrMissing, setWechatQrMissing] = useState(false);
  const copyFeedbackTimerRef = useRef<number | null>(null);
  const wechatTriggerRef = useRef<HTMLButtonElement>(null);
  const wechatCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (lifePaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setLifeIndex((current) => (current + 1) % mediaContent.life.photos.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [lifePaused]);

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
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: .12 });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('motion-ready');
    }
    document.querySelectorAll('[data-reveal]').forEach((node) => revealObserver.observe(node));

    const update = () => {
      setCompact(window.scrollY > 36);
      const current = navItems.map(([id]) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity }))
        .filter((item) => item.top <= 185).sort((a, b) => b.top - a.top)[0];
      if (current) setActive(current.id);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      revealObserver.disconnect();
      document.documentElement.classList.remove('motion-ready');
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

      <PortfolioHero />
      <ProjectPreview />

      <div className="identity-overview">
        <section className="chapter education-section" id="education" aria-labelledby="education-title">
          <p className="eyebrow">EDUCATION & JOURNEY / 成长经历</p><h2 id="education-title">从统计出发，<br />走进真实问题。</h2>
          <div className="education-grid"><article><span className="field-label">硕士 / FACT</span><h3>厦门大学</h3><p>应用统计硕士 · 保研入学</p><small>统计学与数据科学系</small></article><article><span className="field-label">本科 / FACT</span><h3>浙江工商大学</h3><p>统计与数据科学学院 · 经济统计学本科</p><small>GPA 3.93 / 5 · 专业前3%</small></article></div>
          {careerContent.selectedCoursework.length > 0 && <div className="coursework"><span className="field-label">SELECTED COURSEWORK / 已修课程</span><ul>{careerContent.selectedCoursework.map((course) => <li key={course}>{course}</li>)}</ul></div>}
          <p className="journey-credentials">本科阶段曾获挑战杯国家级特等奖（国赛前3%）、正大杯国家一等奖。</p>
          <p className="journey-caption">统计基础 → 业务数据分析 → 支付风险算法与决策</p>
        </section>
        <section className="chapter about-section" id="about">
          <div className="about-visual">
            <div className="life-carousel" aria-roledescription="carousel" aria-label="生活照片">
              <MaintainableImage key={lifeIndex} className="life-image life-current" {...mediaContent.life.photos[lifeIndex]} />
              <div className="carousel-controls"><span>{String(lifeIndex + 1).padStart(2, '0')} / {String(mediaContent.life.photos.length).padStart(2, '0')}</span><div className="carousel-buttons"><button type="button" onClick={() => setLifePaused(!lifePaused)} aria-label={lifePaused ? '恢复照片轮播' : '暂停照片轮播'}>{lifePaused ? '▶' : 'Ⅱ'}</button><button type="button" onClick={() => setLifeIndex((lifeIndex - 1 + mediaContent.life.photos.length) % mediaContent.life.photos.length)} aria-label="上一张生活照片">←</button><button type="button" onClick={() => setLifeIndex((lifeIndex + 1) % mediaContent.life.photos.length)} aria-label="下一张生活照片">→</button></div></div>
              <div className="carousel-dots" aria-label="选择生活照片">{mediaContent.life.photos.map((photo, index) => <button type="button" className={index === lifeIndex ? 'active' : ''} onClick={() => setLifeIndex(index)} aria-label={`查看第 ${index + 1} 张生活照片`} aria-current={index === lifeIndex ? 'true' : undefined} key={photo.src} />)}</div>
            </div>
          </div>
          <div className="about-copy"><p className="eyebrow">XIAMEN → BEIJING / LIFE</p><h2>生活也在场。</h2><p>厦大校园、北漂实习、跑步与马拉松。专业之外的探索，是我的另一面。</p><a className="life-contact-link" href="#contact">交流工作，也交流新的想法 ↘</a></div>
        </section>
        <section className="internships-section" id="internships" aria-labelledby="internships-title"><p className="eyebrow">SELECTED EXPERIENCE / 实习履历</p><h2 id="internships-title">两段经历，一条能力路径。</h2><InternshipOverview /></section>
      </div>

      <CareerWorkspace>
      <section className="chapter work-section" id="work">
        <div className="chapter-intro work-intro" data-reveal><p className="eyebrow light">DIDI / PROJECT CONTEXT</p><h2>滴滴研究，<br />从问题到证据。</h2><p>两段实习已在上方概览。接下来只展开滴滴的风险研究：实际问题、实验与交付，以及形成的方法判断。</p></div>
        <div className="career-story career-story-primary">
          <article className="career-feature" data-reveal>
            <div className="career-meta"><span className="status fact">FACT · 实习经历</span><span>IBG / INTERNATIONAL PAYMENT RISK</span></div>
            <div className="career-content">
              <div className="company-logo-shell didi-logo-shell"><img className="company-logo didi-logo" src="images/brands/didi.svg" alt="滴滴出行 Logo" /></div>
              <p className="company-description">滴滴国际事业群（IBG）· 国际支付风控</p>
              <figure className="company-brand-visual didi-brand-visual"><div className="pay-product-visual"><MaintainableImage className="brand-reference-image" src={brandContent.didi.src} alt={brandContent.didi.alt} label="99PAY" fallbackTitle="99Pay 官方产品视觉" objectPosition="100% 50%" /><div className="pay-product-label"><strong>99Pay</strong><span>BRAZIL / DIGITAL PAYMENTS</span><p>数字支付，连接真实生活。</p></div></div><figcaption>{brandContent.didi.caption}<a href={brandContent.didi.source} target="_blank" rel="noreferrer">99Pay 官网 ↗</a></figcaption></figure>
              <h3>国际支付风控算法实习</h3><p>围绕短窗口误伤复盘，推进样本关系、策略条件解释与宽特征树模型实验；另一条线研究业务字段如何变成可信的风险输入。</p><ContributionMetrics /><ul className="experience-focus">{careerContent.didiFocus.map((focus) => <li key={focus}>{focus}</li>)}</ul><div className="career-tags"><span>Python / SQL</span><span>PySpark GBT</span><span>Feature Engineering</span><span>Risk Decision</span></div><a className="career-project-link" href="#projects">打开项目证据与流程图 ↘</a><p className="privacy-note">上述数量是已完成的实验与汇报贡献。项目仍为 WIP；不将离线指标或研究产物写成线上收益。</p>
            </div>
          </article>
        </div>
      </section>

      <section className="chapter projects-section" id="projects" aria-labelledby="projects-title">
        <div className="chapter-intro" data-reveal><p className="eyebrow">SELECTED PROJECTS / EVIDENCE</p><h2 id="projects-title">问题拆解，<br />实验求证。</h2><p>三个阶段连续呈现：问题如何拆解、实验如何设计，以及我如何审查结果。不需要点击，也能读到完整方法与贡献。</p></div>
        <ProjectEvidence />
        <p className="content-boundary">公开去敏案例：展示个人方法与交付贡献，不展示公司原始数据、内部字段、规则阈值或内部链接。</p>
      </section>

      <section className="chapter workflow-section" id="ai">
        <div className="workflow-intro" data-reveal><p className="eyebrow">AI / PROJECT COLLABORATION</p><h2>把 Agent 放进任务，<br />把判断留给自己。</h2><p>不只列流程名。以项目中的真实执行、方法纠偏与进度约束，说明我如何定义任务、审查结果和完成交付。</p></div>
        <ProjectAIWorkflow />
      </section>
      </CareerWorkspace>

      <section className="chapter exploration-section" id="exploration" aria-labelledby="exploration-title">
        <div className="aigc-compact aigc-dual" data-reveal><div><p className="eyebrow">SIDE EXPLORATION / AI 创作</p><h2 id="exploration-title">把 AI 能力，带到工作之外。</h2></div><div className="aigc-collections"><article><h3>《{careerContent.aigc.title}》</h3><p>{careerContent.aigc.description}</p><div className="aigc-stats"><div><strong>{careerContent.aigc.views}</strong><span>{careerContent.aigc.metricScope}累计播放</span></div><div><strong>{careerContent.aigc.likes}</strong><span>累计点赞</span></div></div><small>截至 {careerContent.aigc.dataAsOf} · 用户确认 · 非实时数据</small></article><article><h3>《{careerContent.aigc.probabilityEngine.title}》</h3><p>{careerContent.aigc.probabilityEngine.description}</p><small>{careerContent.aigc.probabilityEngine.status}</small></article></div><p className="aigc-production">{careerContent.aigc.production}</p><p className="metric-source">跨领域实践：内容生产与交付流程，不以流量作为算法效果证明。</p></div>
      </section>

      <section className="contact-section" id="contact" data-reveal aria-labelledby="contact-title">
        <div className="contact-intro">
          <p className="eyebrow light">07 / RESUME & CONTACT</p>
          <h2 id="contact-title">保持判断，<br />持续进化。</h2>
          <p>欢迎交流算法、风险决策、AI Agent，以及实习、校招与职业合作机会。</p>
          <p className="resume-note">需要 PDF 简历，欢迎通过邮箱联系。</p>
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
                <span className="social-search-note">请在小红书搜索以上账号<br />直链待本人确认</span>
              )}
            </div>
          </article>
        </div>
      </section>

      <footer><div><strong>沈鑫达 / Shen Xinda</strong><p>Algorithm · Risk Decision · AI-native Practice</p><p>内容更新：{careerContent.updatedAt} · FACT 已确认 / WIP 进行中 / PLAN 未来目标 / INFERENCE 合理解释</p></div><a href="#top">返回顶部 ↑</a></footer>

      <AmbientMusic />

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
