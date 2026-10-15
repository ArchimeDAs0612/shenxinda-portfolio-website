'use client';

import { useState } from 'react';
import { aiCases, contributionMetrics, fieldSteps, riskPhases } from '../../content/project-evidence';
import { ScientificDiagram } from './ScientificDiagram';

type Node = readonly [string, string, string];

function ProcessMap({ nodes, label }: { nodes: readonly Node[]; label: string }) {
  const [selected, setSelected] = useState(0);
  return <div className="process-map">
    <ScientificDiagram kind={label} />
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
      <div className="case-heading"><span className="status wip">阶段沉淀 + 深化研究进行中</span><p className="field-label">PAYMENT RISK · ALGORITHM · DECISION</p><h3>支付风险 Pattern 研究<br />与潜在误伤分析</h3><p>候选定位 → 验证交付 → 宽特征研究 → 候选深化，是同一母项目的演进，不是四个独立项目。先理解业务，再组织可比较、可解释、可复核的研究。</p></div>
      <aside className="research-context"><strong>业务理解的底座：风控 Landing 知识体系</strong><p>将风险信息、模型与策略判断、动作及反馈组织成完整决策链解释，形成阶段知识沉淀。我确定范围与正文，团队提供知识与评审，AI 辅助解释、绘图和整理；不等于生产系统建设或正式推广。</p></aside>
      <p className="metric-source">以下数字仅对应既有阶段实验与交付，不代表最新全部研究规模或业务收益。</p>
      <ContributionMetrics />
      <div className="phase-selector" aria-label="快速定位风险研究阶段">{riskPhases.map((item, index) => <button type="button" key={item.title} aria-pressed={phase === index} onClick={() => { setPhase(index); document.getElementById(`risk-phase-${index}`)?.scrollIntoView({block: 'start'}); }}>{item.title}</button>)}</div>
      {riskPhases.map((current, index) => <div className="phase-content" id={`risk-phase-${index}`} key={current.title}><p className="phase-label">{current.title}</p><span className="field-label">{current.english}</span><h4 className="phase-question">{current.question}</h4><ProcessMap nodes={current.nodes} label={`risk-phase-${index}`} />
        <dl className="ownership-evidence"><div><dt>我的贡献</dt><dd>{current.role}</dd></div><div><dt>实际交付</dt><dd>{current.output}</dd></div><div><dt>当前边界</dt><dd>{current.limit}</dd></div></dl>
      </div>)}
    </article>
    <article id="feature-research" className="field-case">
      <div className="case-heading"><span className="status wip">知识资产已交付 · 业务验证继续</span><p className="field-label">FEATURE GOVERNANCE · BUSINESS SEMANTICS</p><h3>支付风险字段治理<br />与特征输入建设</h3><p>从字段解析与业务理解，走到有明确业务归属、证据版本和调用边界的研究输入。研究阶段、知识发布与业务准入分别记录。</p></div>
      <div className="field-scope"><div><span className="scope-dot completed" /><strong>钱包研究</strong><span>研究阶段已封板</span><small>独立知识库已发布</small></div><div><span className="scope-dot completed" /><strong>外卖字段资产</strong><span>知识库已拆分发布</span><small>研究与业务准入继续推进</small></div></div>
      <p className="diagram-hint">按已确认的研究与知识交付状态展示；发布成功不自动代表业务有效。</p><ProcessMap nodes={fieldSteps} label="field-governance" />
      <dl className="ownership-evidence"><div><dt>研究连接</dt><dd>原始信息 → 业务语义与特征族 → 决策时点与证据核验 → 研究输入。内容正确之外，还要保证调用属于正确业务和版本。</dd></div><div><dt>个人与 AI 分工</dt><dd>我识别跨业务混放，确定拆分边界和验收要求；Agent 执行迁移、内容结构核对与发布检查。外卖业务准入和完整 Pattern Agent 仍待验证。</dd></div></dl>
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
