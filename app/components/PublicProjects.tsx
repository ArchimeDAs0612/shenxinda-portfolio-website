import { careerContent } from '../../content/career-content';
import { ProjectEvidence } from './EvidenceExplorer';

export function PublicProjects() {
  return <>
    <nav className="research-directory" aria-label="研究与 Agent 实践目录">{[['risk-phase-0', '01 / 候选定位'], ['risk-phase-1', '02 / 验证交付'], ['risk-phase-2', '03 / 模型与候选'], ['feature-research', '04 / 字段知识'], ['ai-case-0', '05 / Agent 研究闭环'], ['ai-case-1', '06 / 知识治理与恢复']].map(([id, title]) => <a href={`#${id}`} key={id}>{title}<span aria-hidden="true">↘</span></a>)}</nav>
    <div className="portal-project-grid">
      {careerContent.projects.map((project) => <article className="portal-project" key={project.id}>
        <div className="portal-project-meta"><span>{project.number} / RESEARCH</span><span className="status wip">进行中</span></div>
        <h3>{project.title}</h3>
        <p className="project-question">{project.problem}</p>
        <div className="project-work"><span className="field-label">我做了什么</span><p>{project.work}</p></div>
        <div className="career-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <p className="project-progress"><strong>目前进展</strong>{project.evidence}</p>
      </article>)}
    </div>
    <section className="portal-details research-readthrough" id="research-details" aria-labelledby="research-readthrough-title"><h3 id="research-readthrough-title">研究全景：样本、实验与方法判断</h3><p className="portal-lead">四张研究图直接呈现。前三张是同一 Pattern 研究主线的阶段演进，第四张是字段与知识输入治理；下方继续展示两张 Agent 协作图。</p><ProjectEvidence /><p className="content-boundary">仅展示去敏的方法与个人贡献，不公开内部数据、字段、规则阈值或代码。</p></section>
  </>;
}
