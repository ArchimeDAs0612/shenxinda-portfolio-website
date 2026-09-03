const tags = ['支付风控', '数据科学', '机器学习', '风险决策', 'AI Agent', 'SQL / Python'];

const workflow = [
  ['01', '定义问题'],
  ['02', 'Specification'],
  ['03', '调用 Agent'],
  ['04', '执行'],
  ['05', '评估校验'],
  ['06', '迭代优化'],
  ['07', '验证交付'],
  ['08', 'Human Ownership'],
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#top">
            <strong>沈鑫达</strong><span>Shen Xinda</span>
          </a>
          <div className="nav-links">
            <a className="active" href="#top">首页</a><a href="#work">Work</a>
            <a href="#ai">AI Engineering</a><a href="#about">About</a><a href="#resume">Resume</a>
          </div>
          <a className="contact-button" href="#contact">联系我</a>
        </nav>
      </header>

      <div className="page-shell">
        <section className="hero card">
          <div className="hero-copy">
            <p className="kicker"><span /> AI-NATIVE ALGORITHM &amp; DECISION ENGINEER</p>
            <h1>沈鑫达</h1>
            <h2>风控算法 · 数据科学 · AI 智能决策</h2>
            <div className="identity">
              <p>厦门大学 · 应用统计硕士</p>
              <p>滴滴国际支付风控算法实习生</p>
            </div>
            <div className="tag-list" aria-label="核心能力标签">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="actions">
              <a className="button primary" href="#work">查看项目 <span>↗</span></a>
              <a className="button secondary" href="#resume">下载简历</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="个人职业照片预留区">
            <div className="visual-grid" />
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="portrait-slot">
              <div className="portrait-mark">SX</div>
              <p>职业照片</p><span>PHOTO PLACEHOLDER</span>
            </div>
            <div className="metric metric-a"><b>RISK</b><span>Decision Intelligence</span></div>
            <div className="metric metric-b"><b>AI</b><span>Human Ownership</span></div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-heading">
            <div><p className="section-index">01 / FOCUS</p><h2>我正在解决的问题</h2></div>
            <p>从统计建模到智能决策，聚焦可解释、可评估、可持续迭代的工程问题。</p>
          </div>
          <div className="focus-grid">
            <article className="focus-card card">
              <span className="icon">01</span><h3>支付风控</h3>
              <p>围绕国际支付场景，理解风险识别、策略与模型之间的协作关系。</p>
            </article>
            <article className="focus-card card">
              <span className="icon">02</span><h3>数据科学</h3>
              <p>用统计视角拆解业务问题，让数据证据服务于清晰、可靠的判断。</p>
            </article>
            <article className="focus-card card">
              <span className="icon">03</span><h3>AI Agent</h3>
              <p>探索 Agent 在分析、执行与评估链路中的工程化工作方式。</p>
            </article>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-heading compact">
            <div><p className="section-index">02 / SELECTED WORK</p><h2>精选项目</h2></div>
            <p>项目内容将在事实材料确认后逐步补充。</p>
          </div>
          <div className="project-grid">
            <article className="project-card card">
              <div className="project-top"><span className="status wip">[WIP]</span><span className="project-no">P / 01</span></div>
              <div><h3>项目名称待补充</h3><p>简介、职责与结果将在完成事实核验后展示。</p></div>
              <div className="project-footer"><span>技术标签待补充</span><span className="detail">查看详情 →</span></div>
            </article>
            <article className="project-card card">
              <div className="project-top"><span className="status plan">[PLAN]</span><span className="project-no">P / 02</span></div>
              <div><h3>项目名称待补充</h3><p>仅保留视觉位置，不添加未经确认的项目经历。</p></div>
              <div className="project-footer"><span>技术标签待补充</span><span className="detail">查看详情 →</span></div>
            </article>
            <article className="project-card card project-more">
              <span className="plus">＋</span><h3>更多项目</h3><p>内容整理中</p>
            </article>
          </div>
        </section>

        <section className="section workflow-section" id="ai">
          <div className="section-heading">
            <div><p className="section-index">03 / AI ENGINEERING</p><h2>AI-native 工作方式</h2></div>
            <p>Agent 扩展执行能力，人始终承担问题定义、判断与最终责任。</p>
          </div>
          <div className="workflow card">
            {workflow.map(([number, label], index) => (
              <div className="workflow-item" key={label}>
                <span className="workflow-number">{number}</span>
                <div className="workflow-dot" />
                <strong>{label}</strong>
                {index < workflow.length - 1 && <span className="workflow-line" />}
              </div>
            ))}
          </div>
        </section>

        <footer id="contact">
          <div><strong>沈鑫达 / Shen Xinda</strong><p>风控算法 · 数据科学 · AI 智能决策</p></div>
          <a href="#top">返回顶部 ↑</a>
        </footer>
        <span id="resume" />
      </div>
    </main>
  );
}
