import { seg2Cases } from '../../content/seg2-cases';
import { ScientificDiagram } from './ScientificDiagram';

// Previously shared links keep pointing to their corresponding research topic.
const entryTitles: Record<string, string> = {
  fieldops: 'FieldOps 联合治理',
  'risk-pattern': 'FP 研究与 Pattern 发现',
  'feature-research': '钱包与外卖字段治理',
  'risk-lab': 'Risk Decision Lab',
};

const legacyAnchors: Record<string, string[]> = {
  'fieldops-purpose': ['ai-case-1'],
  'fieldops-engineering': ['ai-case-0'],
  'risk-discovery': ['risk-phase-0'],
  'risk-validation': ['risk-phase-1', 'risk-phase-2'],
};

export function PublicProjects() {
  return <>
    <nav className="portal-project-grid seg2-directory" aria-label="项目目录">
      {seg2Cases.map((project) => <a className="portal-project" href={`#${project.id}`} key={project.id}>
        <div className="portal-project-meta"><span className="portal-project-number">{project.number}</span><span className="status">{project.status}</span></div>
        <h3>{entryTitles[project.id]}<span className="case-entry-arrow" aria-hidden="true">↘</span></h3>
        <p className="project-question">{project.problem}</p>
      </a>)}
    </nav>
    <section id="research-details" className="seg2-cases" aria-label="项目、个人贡献与交付">
      {seg2Cases.map((project) => <article id={project.id} className="seg2-case" key={project.id} aria-labelledby={`${project.id}-title`}>
        {project.id === 'fieldops' && <span id="ai" className="anchor-alias" />}
        <header className="seg2-case-heading">
          <div><span className="status">{project.status}</span><h3 id={`${project.id}-title`}>{project.title}</h3><p>{project.problem}</p></div>
          <dl className="seg2-case-summary"><div><dt>我负责什么</dt><dd>{project.contribution}</dd></div><div><dt>交付到哪一步</dt><dd>{project.delivery}</dd></div></dl>
        </header>
        <div className="career-tags seg2-case-tags" aria-label="项目方法与工具">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {project.links && <div className="seg2-case-links">{project.links.map((link) => <a className="button quiet" href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
        {project.figures.map((figure) => <section className="seg2-figure-section" id={figure.kind === 'risk-lab' ? 'risk-lab-method' : figure.kind} key={figure.kind} aria-label={figure.title}>
          {(legacyAnchors[figure.kind] ?? []).map((id) => <span id={id} className="anchor-alias" key={id} />)}
          <ScientificDiagram kind={figure.kind} />
          <dl className="seg2-figure-contribution"><div><dt>我的判断与推进</dt><dd>{figure.contribution}</dd></div><div><dt>形成的交付</dt><dd>{figure.delivery}</dd></div></dl>
        </section>)}
        <a className="case-back-link" href="#projects">回到项目目录 ↑</a>
      </article>)}
    </section>
  </>;
}
