'use client';

import { useState } from 'react';
import { aiCases, contributionMetrics, fieldSteps, riskPhases } from '../../content/project-evidence';

type Node = readonly [string, string, string];

function ProcessMap({ nodes, label }: { nodes: readonly Node[]; label: string }) {
  const [selected, setSelected] = useState(0);
  return <div className="process-map">
    <ol className="process-nodes" aria-label={label}>{nodes.map(([title, english, description], index) => <li className={selected === index ? 'is-focused' : ''} key={title}>
      <button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} aria-controls={`${label}-detail-${index}`}>
        <span className="process-index">{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><small>{english}</small>
      </button>
      <p className="process-detail" id={`${label}-detail-${index}`}>{description}</p>
    </li>)}</ol>
  </div>;
}

export function ContributionMetrics() {
  return <dl className="contribution-metrics" aria-label="已完成的研究与交付贡献">{contributionMetrics.map(([value, title, note]) => <div key={title}><dt>{title}</dt><dd><strong>{value}</strong><span>{note}</span></dd></div>)}</dl>;
}

export function ProjectEvidence() {
  const [phase, setPhase] = useState(0);
  return <div className="project-evidence-library">
    <article id="risk-pattern" className="risk-case">
      <div className="case-heading"><span className="status wip">WIP · 项目持续推进</span><p className="field-label">PAYMENT RISK · ALGORITHM · DECISION</p><h3>支付风控误伤识别<br />与风险 Pattern 分析</h3><p>从样本关系、策略解释走到宽特征模型实验。可量化的是已经完成的研究与交付，不是尚未验证的线上收益。</p></div>
      <ContributionMetrics />
      <div className="phase-selector" aria-label="快速定位风险研究阶段">{riskPhases.map((item, index) => <button type="button" key={item.title} aria-pressed={phase === index} onClick={() => { setPhase(index); document.getElementById(`risk-phase-${index}`)?.scrollIntoView({block: 'start'}); }}>{item.title}</button>)}</div>
      {riskPhases.map((current, index) => <div className="phase-content" id={`risk-phase-${index}`} key={current.title}><p className="phase-label">{current.title}</p><span className="field-label">{current.english}</span><h4 className="phase-question">{current.question}</h4><ProcessMap nodes={current.nodes} label={`risk-phase-${index}`} />
        <dl className="ownership-evidence"><div><dt>我的贡献</dt><dd>{current.role}</dd></div><div><dt>实际交付</dt><dd>{current.output}</dd></div><div><dt>当前边界</dt><dd>{current.limit}</dd></div></dl>
      </div>)}
    </article>
    <article id="feature-research" className="field-case">
      <div className="case-heading"><span className="status wip">WIP · 部分完成</span><p className="field-label">FEATURE GOVERNANCE · BUSINESS SEMANTICS</p><h3>支付风险字段治理<br />与特征输入建设</h3><p>把复杂原始信息整理成可理解、可判断的风险研究输入。整体项目仍在进行，不能把一个业务分支写成全量完成。</p></div>
      <div className="field-scope"><div><span className="scope-dot completed" /><strong>外卖字段</strong><span>该部分已做</span><small>已有工作与知识沉淀</small></div><div><span className="scope-dot pending" /><strong>钱包字段</strong><span>尚未做</span><small>不计入已完成成果</small></div></div>
      <p className="diagram-hint">字段研究框架 · 不代表钱包分支已执行</p><ProcessMap nodes={fieldSteps} label="field-governance" />
      <dl className="ownership-evidence"><div><dt>研究连接</dt><dd>原始字段 → 业务理解 → Feature Engineering → 风险 Pattern 输入。重点是让特征研究可理解、可追溯，而非堆字段名。</dd></div><div><dt>进度口径</dt><dd>外卖与钱包分别维护。钱包待开展；未确认的字段数量、产物数量与效果不作为成果展示。</dd></div></dl>
    </article>
  </div>;
}

export function ProjectAIWorkflow() {
  const [selected, setSelected] = useState(0);
  return <div className="project-ai">
    <div className="phase-selector" aria-label="快速定位 AI 协作案例">{aiCases.map((item, index) => <button type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); document.getElementById(`ai-case-${index}`)?.scrollIntoView({block: 'start'}); }} key={item.title}>{item.title}</button>)}</div>
    {aiCases.map((current, index) => <div className="ai-case-readthrough" id={`ai-case-${index}`} key={current.title}><h3>{current.title}</h3><p className="case-subtitle">{current.subtitle}</p><ProcessMap nodes={current.steps} label={`ai-case-${index}`} /></div>)}
    <p className="ai-ownership">AI-native Practitioner / Agent Operator <span>AI 扩大执行能力；问题定义、结果理解与最终责任由我承担。</span></p>
  </div>;
}
