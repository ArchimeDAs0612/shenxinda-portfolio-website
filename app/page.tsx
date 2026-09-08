const workflow = [
  ['01', '定义与约束', ['定义问题', '提供 Context', 'Specification']],
  ['02', 'Agent 执行', ['Coding Agent', '任务执行', '人工理解结果']],
  ['03', '批判性评估', ['Critical Evaluation', '发现错误 / 矛盾', '重新约束']],
  ['04', '验证与交付', ['Iteration', 'Validation', 'Human Ownership']],
] as const;

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
            <p className="kicker"><span /> ALGORITHM · RISK DECISION · AI-NATIVE PRACTICE</p>
            <h1>沈鑫达</h1>
            <h2>机器学习与风险决策实践者</h2>
            <div className="identity">
              <p>厦门大学 · 应用统计硕士</p>
              <p>滴滴国际支付风控算法实习生</p>
            </div>
            <div className="positioning" aria-label="当前职业定位">
              <span>Algorithm First</span>
              <span>Risk Decision Domain</span>
              <span>AI-native Operator</span>
            </div>
            <p className="career-note">算法能力为主线，支付风控是当前真实落地最深的业务场景。</p>
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
            <div><p className="section-index">01 / CORE CAPABILITIES</p><h2>核心能力</h2></div>
            <p>以算法能力为主线，连接风险场景、智能决策与 AI-native 工作方式。</p>
          </div>
          <div className="focus-grid">
            <article className="focus-card card">
              <span className="icon">01</span><p className="capability-en">ALGORITHM</p><h3>机器学习</h3>
              <p>以机器学习与统计方法为核心，关注从问题定义到模型评估的完整链路。</p>
            </article>
            <article className="focus-card card">
              <span className="icon">02</span><p className="capability-en">RISK DECISION</p><h3>风控算法</h3>
              <p>在国际支付场景中实践风险识别、策略分析与算法评估。</p>
            </article>
            <article className="focus-card card">
              <span className="icon">03</span><p className="capability-en">DECISION INTELLIGENCE</p><h3>智能决策</h3>
              <p>连接模型输出、业务约束与风险判断，形成可解释的决策过程。</p>
            </article>
            <article className="focus-card card">
              <span className="icon">04</span><p className="capability-en">AI-NATIVE PRACTICE</p><h3>Agent 协作</h3>
              <p>将 Coding Agent 嵌入分析、开发、评估与交付流程，由人承担最终判断。</p>
            </article>
          </div>
          <div className="foundation-bar card">
            <div><span>能力底座</span><strong>Statistics · Python · SQL · 数据分析</strong></div>
            <p>AI-native Operator <span>当前</span> → Agent Engineer <span>进阶中</span></p>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-heading compact">
            <div><p className="section-index">02 / SELECTED WORK</p><h2>精选经历</h2></div>
            <p>以真实经历建立可信度；具体方法、结果与案例将在完成去敏和事实核验后展开。</p>
          </div>
          <div className="project-grid">
            <article className="project-card card">
              <div className="project-top"><span className="status fact">[FACT]</span><span className="project-no">EXPERIENCE / 01</span></div>
              <div><p className="project-company">滴滴</p><h3>国际支付风控算法实习</h3><p>当前最重要的算法实践场景，聚焦支付风险问题、分析判断与评估流程。</p></div>
              <div className="project-footer"><span>风控算法 · 风险决策</span><span className="detail muted-detail">案例去敏整理中</span></div>
            </article>
            <article className="project-card card">
              <div className="project-top"><span className="status fact">[FACT]</span><span className="project-no">EXPERIENCE / 02</span></div>
              <div><p className="project-company">极氪</p><h3>数据分析实习</h3><p>职业能力路径中的数据分析实践，为后续算法与决策能力奠定基础。</p></div>
              <div className="project-footer"><span>数据分析 · 业务理解</span><span className="detail muted-detail">经历整理中</span></div>
            </article>
            <article className="project-card card project-placeholder">
              <div className="project-top"><span className="status wip">[WIP]</span><span className="project-no">PROJECT / 01</span></div>
              <div><p className="project-company">代表性项目</p><h3>项目内容待确认</h3><p>确认真实材料后，再补充问题、方法、评估、结果与反思。</p></div>
              <div className="project-footer"><span>不添加未经确认的信息</span><span className="detail muted-detail">待补充</span></div>
            </article>
          </div>
        </section>

        <section className="section workflow-section" id="ai">
          <div className="section-heading">
            <div><p className="section-index">03 / AI ENGINEERING</p><h2>AI-native 工作方式</h2></div>
            <p>Agent 扩展执行能力，人始终承担问题定义、判断与最终责任。</p>
          </div>
          <div className="workflow card">
            {workflow.map(([number, label, steps], index) => (
              <div className="workflow-item" key={label}>
                <span className="workflow-number">{number}</span>
                <div className="workflow-dot" />
                <strong>{label}</strong>
                <div className="workflow-steps">
                  {steps.map((step) => <span key={step}>{step}</span>)}
                </div>
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
