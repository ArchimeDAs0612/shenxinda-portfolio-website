import type { ReactNode } from 'react';

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

function TreeModel({ x, y }: { x: number; y: number }) {
  return <g className="research-model" transform={`translate(${x} ${y})`}>
    <rect width="180" height="188" rx="8" />
    <text x="90" y="29" className="model-name">PySpark GBT</text>
    <path d="M90 64L52 99M90 64L128 99M52 99L31 136M52 99L73 136M128 99L107 136M128 99L149 136" />
    {[[90, 64], [52, 99], [128, 99], [31, 136], [73, 136], [107, 136], [149, 136]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={i < 3 ? 8 : 5} />)}
    <text x="90" y="172" className="model-caption">树结构示意 · 非真实模型</text>
  </g>;
}

const readingGuide = {
  'risk-phase-0': {
    number: '01', category: 'OBSERVATIONAL DESIGN', headline: '先找可比对象，再找复盘线索。',
    summary: '“先被拒绝、后来通过”只能提供研究线索。先限定可比范围，再检查短窗口行为差异。',
    lenses: [['观察入口', '先拒后过的支付关系'], ['研究判断', '样本是否可比？行为哪里不同？'], ['实际产物', '值得复核的候选范围']],
    terms: [['Rej → Pass', '先拒绝，后通过；不等于已确认误伤。'], ['同质比较', '先限定相近的业务背景，再比较差异。']],
    takeaway: '得到复核线索，不直接给出放行或误伤结论。',
  },
  'risk-phase-1': {
    number: '02', category: 'EVIDENCE TRIANGULATION', headline: '把群体差异，追溯到实际决策。',
    summary: '分布差异、条件覆盖、规则上下文是三层不同证据，需要与实际动作记录核对，不能相互替代。',
    lenses: [['研究输入', '候选群体与窗口特征'], ['关键核对', '满足条件，是否等于真的命中？'], ['实际产物', '可追溯的分析章节与结果索引']],
    terms: [['条件覆盖', '描述条件满足情况，不代表完整规则或最终动作。'], ['实际命中', '回接动作记录核对，不从覆盖量直接推断。']],
    takeaway: '保留每一层证据的口径，不把相关差异写成因果或收益。',
  },
  'risk-phase-2': {
    number: '03', category: 'CONTROLLED MODEL STUDY', headline: '模型高分，还不够。要知道它学到了什么。',
    summary: '评分、原始行为、两者组合分别建模，再检验稳定性与来源混淆；跨时间验证不足时，不提前宣布业务有效。',
    lenses: [['实验设计', '3 组输入，保持可比较'], ['重复检验', '5 折验证、5 种子、字段族消融'], ['实际产物', '可复跑实验链与 30 页汇报']],
    terms: [['Score / Raw / Hybrid', '只用评分 / 原始行为 / 评分与行为组合。'], ['OOT', '时间外验证：用独立时间的样本检验泛化。']],
    takeaway: '实验与审计已完成；真实 OOT 和业务有效性仍待验证。',
  },
  'field-governance': {
    number: '04', category: 'FEATURE SEMANTICS FRAMEWORK', headline: '从“读得出”，走到“理解对、用得上”。',
    summary: '字段治理不是堆字段名，而是建立解析、业务含义、特征组织和决策可用性之间的联系。',
    lenses: [['已有范围', '外卖字段已有工作与沉淀'], ['研究框架', '解析性 × 语义 × 决策可用性'], ['进度边界', '钱包尚未开展，不合并计成果']],
    terms: [['Feature Family', '按行为与语义组织的特征族。'], ['Pattern-ready', '为风险模式研究准备输入，不代表已建生产模型。']],
    takeaway: '沉淀可理解、可追溯的研究输入；未知含义继续保留待核验。',
  },
  'ai-case-0': {
    number: '05', category: 'HUMAN–AGENT RESEARCH LOOP', headline: 'AI 跑实验，人审查结论。',
    summary: '同一模型项目里，Agent 辅助代码、调试与重复执行；我设定对照、审查模型到底学到什么，再重新约束下一轮。',
    lenses: [['人设定', '问题、实验对照与验证要求'], ['Agent 执行', '代码、Debug、运行与日志整理'], ['人负责', '理解结果、纠偏、确定结论边界']],
    terms: [['方法审查', '检查特征含义、来源与标签关系。'], ['Human Ownership', '最终判断与结果责任由人承担。']],
    takeaway: '保留实验设计，调整执行环境；不让 Agent 把随机划分包装成 OOT。',
  },
  'ai-case-1': {
    number: '06', category: 'SCOPE & SEMANTIC REVIEW', headline: 'AI 整理信息，人限定业务边界。',
    summary: '字段研究里，先规定哪些业务已做、哪些含义待核验。Agent 组织资料，但不能凭字段名猜业务，也不能提前写完钱包分支。',
    lenses: [['先限定', '外卖已有工作，钱包未做'], ['再协作', '按研究框架整理语义与特征族'], ['再核验', '保留未知，不提前确认价值']],
    terms: [['Context', '限定业务范围与已有知识。'], ['Critical Review', '检查含义与可用性，不把可读写成有效。']],
    takeaway: '外卖与钱包分别维护；尚未开展的分支始终不计已完成成果。',
  },
} as const;

const descriptions: Record<string, [string, string]> = {
  'risk-phase-0': ['观察范围与候选发现', '以 Rej→Pass 作为复盘入口，经范围拆分、同质比较与窗口分析汇合为复核候选，不将候选视为误伤真值。'],
  'risk-phase-1': ['多层证据与命中审计', '分布、订单覆盖和规则上下文形成证据链；实际动作记录独立回接，条件覆盖与最终命中不等价。'],
  'risk-phase-2': ['对照实验与验证准入', '评分、原始特征与混合输入并行对照，使用 PySpark GBT；完成交叉验证与稳健性实验，真实 OOT 不足时阻断正式准入。'],
  'field-governance': ['字段语义与输入治理', '外卖分支已有沉淀，钱包分支未开展；解析、语义、特征族与可用性构成研究输入的审查框架。'],
  'ai-case-0': ['人机协作与研究纠偏', '人定义对照与审查方法，Agent 辅助代码、运行与整理；审查结果重新约束执行，最终结论由人负责。'],
  'ai-case-1': ['业务范围与语义审查', '人限定外卖范围和研究口径，执行层组织已有字段知识，未知语义保留待核验，钱包明确为未来分支。'],
};

export function ScientificDiagram({ kind }: { kind: string }) {
  const [title, description] = descriptions[kind];
  const guide = readingGuide[kind as keyof typeof readingGuide];
  const id = `research-${kind}`;
  return <figure className="research-figure">
    <figcaption className="research-heading"><span className="research-number">{guide.number}</span><div><span className="research-kicker">{guide.category}</span><strong>{guide.headline}</strong><p>{guide.summary}</p></div></figcaption>
    <dl className="research-readout">{guide.lenses.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="research-pan" tabIndex={0} role="region" aria-label={`${title}，可左右滚动`}>
      <svg className="research-svg" viewBox="0 0 1040 420" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
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
          <Block x={758} y={75} w={258} title="实际动作记录" sub="独立回接 / Actual Hit" tone="orange" />
          <Block x={758} y={218} w={258} h={103} title="命中审计与分析交付" sub="HTML / 释义 / 可复跑资产" tone="orange" />
          <Edge id={id} d="M887 151V218" tone="orange" /><Edge id={id} d="M666 200H715V265H758" tone="teal" />
          <path className="research-bracket" d="M42 341v12h974v-12" /><Label x={215} y={383}>字段条件覆盖 ≠ 完整规则逻辑 ≠ 最终命中 · 不作因果或收益推断</Label>
        </>}
        {kind === 'risk-phase-2' && <>
          <Group x={14} y={36} w={196} h={318} title="A / 输入审查" />
          <Block x={30} y={84} w={162} title="特征治理" sub="决策时可用性" tone="teal" />
          <Label x={32} y={194}>排除 / 审查：</Label><Label x={32} y={222}>标签 · ID</Label><Label x={32} y={250}>决策后信息</Label><Label x={32} y={278}>代理特征</Label>
          <Group x={250} y={36} w={218} h={318} title="B / 三组并行对照" tone="teal" />
          {['Score-only', 'Raw-all', 'Hybrid'].map((name, i) => <Block key={name} x={269} y={83 + i * 86} w={180} h={66} title={name} sub={['评分输入', '原始行为输入', '评分 + 原始行为'][i]} tone="teal" />)}
          <path className="research-edge" d="M192 123H228V116M228 116V288M228 116H269M228 202H269M228 288H269" />
          <path className="research-edge" d="M449 116H485V202M449 202H520M449 288H485V202" />
          <TreeModel x={510} y={110} />
          <Group x={725} y={36} w={296} h={185} title="C / 稳健性与解释审计" tone="orange" />
          {['订单级 5 折', '字段族消融', '5 种子重复', '复杂度敏感性'].map((name, i) => <g key={name}><rect className="audit-cell" x={741 + (i % 2) * 133} y={84 + Math.floor(i / 2) * 49} width="122" height="38" rx="4" /><text className="audit-text" x={802 + (i % 2) * 133} y={108 + Math.floor(i / 2) * 49}>{name}</text></g>)}
          <Edge id={id} d="M690 203H710V129H725" tone="teal" />
          <Label x={739} y={198}>来源 / 标签关系 · 指标解释限定切片</Label>
          <path className="gate-diamond" d="M805 279L877 241L949 279L877 317Z" /><text className="gate-text" x="877" y="276">真实 OOT</text><text className="gate-text small" x="877" y="296">条件不足</text>
          <Edge id={id} d="M877 221V241" tone="orange" /><Edge id={id} d="M877 317V350" tone="orange" dashed />
          <Block x={739} y={352} w={276} h={58} title="阻断正式 Pattern 准入" tone="orange" dashed />
          <Label x={30} y={388}>已完成实验与审计 ≠ 已验证线上收益</Label>
        </>}
        {kind === 'field-governance' && <>
          <Group x={20} y={38} w={215} h={300} title="业务分支 / Scope" />
          <Block x={38} y={99} w={179} title="外卖字段" sub="已有工作与知识沉淀" tone="teal" />
          <Block x={38} y={234} w={179} title="钱包字段" sub="尚未开展 / 不计成果" dashed />
          <Group x={274} y={38} w={494} h={300} title="研究框架 / 非全量完成声明" tone="teal" />
          <circle className="semantic-cycle" cx="518" cy="209" r="110" />
          <Block x={292} y={99} w={204} title="物理可解析性" sub="格式 / 缺失 / 稳定解析" />
          <Block x={535} y={99} w={214} title="业务语义" sub="对象 / 行为 / 含义" tone="teal" />
          <Block x={292} y={234} w={204} title="Feature Family" sub="行为与语义的特征组织" tone="teal" />
          <Block x={535} y={234} w={214} title="决策可用性" sub="可读 ≠ 可解释 ≠ 有效" tone="orange" />
          <Edge id={id} d="M217 137H292" tone="teal" /><Edge id={id} d="M496 137H535" />
          <Edge id={id} d="M642 175V203H394V234" tone="teal" /><Edge id={id} d="M496 272H535" tone="teal" />
          <Block x={824} y={166} w={194} h={103} title="Pattern-ready" sub="可理解 / 可追溯输入" tone="orange"><text x="16" y="82" className="block-sub">不代表生产模型</text></Block>
          <Edge id={id} d="M749 272H788V215H824" tone="orange" />
          <Edge id={id} d="M642 310V375H394V310" dashed tone="orange" /><Label x={433} y={397}>未知语义 / 待核验项保留</Label>
        </>}
        {(kind === 'ai-case-0' || kind === 'ai-case-1') && <>
          <Group x={18} y={34} w={1004} h={154} title="HUMAN / 问题定义 · 审查 · 最终责任" tone="orange" />
          <Group x={18} y={217} w={1004} h={157} title="AGENT / 执行与整理 · 不替代业务判断" tone="teal" />
          <Block x={42} y={89} w={220} title={kind === 'ai-case-0' ? '问题与实验约束' : '范围与研究口径'} sub={kind === 'ai-case-0' ? 'Score / Raw / Hybrid 对照' : '外卖已做 / 钱包未做'} tone="orange" />
          <Block x={358} y={89} w={242} title={kind === 'ai-case-0' ? '结果理解与方法审查' : '业务语义与可用性审查'} sub={kind === 'ai-case-0' ? '来源混淆 / 标签关系' : '未知保留 / 不凭字段名猜测'} tone="orange" />
          <Block x={748} y={89} w={247} title={kind === 'ai-case-0' ? '验证与 Human Ownership' : '进度边界与 Human Ownership'} sub={kind === 'ai-case-0' ? '时间条件不足 → 不允许伪 OOT' : '钱包：未来分支 / 非已完成'} tone="orange" />
          <Block x={118} y={271} w={242} title={kind === 'ai-case-0' ? '代码 · Debug · 运行' : '已限定范围内的字段研究'} sub={kind === 'ai-case-0' ? '环境重约束 → PySpark GBT' : '组织语义 / 特征族 / 输入资产'} tone="teal" />
          <Block x={564} y={271} w={265} title={kind === 'ai-case-0' ? '纠偏 · 重复实验 · 交付资产' : '保留待核验项 · 分支独立'} sub={kind === 'ai-case-0' ? '日志 / 证据索引 / HTML 汇报' : '外卖已有沉淀，不合并钱包成果'} tone="teal" />
          <Edge id={id} d="M152 165V203H239V271" tone="orange" /><Edge id={id} d="M360 309H398V165" tone="teal" />
          <Edge id={id} d="M529 165V203H697V271" tone="orange" /><Edge id={id} d="M829 309H872V165" tone="teal" />
          <Edge id={id} d="M479 89V16H28V203H239V271" dashed tone="orange" />
          <Label x={510} y={26}>审查发现矛盾 → 重新约束执行</Label>
          <path className="research-bracket" d="M42 390v12h953v-12" />
          <Label x={302} y={418}>执行能力可扩大 · 判断与责任不可外包</Label>
        </>}
      </svg>
    </div>
    <div className="research-interpretation"><span>读图结论</span><p>{guide.takeaway}</p></div>
    <dl className="research-terms">{guide.terms.map(([term, explanation]) => <div key={term}><dt>{term}</dt><dd>{explanation}</dd></div>)}</dl>
    <p className="research-legend"><span className="legend-teal">研究 / 执行</span><span className="legend-orange">审查 / 责任 / 准入</span><span>虚线：待验证、待开展或反馈约束</span></p>
    <p className="research-note">方法关系示意，非公司系统架构；不含原始业务数据。手机可左右滑动查看完整图，全部说明也在下方直接呈现。</p>
  </figure>;
}
