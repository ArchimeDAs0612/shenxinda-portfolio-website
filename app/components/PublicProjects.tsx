import { careerContent } from '../../content/career-content';
import { ProjectEvidence } from './EvidenceExplorer';

export function PublicProjects() {
  return <>
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
    <details className="portal-details" id="research-details"><summary>深入了解：样本、实验与方法判断</summary><ProjectEvidence /><p className="content-boundary">仅展示去敏的方法与个人贡献，不公开内部数据、字段、规则阈值或代码。</p></details>
  </>;
}
