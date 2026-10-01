/** Public method views, not deployed agent systems or private company architecture. */
type Tone = 'teal' | 'orange' | 'neutral';

function Plate({ x, y, w, h, label, title, lines, tone = 'teal', pending = false }: { x: number; y: number; w: number; h: number; label: string; title: string; lines: string[]; tone?: Tone; pending?: boolean }) {
  return <g className={`agent-plate tone-${tone} ${pending ? 'pending-plate' : ''}`} transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="8" />
    <text x="18" y="24" className="agent-overline">{label}</text>
    <text x="18" y="50" className="agent-title">{title}</text>
    {lines.map((line, i) => <text key={line} x="18" y={74 + i * 20} className="agent-copy">{line}</text>)}
  </g>;
}

function Link({ d, id, tone = 'teal', feedback = false }: { d: string; id: string; tone?: Tone; feedback?: boolean }) {
  return <path className={`research-edge edge-${tone} ${feedback ? 'is-provisional' : ''}`} d={d} markerEnd={`url(#${id}-arrow-${tone})`} />;
}

export function AgentExperimentLoop({ id }: { id: string }) {
  return <g data-diagram-layout="experiment-feedback-loop">
    <path className="agent-orbit" d="M150 110H865V302H150Z" />
    <Link id={id} d="M270 110H330" tone="orange" />
    <Link id={id} d="M675 110H728" />
    <Link id={id} d="M868 168V250" />
    <Link id={id} d="M728 302H609" />
    <Link id={id} d="M391 302H270" tone="orange" />
    <Link id={id} d="M150 248V168" tone="orange" feedback />
    <Link id={id} d="M500 411V417" tone="orange" />
    <Link id={id} d="M595 464H728" tone="orange" feedback />

    <Plate x={30} y={52} w={240} h={116} label="01 / HUMAN · SPECIFICATION" title="问题与实验约束" lines={['定义对照与验证目标', '不是“跑出高分”就结束']} tone="orange" />
    <g className="agent-comparison" transform="translate(330 38)">
      <rect width="345" height="154" rx="8" />
      <text x="20" y="26" className="agent-overline">02 / CONTROLLED EXPERIMENT</text>
      <text x="20" y="51" className="agent-title">三组输入，分别验证信息来源</text>
      {['Score-only', 'Raw-all', 'Hybrid'].map((name, i) => <g key={name} transform={`translate(20 ${65 + i * 27})`}>
        <rect width="305" height="23" rx="3" />
        <text x="10" y="16" className="comparison-name">{name}</text>
        <text x="136" y="16" className="agent-copy">{['评分', '原始行为', '评分 + 原始行为'][i]}</text>
      </g>)}
    </g>
    <Plate x={728} y={52} w={280} h={116} label="03 / AGENT · EXECUTION" title="代码、调试与实验运行" lines={['保留设计，重新约束执行环境', '实际执行：PySpark GBT']} />
    <Plate x={728} y={250} w={280} h={105} label="04 / REPRODUCIBLE EVIDENCE" title="把运行结果变成审查材料" lines={['运行日志 · 证据索引', '可复跑实验 · HTML 汇报']} />

    <g className="agent-review-core" transform="translate(500 302)">
      <circle className="core-orbit" r="107" />
      <circle r="92" />
      <text y="-39" className="agent-overline">05 / CRITICAL REVIEW</text>
      <text y="-9" className="core-title">人工方法审查</text>
      <text y="18" className="agent-copy">模型到底学到了什么？</text>
      <text y="42" className="agent-copy">来源 · 标签关系 · 特征含义</text>
    </g>
    <Plate x={30} y={248} w={240} h={116} label="06 / RECONSTRAINT" title="发现矛盾，重新约束" lines={['修正解释与下一轮执行要求', '不以单次高分代替结论']} tone="orange" />
    <text x="161" y="214" className="agent-edge-label">反馈到下一轮</text>

    <g className="agent-validation-gate">
      <path d="M500 417L595 464L500 511L405 464Z" />
      <text x="500" y="458" className="gate-text">独立时间验证</text>
      <text x="500" y="480" className="gate-text small">真实 OOT 条件不足</text>
    </g>
    <Plate x={728} y={414} w={280} h={108} label="HUMAN OWNERSHIP" title="结论边界由我确认" lines={['随机划分 ≠ OOT', '正式 Pattern 与业务应用仍待验证']} tone="orange" pending />
    <text x="30" y="543" className="agent-footnote">研究协作闭环示意 · Agent 扩大执行能力，人工审查决定下一轮与结论边界</text>
  </g>;
}

export function AgentSemanticAtlas({ id }: { id: string }) {
  return <g data-diagram-layout="semantic-evidence-atlas">
    <g className="agent-knowledge-links">
      <path d="M211 270H361M413 186L393 140M520 202L626 163M416 355L389 421M531 325L653 421" />
      <path d="M488 106H550M491 469H550" />
      <circle cx="455" cy="270" r="168" />
    </g>
    <path className="agent-review-bus" d="M488 106H754V467H770M738 120H754M738 467H754" />
    <Link id={id} d="M754 285H790" tone="orange" />
    <Link id={id} d="M895 238V166" tone="orange" feedback />
    <Link id={id} d="M895 334V404" />

    <g className="agent-context-stack" transform="translate(30 188)">
      <rect x="12" y="12" width="181" height="137" rx="7" />
      <rect x="6" y="6" width="181" height="137" rx="7" />
      <rect width="181" height="137" rx="7" />
      <text x="18" y="28" className="agent-overline">CONTEXT / 已有沉淀</text>
      <text x="18" y="59" className="agent-title">外卖字段知识</text>
      <text x="18" y="86" className="agent-copy">范围与释义资料</text>
      <text x="18" y="108" className="agent-copy">不展示内部字段与数据</text>
    </g>
    <Plate x={288} y={54} w={200} h={92} label="A / PARSEABILITY" title="物理可解析性" lines={['格式 · 缺失 · 解析稳定性']} tone="neutral" />
    <Plate x={550} y={74} w={188} h={92} label="B / BUSINESS SEMANTICS" title="业务语义" lines={['对象 · 行为 · 含义']} />
    <Plate x={279} y={421} w={212} h={92} label="C / FEATURE FAMILY" title="特征族组织" lines={['按行为与语义建立联系']} />
    <Plate x={550} y={421} w={188} h={92} label="D / AVAILABILITY" title="决策可用性" lines={['可读 ≠ 有效']} tone="orange" />

    <g className="agent-semantic-core" transform="translate(455 270)">
      <circle className="core-orbit" r="94" />
      <circle r="80" />
      <text y="-26" className="agent-overline">AGENT · ORGANIZATION</text>
      <text y="4" className="core-title">组织知识关系</text>
      <text y="31" className="agent-copy">按人设定的框架整理</text>
    </g>
    <text x="340" y="381" className="agent-footnote">四个研究视角 · 不是全量完成声明</text>
    <text x="762" y="204" className="agent-edge-label">统一人工核验</text>
    <g className="agent-validation-gate">
      <path d="M895 238L1000 286L895 334L790 286Z" />
      <text x="895" y="281" className="gate-text">语义与可用性审查</text>
      <text x="895" y="303" className="gate-text small">HUMAN REVIEW</text>
    </g>
    <Plate x={790} y={56} w={225} h={110} label="UNKNOWN / 保留待核验" title="不猜含义，不强行赋值" lines={['待核验项继续保留', '反馈到后续研究']} tone="orange" pending />
    <Plate x={790} y={404} w={225} h={110} label="PATTERN-READY INPUT" title="可理解、可追溯的输入" lines={['研究输入资产', '不等于生产模型']} />
    <Plate x={30} y={421} w={181} h={92} label="独立分支 / NOT STARTED" title="钱包字段" lines={['尚未开展，不计已完成成果']} tone="neutral" pending />
    <text x="30" y="557" className="agent-footnote">知识关系与核验框架示意 · 非图数据库、多 Agent 系统或公司内部架构</text>
  </g>;
}
