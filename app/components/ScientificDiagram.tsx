import { FieldOpsPurpose, FieldOpsEngineering, RiskDiscovery, RiskValidation, FieldMethodTransfer, PublicRiskLab } from './Seg2ResearchFigures';

const readingGuide = {
  'fieldops-purpose': {
    number: '01', category: 'FIELDOPS / GOVERNANCE', headline: '把特征与策略，组织成可审查的治理知识。',
    summary: '以特征和策略为两类治理对象，将用途评价、规则理解、图谱与证据联查连接到知识交付。',
    lenses: [['治理对象', '特征资产与策略规则'], ['我的职责', '核心架构与工程推进'], ['阶段交付', '可追溯的候选治理知识']],
    terms: [['用途评价', '先说明任务能否使用，再解释质量、关系和使用证据，不用一个总分代替依据。'], ['候选治理知识', '携带来源、版本、适用范围与审核状态，供后续研究和人工判断。']],
    takeaway: '评分、图谱与看板帮助人理解和审核；知识生成不自动等于业务批准。',
    description: '特征与策略分别进入用途评价和完整规则理解，经证据联查、评分、图谱、看板及人工审核，形成两类候选治理知识。',
  },
  'fieldops-engineering': {
    number: '02', category: 'FIELDOPS / ENGINEERING', headline: '从治理文档的离线交付，走向跨 Agent 联调。',
    summary: '固定输入版本并审核证据，分别生成特征与策略治理文档；离线批量导出已验收，跨 Agent 端到端验证仍在推进。',
    lenses: [['已验收', '治理文档离线批量导出'], ['本人职责', '子系统设计与离线验收'], ['推进中', '跨 Agent 编排、集成与验证']],
    terms: [['Checkpoint', '记录输入、产物、验证状态与恢复位置，避免失败后从头重做。'], ['工程状态', '核心方案通过评审、已有实现且持续开发；本地测试不等于生产验收。']],
    takeaway: '我负责架构取舍、评价约束、工程推进和交付审查；团队提供业务支持，AI 承担受约束的执行。',
    description: '版本化输入经解析与人工审核，分为特征、策略两类文档，汇合于离线批量导出。我负责治理子系统设计与离线验收，并推进跨 Agent 编排和集成；端到端验证仍在进行。',
  },
  'risk-discovery': {
    number: '03', category: 'FP / MODEL DISCOVERY', headline: '先核查样本来源，再解释模型发现的候选。',
    summary: '从短窗口受阻与配对复盘出发，用历史树模型研究非限额信号，并在宽特征研究中通过输入对照和消融筛选值得回放的组合。',
    lenses: [['问题入口', '支付受阻观察与短窗口复盘'], ['研究方法', '输入对照、模型探索与消融'], ['本人判断', '问题定义、方法纠偏与候选取舍']],
    terms: [['Rej → Pass', '先拒绝、后通过是观察关系，不是已确认的误伤标签。'], ['模型解释', '区分来源、代理标签和业务含义；不同阶段不拼成效果增长曲线。']],
    takeaway: '模型提供发现线索；候选是否值得继续研究，取决于对输入、依赖条件与反证的审查。',
    description: '背景订单与补充样本合并去重，代理正例均来自补充来源。历史树模型实际使用 PySpark GBT，LightGBM 为方案尝试。另在宽特征消融中，移除一组特征后 AP 降幅大于 AUC，不能跨阶段归到历史后端。来源偏差与消融结果共同约束完整路径解释，得到的候选仅交给后续回放。',
  },
  'risk-validation': {
    number: '04', category: 'FP / VALIDATION & HANDOFF', headline: '把候选取舍，落到可复核的证据上。',
    summary: '将完整条件、回放、覆盖与集合关系连接到稳定性和金额反证，形成候选说明与恢复交接。',
    lenses: [['复核对象', '完整路径、候选成员与策略覆盖'], ['取舍依据', '重叠、稳定性与金额反证'], ['已完成交付', '方法流程、回放与版本化交接']],
    terms: [['覆盖与命中', '条件满足、完整规则逻辑与最终动作分别核对，不能相互替代。'], ['验证层次', '结构重现、搜索流程留出与固定规则独立验证分别记录。']],
    takeaway: '研究与交付已结项；真实 OOT、正式 Pattern、生产上线和业务收益不由此推导。',
    description: '还原完整路径并固定输入，复核覆盖、重叠和新增成员，再审查稳定性、前置细分及金额聚集，形成保留排除依据、回放反证和冻结恢复交付。',
  },
  'field-governance': {
    number: '05', category: 'FIELD GOVERNANCE / METHOD TRANSFER', headline: '迁移整理方法，保留每条业务的使用边界。',
    summary: '钱包方法沉淀、外卖全量整理与可用性分析、成果接管对账及知识分库，构成后续 FieldOps 建设的研究基础。',
    lenses: [['已完成范围', '钱包与外卖研究、方法及知识交付'], ['方法核心', '语义、使用条件、质量与关系'], ['交付方式', '分业务知识资产与治理 SOP']],
    terms: [['方法迁移', '迁移检查和整理方法，不把钱包含义直接套给外卖字段。'], ['分层判断', '物理存在、技术解析、业务语义、决策时点和效果各自保留证据状态。']],
    takeaway: '两条研究线已完成既定交付；它们为 FieldOps 提供基础，不与后续工程重复计作一次结项。',
    description: '钱包和外卖保持业务隔离，共享语义使用条件及质量关系整理方法，经人工纠偏和验收，分别形成知识资产、治理SOP及接管记录，支持FieldOps后续建设。',
  },
  'risk-lab': {
    number: '06', category: 'RISK DECISION LAB / PUBLIC WORK', headline: '把研究方法，做成能公开查看的实验作品。',
    summary: '在独立实验环境中组织数据、模型、候选与策略模拟，并用测试、版本记录和失败恢复让工作可接续。',
    lenses: [['作品归属', '独立个人公开项目'], ['可以查看', '代码、运行说明与静态 Demo'], ['协作方式', 'Specification → AI Coding → Review']],
    terms: [['独立研究环境', '使用模拟及许可外部观测资料，与公司研究数据和工程隔离。'], ['工具工作流', '确定性工具调用与恢复机制，不能直接等同于自主规划的 LLM Agent。']],
    takeaway: '公开实验室展示研究实现和工程过程；模拟结果不作为真实支付业务效果的证明。',
    description: '独立实验数据进入模型候选研究、策略成本模拟和版本化实验，结合确定性工具调用、测试审查与检查点恢复，交付公开源码、说明和静态演示。',
  },
} as const;

type DiagramKind = keyof typeof readingGuide;
const legacyKinds: Record<string, DiagramKind> = {
  'risk-phase-0': 'risk-discovery', 'risk-phase-1': 'risk-validation', 'risk-phase-2': 'risk-validation',
  'ai-case-0': 'fieldops-engineering', 'ai-case-1': 'fieldops-purpose',
};
const diagrams = {
  'fieldops-purpose': FieldOpsPurpose, 'fieldops-engineering': FieldOpsEngineering,
  'risk-discovery': RiskDiscovery, 'risk-validation': RiskValidation,
  'field-governance': FieldMethodTransfer, 'risk-lab': PublicRiskLab,
};

export function ScientificDiagram({ kind, preview = false, idPrefix = '' }: { kind: string; preview?: boolean; idPrefix?: string }) {
  const resolvedKind = legacyKinds[kind] ?? kind as DiagramKind;
  const guide = readingGuide[resolvedKind];
  if (!guide) return null;
  const Diagram = diagrams[resolvedKind];
  const id = `${idPrefix}research-${kind}`;
  return <figure className={`research-figure${preview ? ' research-preview' : ''}`} data-research-kind={resolvedKind}>
    <figcaption className="research-heading"><span className="research-number">{guide.number}</span><div><span className="research-kicker">{guide.category}</span><strong>{guide.headline}</strong><p>{guide.summary}</p></div></figcaption>
    {!preview && <dl className="research-readout">{guide.lenses.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
    <div className="research-pan" tabIndex={0} role="region" aria-label={`${guide.headline}，可左右滚动`}>
      <svg className="research-svg" viewBox="0 0 1040 560" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{guide.headline}</title><desc id={`${id}-desc`}>{guide.description}</desc>
        <defs>{(['neutral', 'teal', 'orange'] as const).map(tone => <marker key={tone} id={`${id}-arrow-${tone}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1L9 5L0 9" className={`arrow-${tone}`} /></marker>)}</defs>
        <Diagram id={id} />
      </svg>
    </div>
    {!preview && <>
      <div className="research-interpretation"><span>读图结论</span><p>{guide.takeaway}</p></div>
      <dl className="research-terms">{guide.terms.map(([term, explanation]) => <div key={term}><dt>{term}</dt><dd>{explanation}</dd></div>)}</dl>
      <p className="research-legend"><span className="legend-teal">研究 / 执行</span><span className="legend-orange">审查 / 判断</span><span>虚线：反馈约束或推进中的工作</span></p>
      <p className="research-note">公开方法关系示意。手机可左右滑动查看完整图；关键解释在图外直接呈现。</p>
    </>}
  </figure>;
}
