import type { ReactNode } from 'react';
import { AgentExperimentLoop, AgentSemanticAtlas } from './AgentResearchFigures';
import { ModelCandidateEvolution, FieldKnowledgeEvolution } from './ResearchEvolutionFigures';

type Tone = 'teal' | 'orange' | 'neutral';
function Block({ x, y, w = 180, h = 76, title, sub, tone = 'neutral', dashed = false, children }: { x: number; y: number; w?: number; h?: number; title: string; sub?: string; tone?: Tone; dashed?: boolean; children?: ReactNode }) {
  return <g className={`research-block tone-${tone} ${dashed ? 'is-provisional' : ''}`} transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="6" /><rect className="block-accent" width="4" height={h - 16} x="0" y="8" rx="2" />
    <text x="16" y="29" className="block-title">{title}</text>{sub && <text x="16" y="51" className="block-sub">{sub}</text>}{children}
  </g>;
}
function Edge({ d, id, dashed = false, tone = 'neutral' }: { d: string; id: string; dashed?: boolean; tone?: Tone }) {
  return <path d={d} className={`research-edge edge-${tone} ${dashed ? 'is-provisional' : ''}`} markerEnd={`url(#${id}-arrow-${tone})`} />;
}
function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) { return <text x={x} y={y} className="research-label">{children}</text>; }
function Group({ x, y, w, h, title, tone = 'neutral' }: { x: number; y: number; w: number; h: number; title: string; tone?: Tone }) {
  return <g className={`research-group tone-${tone}`}><rect x={x} y={y} width={w} height={h} rx="10" /><text x={x + 16} y={y + 26}>{title}</text></g>;
}

const readingGuide = {
  'risk-phase-0': {
    number: '01', category: 'OBSERVATIONAL DESIGN', headline: '先找可比对象，再找复盘线索。',
    summary: 'Phase 1 配对与短窗复盘已封板。“先被拒绝、后来通过”提供观察入口；先限定可比范围，再检查行为变化。',
    lenses: [['观察入口', '先拒后过的支付关系'], ['研究判断', '样本是否可比？行为哪里不同？'], ['实际产物', '值得复核的候选范围']],
    terms: [['Rej → Pass', '先拒绝，后通过；不等于已确认误伤。'], ['同质比较', '先限定相近的业务背景，再比较差异。']],
    takeaway: '得到复核线索，不直接给出放行或误伤结论。',
  },
  'risk-phase-1': {
    number: '02', category: 'EVIDENCE TRIANGULATION', headline: '把群体差异，追溯到实际决策。',
    summary: 'Phase 2 非限额信号建模、候选回放与策略条件覆盖已交付；分布、条件和动作分别解释，不把覆盖当作实际命中。',
    lenses: [['研究输入', '候选群体与窗口特征'], ['关键核对', '满足条件，是否等于真的命中？'], ['实际产物', '可追溯的分析章节与结果索引']],
    terms: [['条件覆盖', '描述条件满足情况，不代表完整规则或最终动作。'], ['实际命中', '回接动作记录核对，不从覆盖量直接推断。']],
    takeaway: '保留每一层证据的口径，不把相关差异写成因果或收益。',
  },
  'risk-phase-2': {
  "number": "03",
  "category": "MODEL → CANDIDATE → EVIDENCE",
  "headline": "从模型发现，走到候选取舍与业务核验。",
  "summary": "Phase 2.1 的 LGBM 消融、路径与反证，及 Phase 2.2 的前置细分、金额审查、候选交接和恢复收尾均已交付；研究结项不等于业务有效。",
  "lenses": [
    [
      "已完成研究",
      "LGBM 消融、路径与金额反证"
    ],
    [
      "已完成交付",
      "候选取舍、完整回放与恢复交接"
    ],
    [
      "验证边界",
      "真实 OOT 与正式 Pattern 不作完成宣称"
    ]
  ],
  "terms": [
    [
      "结构重现",
      "比较不同训练子集模型的同字段集合路径及命中成员；不是独立业务验证。"
    ],
    [
      "候选取舍",
      "同时看覆盖、浓度和成员包含关系，不将重叠子群相加。"
    ]
  ],
  "takeaway": "研究与交付已结项。结构重现、搜索流程留出与固定规则独立验证分开记录，不以候选更浓推断新增覆盖或业务收益。"
},  'field-governance': {
  "number": "04",
  "category": "FIELD KNOWLEDGE & ADMISSION",
  "headline": "不只整理字段，还要管住业务、版本与调用。",
  "summary": "钱包方法沉淀、外卖全量整理及可用性分析、成果接管对账与知识库拆分均已交付。未确认语义、时点和效果保留未知，不影响既定研究范围结项。",
  "lenses": [
    [
      "研究状态",
      "钱包与外卖研究交付已结项"
    ],
    [
      "知识资产",
      "两业务知识库独立发布"
    ],
    [
      "准入边界",
      "可读与发布成功不等于业务有效"
    ]
  ],
  "terms": [
    [
      "分层验收",
      "物理存在、技术解析、语义、决策时点和效果不自动相互推导。"
    ],
    [
      "调用边界",
      "按业务范围、证据版本和准入状态使用知识。"
    ]
  ],
  "takeaway": "字段资产、SOP、独立知识库与 Agent 输入评估设计已交付；全字段业务准入和生产 Agent 不是本次完成主张。"
},  'ai-case-0': {
  "number": "05",
  "category": "HUMAN–AGENT RESEARCH LOOP",
  "headline": "搭建研究工作流，把执行与判断接成闭环。",
  "summary": "我定义问题、输入版本与验收，Agent 执行代码和整理证据；人工追问候选取舍与结构稳定性，再定向修订，不擅改既有实验和评价口径。",
  "lenses": [
    [
      "我设定",
      "研究问题、对照与修改边界"
    ],
    [
      "Agent 执行",
      "代码、Debug、证据与报告迭代"
    ],
    [
      "我审查",
      "解释、候选取舍与交付验收"
    ]
  ],
  "terms": [
    [
      "方法审查",
      "检查来源、标签、结构稳定性和业务验证的区别。"
    ],
    [
      "Human Ownership",
      "团队评价要求保持；个人承担判断与验收责任。"
    ]
  ],
  "takeaway": "已完成四阶段研究与恢复交付。人、团队和 AI 的责任分别记录，不将 AI 辅助工作流表述为独立生产 Agent。"
},  'ai-case-1': {
  "number": "06",
  "category": "EVIDENCE RECOVERY & BUSINESS ISOLATION",
  "headline": "先恢复可信成果，再让 Agent 在正确范围内工作。",
  "summary": "会话中断后从检查点和交付记录恢复进度。我识别业务混放并确认边界，Agent 迁移、核对和检查发布；知识资产与业务准入分别验收。",
  "lenses": [
    [
      "恢复依据",
      "检查点、交付物与验收回执"
    ],
    [
      "我负责",
      "发现混放、确定业务范围与验收"
    ],
    [
      "Agent 执行",
      "知识迁移、链接核对与发布检查"
    ]
  ],
  "terms": [
    [
      "证据恢复",
      "复用已有可信成果，不以重新执行代替状态核对。"
    ],
    [
      "业务隔离",
      "目录、知识归属、调用入口和版本共同约束使用。"
    ]
  ],
  "takeaway": "研究、接管对账与业务分库已完成；Agent 输入合同、受限检索与评估属于设计交付，不宣称已经实现或部署。"
},} as const;

const descriptions: Record<string, [string, string]> = {
  'risk-phase-0': ['观察范围与候选发现', '以 Rej→Pass 作为复盘入口，经范围拆分、同质比较与窗口分析汇合为复核候选，不将候选视为误伤真值。'],
  'risk-phase-1': ['多层证据与命中审计', '分布、订单覆盖和规则上下文形成证据链；实际动作记录独立回接，条件覆盖与最终命中不等价。'],
  'risk-phase-2': ['模型发现、候选取舍与业务核验', 'LGBM 消融、完整路径回放、前置细分、金额反证与候选交接已完成；原总体回放不等于独立业务验证，真实 OOT 与正式 Pattern 不作完成宣称。'],
  'field-governance': ['字段资产、知识隔离与分层准入', '钱包与外卖研究、可用性分析、接管对账和知识分库已交付；解析、语义、决策时点和效果分别记录。'],
  'ai-case-0': ['人机协作与研究纠偏', '人定义对照与审查方法，Agent 辅助代码、运行与整理；审查结果重新约束执行，最终结论由人负责。'],
  'ai-case-1': ['证据恢复与跨业务知识治理', '检查点和交付记录恢复可信状态，人确定业务边界，Agent 迁移并核对两业务知识资产；发布完成不替代业务准入。'],
};

export function ScientificDiagram({ kind, preview = false, idPrefix = '' }: { kind: string; preview?: boolean; idPrefix?: string }) {
  const [title, description] = descriptions[kind];
  const guide = readingGuide[kind as keyof typeof readingGuide];
  const id = `${idPrefix}research-${kind}`;
  return <figure className={`research-figure${preview ? ' research-preview' : ''}`}>
    <figcaption className="research-heading"><span className="research-number">{guide.number}</span><div><span className="research-kicker">{guide.category}</span><strong>{guide.headline}</strong><p>{guide.summary}</p></div></figcaption>
    {!preview && <dl className="research-readout">{guide.lenses.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
    <div className="research-pan" tabIndex={0} role="region" aria-label={`${title}，可左右滚动`}>
      <svg className="research-svg" viewBox={kind.startsWith('ai-case-') || kind === 'risk-phase-2' || kind === 'field-governance' ? '0 0 1040 580' : '0 0 1040 420'} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{description}</desc>
        <defs>{(['neutral', 'teal', 'orange'] as const).map((tone) => <marker key={tone} id={`${id}-arrow-${tone}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1L9 5L0 9" className={`arrow-${tone}`} /></marker>)}</defs>
        {kind === 'risk-phase-0' && <>
          <Group x={20} y={36} w={238} h={285} title="A / 观察对象" />
          <g className="observation-states"><circle cx="92" cy="145" r="39" /><circle cx="188" cy="145" r="39" /><text x="92" y="145">拒绝</text><text x="188" y="145">通过</text><path d="M132 145h16" /><text x="140" y="220" className="state-caption">Rej → Pass</text><text x="140" y="245" className="state-caption small">这是观察入口，不是标签</text></g>
          <Label x={42} y={289}>观察关系 ≠ 误伤标签</Label>
          <Group x={302} y={36} w={400} h={285} title="B / 可比性与行为研究" tone="teal" />
          <Block x={326} y={85} w={170} title="范围拆分" sub="保留业务背景" />
          <Block x={326} y={218} w={170} title="同质样本比较" sub="先限定可比范围" tone="teal" />
          <Block x={522} y={149} w={158} title="窗口特征" sub="分数切片 / 聚类" tone="teal" />
          <Edge id={id} d="M227 145H280V123H326" /><Edge id={id} d="M411 161V218" />
          <Edge id={id} d="M496 256H508V187H522" tone="teal" />
          <Block x={762} y={149} w={248} h={110} title="复核候选 / 研究输出" sub="短窗口策略复盘优先级" tone="orange"><text x="16" y="83" className="block-sub">不直接形成可放行结论</text></Block>
          <Edge id={id} d="M680 187H762" tone="teal" />
          <path className="research-bracket" d="M326 341v12h354v-12" /><Label x={346} y={382}>研究范围与解释边界先于结论</Label>
        </>}
        {kind === 'risk-phase-1' && <>
          <Group x={20} y={36} w={670} h={285} title="A / 分层解释证据" tone="teal" />
          <g className="evidence-pyramid"><path d="M178 84H282L332 145H128Z" /><path d="M122 154H338L388 217H72Z" /><path d="M66 226H394L444 289H16Z" /><text x="230" y="119">规则上下文</text><text x="230" y="192">订单级条件覆盖</text><text x="230" y="264">分布与分位数画像</text></g>
          <Label x={44} y={314}>三层证据分别解释，不能互相替代</Label>
          <Block x={492} y={145} w={174} h={110} title="候选证据链" sub="保留窗口与分支" tone="teal"><text x="16" y="82" className="block-sub">曾达到 ≠ 同时发生</text></Block>
          <Edge id={id} d="M444 255H469V200H492" tone="teal" />
          <Block x={758} y={75} w={258} title="非限额信号与候选" sub="受约束建模 / 回放" tone="orange" />
          <Block x={758} y={218} w={258} h={103} title="覆盖分析已交付" sub="HTML / 释义 / 可复跑资产" tone="orange" />
          <Edge id={id} d="M887 151V218" tone="orange" /><Edge id={id} d="M666 200H715V265H758" tone="teal" />
          <path className="research-bracket" d="M42 341v12h974v-12" /><Label x={215} y={383}>字段条件覆盖 ≠ 完整规则逻辑 ≠ 最终命中 · 不作因果或收益推断</Label>
        </>}
        {kind === 'risk-phase-2' && <ModelCandidateEvolution id={id} />}
        {kind === 'field-governance' && <FieldKnowledgeEvolution id={id} />}
        {kind === 'ai-case-0' && <AgentExperimentLoop id={id} />}
        {kind === 'ai-case-1' && <AgentSemanticAtlas id={id} />}
      </svg>
    </div>
    {!preview && <><div className="research-interpretation"><span>读图结论</span><p>{guide.takeaway}</p></div>
    <dl className="research-terms">{guide.terms.map(([term, explanation]) => <div key={term}><dt>{term}</dt><dd>{explanation}</dd></div>)}</dl>
    <p className="research-legend"><span className="legend-teal">研究 / 执行</span><span className="legend-orange">审查 / 责任 / 准入</span><span>虚线：待验证、待开展或反馈约束</span></p>
    <p className="research-note">方法关系示意，非公司系统架构；不含原始业务数据。手机可左右滑动查看完整图，全部说明也在下方直接呈现。</p></>}
  </figure>;
}
