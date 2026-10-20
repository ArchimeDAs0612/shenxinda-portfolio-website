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
  return <g data-diagram-layout="evidence-recovery-namespace">
    <Link id={id} d="M298 92H385" /><Link id={id} d="M655 92H740" tone="orange" />
    <Plate x={28} y={35} w={270} h={116} label="01 / EVIDENCE RECOVERY" title="恢复成果，不盲目重算" lines={['检查点 · 交付物 · 验收回执', '区分已完成、候选与无法确认']} />
    <Plate x={385} y={35} w={270} h={116} label="02 / HUMAN · SCOPE" title="发现混放，确定边界" lines={['我确认业务拆分与验收范围', '保留历史，明确当前入口']} tone="orange" />
    <Plate x={740} y={35} w={270} h={116} label="03 / AGENT · EXECUTION" title="迁移、核对与发布检查" lines={['Agent 执行，按约定回传证据', '不把执行工作归为独立开发']} />
    <Link id={id} d="M875 151V185H520V223" />
    <Link id={id} d="M520 151V185H158V223" tone="orange" />
    <Plate x={28} y={223} w={270} h={110} label="WALLET / 独立业务范围" title="钱包研究与方法已封板" lines={['字段资产与迁移 SOP 已交付', '研究沉淀不等于生产准入']} />
    <Plate x={28} y={391} w={270} h={110} label="DELIVERY / 独立业务范围" title="外卖研究已完成交付" lines={['全量整理 / 可用性分析', '技术账本与业务目录分层']} />
    <Link id={id} d="M298 278H385" /><Link id={id} d="M298 446H342V278H385" />
    <Plate x={385} y={223} w={270} h={110} label="04 / CONTENT × STRUCTURE" title="双维度一致性验收" lines={['关键文本 · 标识 · 目录归属', '链接目标 · 当前调用入口']} />
    <Link id={id} d="M655 278H740" />
    <Plate x={740} y={223} w={270} h={110} label="DELIVERED / 知识交付" title="两业务知识库独立发布" lines={['保留历史与迁移指引', '不是完整 Pattern Agent 上线']} />
    <Link id={id} d="M520 333V391" tone="orange" /><Link id={id} d="M655 446H740" tone="orange" feedback />
    <Plate x={385} y={391} w={270} h={110} label="05 / VERSIONED RETRIEVAL" title="约束后续知识调用" lines={['业务范围 · 版本 · 证据状态', '先确认适用性，再交给 Agent']} tone="orange" />
    <Plate x={740} y={391} w={270} h={110} label="DESIGN DELIVERED / 非生产系统" title="Agent 输入与评估设计" lines={['受限检索 / 分用途准入 / 人审', '未实现、运行或部署该系统']} tone="orange" pending />
    <text x="28" y="551" className="agent-footnote">研究、接管与分库交付已结项；业务语义、时点与效果分别保留边界 · 无内部链接或字段明细</text>
  </g>;
}
