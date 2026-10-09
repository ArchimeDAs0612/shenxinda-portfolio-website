'use client';

/* eslint-disable @next/next/no-img-element -- Brand SVG files use stable relative paths across GitHub Pages and local previews. */

import { useEffect, useRef, useState } from 'react';
import { MaintainableImage } from './components/MaintainableImage';
import { contactContent, mediaContent } from '../content/site-content';
import { careerContent } from '../content/career-content';
import { PublicProjects } from './components/PublicProjects';
import { ProjectAIWorkflow } from './components/EvidenceExplorer';
import { AmbientMusic } from './components/AmbientMusic';
import { PortfolioHero } from './components/PortfolioHero';
import { InternshipOverview } from './components/ZeekrJourney';

const navItems = [
  ['top', '首页'], ['internships', '职业'], ['projects', '项目'],
  ['ai', 'AI 与创作'], ['about', '关于我'],
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
      <section className="chapter portal-career" id="internships" aria-labelledby="internships-title"><span id="work" className="anchor-alias" /><p className="eyebrow">CAREER / 职业与项目</p><h2 id="internships-title">两段经历，一条能力路径。</h2><p className="portal-lead">从全国销售经营分析，到真实支付风险研究。用数据理解业务，让方法服务判断。</p><InternshipOverview /></section>

      <section className="chapter projects-section" id="projects" aria-labelledby="projects-title">
        <div className="portal-section-heading"><p className="eyebrow">SELECTED PROJECTS / 正在研究</p><h2 id="projects-title">从真实问题，走向可信判断。</h2><p className="portal-lead">先看问题、工作与进展；如果想深入，再展开研究方法。</p></div>
        <PublicProjects />
      </section>

      <section className="chapter workflow-section" id="ai">
        <div className="portal-section-heading"><p className="eyebrow">AI / PRACTICE & CREATION</p><h2>让 AI 扩展执行，也扩展表达。</h2><p className="portal-lead">在研究与开发里，我定义问题、组织 Context、委派 Coding Agent，并审查和验证交付；在创作里，把生成式 AI 组织成完整发布流程。</p></div>
        <div className="portal-ai-summary"><div><span className="field-label">AI-NATIVE PRACTITIONER / AGENT OPERATOR</span><h3>任务交给 Agent，判断留给人。</h3><p>{careerContent.agentUses}</p></div><ol>{['定义问题与约束', '组织 Context 与任务', 'Agent 执行与迭代', '人工审查与验证'].map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></div>
        <div className="portal-ai-cases"><h3 className="portal-ai-title">两个项目中的具体 AI 协作</h3><ProjectAIWorkflow /></div>
      </section>

      <section className="chapter exploration-section" id="exploration" aria-labelledby="exploration-title">
        <div className="aigc-compact aigc-dual"><div><p className="eyebrow">CREATIVE EXPLORATION / 创作栏目</p><h2 id="exploration-title">另一种表达，另一种实验。</h2></div><div className="aigc-collections"><article><div className="creation-art creation-absurd" role="img" aria-label="荒诞研究所栏目视觉，非作品截图"><span>AI / SOCIAL OBSERVATION</span><b>荒诞<br />研究所</b><i>想象，与现实对话。</i></div><h3>《{careerContent.aigc.title}》</h3><p>{careerContent.aigc.description}</p><div className="aigc-stats"><div><strong>{careerContent.aigc.views}</strong><span>{careerContent.aigc.metricScope}累计播放</span></div><div><strong>{careerContent.aigc.likes}</strong><span>累计点赞</span></div></div><small>截至 {careerContent.aigc.dataAsOf} · 非实时数据</small></article><article><div className="creation-art creation-probability" role="img" aria-label="概率引擎栏目视觉，非作品截图"><span>STATISTICS / EVERYDAY LIFE</span><b>概率<br />引擎</b><i>让抽象的理论，走进生活。</i></div><h3>《{careerContent.aigc.probabilityEngine.title}》</h3><p>{careerContent.aigc.probabilityEngine.description}</p><small>{careerContent.aigc.probabilityEngine.status} · 尚未作为已发布作品展示</small></article></div><p className="aigc-production">{careerContent.aigc.production}</p><a className="portal-social-link" href={contactContent.xiaohongshuUrl} target="_blank" rel="noreferrer">到我的小红书主页，看看内容与生活 ↗</a><p className="metric-source">以上为栏目视觉，不是作品截图。作品合集直链待补充。</p></div>
      </section>

      <div className="identity-overview">
        <section className="chapter education-section" id="education" aria-labelledby="education-title">
          <p className="eyebrow">EDUCATION & JOURNEY / 成长经历</p><h2 id="education-title">从统计出发，<br />走进真实问题。</h2>
          <div className="education-grid"><article><span className="field-label">2028年毕业 / 硕士</span><h3>厦门大学</h3><p>应用统计硕士 · 保研入学</p><small>统计学与数据科学系 · 2027届校招</small></article><article><span className="field-label">本科</span><h3>浙江工商大学</h3><p>统计与数据科学学院 · 经济统计学本科</p><small>GPA 3.93 / 5 · 专业前3%</small></article></div>
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
      </div>

      <section className="contact-section" id="contact" data-reveal aria-labelledby="contact-title">
        <div className="contact-intro">
          <p className="eyebrow light">CONTACT / 联系我</p>
          <h2 id="contact-title">保持判断，<br />持续进化。</h2>
          <p>欢迎交流风险决策、机器学习与 AI 实践，也欢迎职业机会、同行交流与内容合作。</p>
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

      <footer><div><strong>沈鑫达 / Shen Xinda</strong><p>Statistics · Risk Decision · AI Creation</p><p>内容更新：{careerContent.updatedAt} · 个人门户，非公司官方信息</p></div><a href="#top">返回顶部 ↑</a></footer>

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
