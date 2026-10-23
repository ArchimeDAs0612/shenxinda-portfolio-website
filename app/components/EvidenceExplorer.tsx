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
      <div className="case-heading"><span className="status">研究与交付已结项</span><p className="field-label">PAYMENT RISK · ALGORITHM · DECISION</p><h3>支付风控短窗口策略<br />误伤复盘与增益识别</h3><p>配对复盘 → 非限额信号与候选回放 → LGBM 消融与路径审查 → 前置细分、金额反证与交接，四阶段及恢复收尾均已完成。它们是同一母项目的演进，不重复计作独立项目。</p></div>
      <aside className="research-context"><strong>业务理解的底座：风控 Landing 知识体系</strong><p>将风险信息、模型与策略判断、动作及反馈组织成完整决策链解释，形成阶段知识沉淀。我确定范围与正文，团队提供知识与评审，AI 辅助解释、绘图和整理；不等于生产系统建设或正式推广。</p></aside>
      <p className="metric-source">以下数字仅对应既有阶段实验与交付，不代表最新全部研究规模或业务收益。</p>
      <ContributionMetrics />
      <div className="phase-selector" aria-label="快速定位风险研究阶段">{riskPhases.map((item, index) => <button type="button" key={item.title} aria-pressed={phase === index} onClick={() => { setPhase(index); document.getElementById(`risk-phase-${index}`)?.scrollIntoView({block: 'start'}); }}>{item.title}</button>)}</div>
      {riskPhases.map((current, index) => <div className="phase-content" id={`risk-phase-${index}`} key={current.title}><p className="phase-label">{current.title}</p><span className="field-label">{current.english}</span><h4 className="phase-question">{current.question}</h4><ProcessMap nodes={current.nodes} label={`risk-phase-${index}`} />
        <dl className="ownership-evidence"><div><dt>我的贡献</dt><dd>{current.role}</dd></div><div><dt>实际交付</dt><dd>{current.output}</dd></div><div><dt>当前边界</dt><dd>{current.limit}</dd></div></dl>
      </div>)}
    </article>
    <article id="feature-research" className="field-case">
      <div className="case-heading"><span className="status">研究与交付已结项</span><p className="field-label">FEATURE GOVERNANCE · BUSINESS SEMANTICS</p><h3>巴西字段 Pattern<br />与 Agent</h3><p>字段库方法论 → 钱包方法沉淀与外卖交接 → 外卖全量整理及可用性分析 → 成果接管、对账与知识库拆分，既定范围均已交付。研究完成与逐字段业务准入分别记录。</p></div>
      <div className="field-scope"><div><span className="scope-dot completed" /><strong>钱包研究</strong><span>研究与方法已封板</span><small>字段资产与迁移 SOP 已交付</small></div><div><span className="scope-dot completed" /><strong>外卖字段资产</strong><span>全量整理与可用性分析已交付</span><small>技术账本、业务目录与独立知识库</small></div></div>
      <p className="diagram-hint">按已确认的研究与知识交付状态展示；发布成功不自动代表业务有效。</p><ProcessMap nodes={fieldSteps} label="field-governance" />
      <dl className="ownership-evidence"><div><dt>研究连接</dt><dd>来源与全量账本 → 语义、解析及质量关系 → 分用途准入 → 同版本知识交付。钱包方法已迁移到外卖，未确认语义、时点与效果仍保留未知。</dd></div><div><dt>个人与 AI 分工</dt><dd>我负责需求、来源和分母纠偏、人工解释规则、业务分库及验收；团队补充数据与业务知识，AI 辅助解析、统计、迁移和交付核对。不认领全部独立编码或生产 Agent 部署。</dd></div><div><dt>交付与后续建设</dt><dd>字段资产、治理 SOP、两业务知识库、对账记录及 Agent 输入评估设计已交付。后续 FieldOps 工作台已有可运行原型，图谱、证据联查、可用性评分和全局看板已验收；下方第六图说明具体能力与个人贡献。</dd></div></dl>
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
