/** Public method and capability views, not private company architecture or production-deployment claims. */
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
      <text x="20" y="26" className="agent-overline">02 / LGBM · ABLATION · REPLAY</text>
      <text x="20" y="51" className="agent-title">三组输入，分别验证信息来源</text>
      {['Score-only', 'Raw-all', 'Hybrid'].map((name, i) => <g key={name} transform={`translate(20 ${65 + i * 27})`}>
        <rect width="305" height="23" rx="3" />
        <text x="10" y="16" className="comparison-name">{name}</text>
        <text x="136" y="16" className="agent-copy">{['评分', '原始行为', '评分 + 原始行为'][i]}</text>
      </g>)}
    </g>
    <Plate x={728} y={52} w={280} h={116} label="03 / AGENT · EXECUTION" title="代码、调试与实验运行" lines={['限定输入版本与修改范围', '保留既有实验与评价口径']} />
    <Plate x={728} y={250} w={280} h={105} label="04 / REPRODUCIBLE EVIDENCE" title="把运行结果变成审查材料" lines={['运行日志 · 证据索引', '可复跑实验 · HTML 汇报']} />

    <g className="agent-review-core" transform="translate(500 302)">
      <circle className="core-orbit" r="107" />
      <circle r="92" />
      <text y="-39" className="agent-overline">05 / CRITICAL REVIEW</text>
      <text y="-9" className="core-title">人工方法审查</text>
      <text y="18" className="agent-copy">模型到底学到了什么？</text>
      <text y="42" className="agent-copy">来源 · 标签 · 候选与结构</text>
    </g>
    <Plate x={30} y={248} w={240} h={116} label="06 / RECONSTRAINT" title="反证、取舍与收尾" lines={['我追问路径、金额与候选覆盖', 'AI 修订、核对与恢复交接']} tone="orange" />
    <text x="161" y="214" className="agent-edge-label">反馈到下一轮</text>

    <g className="agent-validation-gate">
      <path d="M500 417L595 464L500 511L405 464Z" />
      <text x="500" y="458" className="gate-text">研究交付已完成</text>
      <text x="500" y="480" className="gate-text small">业务验证分别登记</text>
    </g>
    <Plate x={728} y={414} w={280} h={108} label="HUMAN OWNERSHIP" title="结论边界由我确认" lines={['结构 / 流程 / 固定规则验证分开', '不宣称真实 OOT 或上线收益']} tone="orange" pending />
    <text x="30" y="543" className="agent-footnote">四阶段与交付恢复已结项 · 团队提供业务与评价要求，AI 辅助实现，人工审查结论</text>
  </g>;
}

export function AgentSemanticAtlas({ id }: { id: string }) {
  return <g data-diagram-layout="fieldops-governance-workbench">
    <Link id={id} d="M298 92H385" /><Link id={id} d="M655 92H740" tone="orange" />
    <Plate x={28} y={35} w={270} h={116} label="01 / KNOWLEDGE FOUNDATION" title="复用已交付的知识资产" lines={['钱包 / 外卖研究与分库已结项', '保留业务、版本与接管记录']} />
    <Plate x={385} y={35} w={270} h={116} label="02 / HUMAN · DESIGN REVIEW" title="我定义目标，评审方案" lines={['特征 × 策略联合治理', '需求拆解 · 方向纠偏 · 验收']} tone="orange" />
    <Plate x={740} y={35} w={270} h={116} label="03 / WORKING PROTOTYPE" title="FieldOps 独立工作台" lines={['已有可运行原型', 'AI 辅助工程实现与迭代']} />
    <Link id={id} d="M875 151V185H158V223" />
    <Plate x={28} y={223} w={270} h={110} label="04 / FEATURE FAMILIES" title="宗族图谱" lines={['检索字段 · 展开相关特征', '节点与关系可查看依据']} />
    <Plate x={28} y={391} w={270} h={110} label="05 / USABILITY · ACCEPTED" title="可用性评分" lines={['已完成功能验收', '辅助比较，不等同于风险效果']} />
    <Link id={id} d="M298 278H385" /><Link id={id} d="M298 446H342V278H385" />
    <Plate x={385} y={223} w={270} h={110} label="06 / EVIDENCE EXPLORATION" title="证据联查" lines={['关联图谱与评价信息', '查看依据，再作研究判断']} />
    <Link id={id} d="M655 278H740" />
    <Plate x={740} y={223} w={270} h={110} label="07 / OVERVIEW · ACCEPTED" title="全局首页看板" lines={['整体情况与功能入口', '先看全貌，再进入具体研究']} />
    <Link id={id} d="M520 333V391" tone="orange" /><Link id={id} d="M655 446H740" tone="orange" feedback />
    <Plate x={385} y={391} w={270} h={110} label="08 / HUMAN OWNERSHIP" title="人工治理与验收" lines={['我提出要求、审查并验收', '知识依据与判断责任保留']} tone="orange" />
    <Plate x={740} y={391} w={270} h={110} label="SEPARATE / 策略侧边界" title="效果与上线另行验证" lines={['字段侧功能验收 ≠ 策略有效', '不推导自动下发或生产上线']} tone="orange" pending />
    <text x="28" y="551" className="agent-footnote">公开能力关系示意 · 字段侧功能已验收 · 非内部系统架构、真实字段或生产策略图</text>
  </g>;
}
