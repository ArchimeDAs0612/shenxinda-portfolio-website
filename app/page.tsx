export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="主导航">
        <a className="brand" href="#top">沈鑫达</a>
        <span>Portfolio · 2026</span>
      </nav>
      <section className="hero" id="top">
        <div className="eyebrow">RISK · DATA · AI</div>
        <h1>用数据理解风险，<br />用算法辅助决策。</h1>
        <div className="intro">
          <p className="name">沈鑫达</p><p>厦门大学 · 应用统计硕士</p><p>滴滴国际支付风控算法实习生</p>
        </div>
        <p className="direction">求职方向：风控算法 / 数据科学 / AI 智能决策</p>
        <div className="actions">
          <a className="button primary" href="#projects">查看项目</a>
          <a className="button secondary" href="#resume">下载简历</a>
        </div>
      </section>
      <section className="coming" id="projects">
        <span>SELECTED WORK</span><p>项目案例正在整理中 · Coming Soon</p>
      </section>
      <span className="anchor" id="resume" />
    </main>
  );
}
