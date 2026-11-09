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
    <text x="28" y="32" className="agent-overline">FIELDOPS / 核心架构通过评审 · 持续开发</text>
    <Link id={id} d="M242 148H288" /><Link id={id} d="M242 326H288" />
    <Link id={id} d="M526 148H552V213H580" />
    <Link id={id} d="M526 326H552V267H580" />
    <Link id={id} d="M770 237H798V148H824" tone="orange" />
    <Link id={id} d="M770 237H798V326H824" tone="orange" />

    <Plate x={28} y={82} w={214} h={132} label="01 / FEATURE ASSETS" title="特征资产" lines={['钱包 / 外卖研究知识', '业务归属与使用条件', '复用已交付研究资产']} />
    <Plate x={28} y={260} w={214} h={132} label="01 / STRATEGY RULES" title="策略规则" lines={['完整条件与适用范围', '关系与版本分别记录', '不同业务保持隔离']} />
    <Plate x={288} y={82} w={238} h={132} label="02 / EVALUATION" title="用途准入与分维评价" lines={['字段自身质量', '相关特征的互补信息', '策略使用证据']} />
    <Plate x={288} y={260} w={238} h={132} label="02 / RULE UNDERSTANDING" title="完整条件与关系解析" lines={['部分真实配置已实现', '保留适用范围与未知', '本地实现与测试记录']} />
    <Plate x={580} y={171} w={190} h={132} label="03 / HUMAN REVIEW" title="证据与审核状态" lines={['追溯来源与版本', '关键结论由人确认', '未确认保持候选']} tone="orange" />
    <Plate x={824} y={82} w={188} h={132} label="04 / CANDIDATE" title="特征治理知识" lines={['含义 · 用途 · 依据', '来源 · 版本 · 状态', '待业务审核与接入']} />
    <Plate x={824} y={260} w={188} h={132} label="04 / CANDIDATE" title="策略治理知识" lines={['条件 · 关系 · 机制', '来源 · 版本 · 状态', '待业务审核与接入']} />

    <Plate x={28} y={435} w={984} h={112} label="HUMAN OWNERSHIP" title="我定义问题与评价边界，推动方案评审和 AI 辅助工程实现" lines={['团队提供业务与数据支持；AI 参与代码、测试和材料整理，人工保留关键判断。', '核心能力已有本地实现；完整业务验收、远端知识服务接入及生产应用仍待验证。']} tone="orange" />
    <text x="28" y="569" className="agent-footnote">公开方法关系示意 · 资料截至 2026-11-06 · 非公司内部架构、真实字段或生产策略图</text>
  </g>;
}
