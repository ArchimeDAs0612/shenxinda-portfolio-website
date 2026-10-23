/** Public research methods only: no company data, rules, thresholds or system architecture. */
function Plate({ x, y, w, title, lines, tone = 'teal', pending = false }: { x: number; y: number; w: number; title: string; lines: string[]; tone?: string; pending?: boolean }) {
  return <g className={`agent-plate tone-${tone} ${pending ? 'pending-plate' : ''}`} transform={`translate(${x} ${y})`}><rect width={w} height={70 + lines.length * 20} rx="8" /><text x="18" y="30" className="agent-title">{title}</text>{lines.map((line, i) => <text x="18" y={57 + 20 * i} className="agent-copy" key={line}>{line}</text>)}</g>;
}
function Path({ d, id, pending = false }: { d: string; id: string; pending?: boolean }) {
  return <path d={d} className={`research-edge edge-teal ${pending ? 'is-provisional' : ''}`} markerEnd={`url(#${id}-arrow-teal)`} />;
}

export function ModelCandidateEvolution({ id }: { id: string }) {
  return <g data-diagram-layout="model-candidate-evolution">
    <text x="28" y="32" className="agent-overline">已完成 / LGBM STUDY</text>
    <text x="388" y="32" className="agent-overline">已交付 / CANDIDATE REPLAY</text>
    <text x="810" y="32" className="agent-overline">另计 / BUSINESS VALIDATION</text>
    <Plate x={22} y={55} w={286} title="LGBM 对照与路径审查" lines={['评分 / 原始行为 / 混合输入', '特征族消融 · 完整路径反证', '祖先条件 · 比较符 · 缺失路由']} />
    <g className="research-model" transform="translate(42 239)">
      <path d="M112 0L54 55M112 0L170 55M54 55L22 105M54 55L85 105M170 55L137 105M170 55L202 105" />
      {[[112, 0], [54, 55], [170, 55], [22, 105], [85, 105], [137, 105], [202, 105]].map(([cx, cy], i) => <circle cx={cx} cy={cy} r={i < 3 ? 9 : 6} key={i} />)}
      <text x="112" y="145" className="model-caption">树路径用于探索特征组合</text>
    </g>
    <Path id={id} d="M308 110H375" />
    <Plate x={375} y={55} w={374} title="前置细分、回放与候选取舍" lines={['明确范围 → 完整回放 → 集合核对', '留下 / 排除 · 包含 / 独占 / 顺序新增', '小而浓的子群 ≠ 独立新增覆盖']} />
    <Path id={id} d="M560 185V224" />
    <g className="candidate-overlap" transform="translate(385 224)">
      <rect width="354" height="177" rx="8" />
      <ellipse cx="92" cy="90" rx="68" ry="51" /><ellipse cx="121" cy="90" rx="27" ry="29" />
      <text x="82" y="93" className="agent-copy">A</text><text x="116" y="94" className="agent-copy">B</text>
      <text x="189" y="49" className="agent-title">结构重现</text><text x="189" y="79" className="agent-copy">同字段集合路径</text><text x="189" y="101" className="agent-copy">比较命中成员</text><text x="189" y="126" className="agent-copy">阈值 / 顺序可变化</text>
      <text x="23" y="160" className="agent-copy">集合为方法示意，不对应真实候选规模</text>
    </g>
    <Path id={id} d="M749 110H794" pending />
    <Plate x={794} y={55} w={224} title="独立业务核验" lines={['代理标签与真实风险', '独立时间 / 真实反例', '正式 Pattern 准入']} tone="orange" pending />
    <Plate x={794} y={255} w={224} title="验证层次分开" lines={['结构重现 / 流程留出', '固定规则独立验证另计', '研究完成 ≠ 业务有效']} tone="orange" />
    <Path id={id} d="M739 312H794" />
    <path className="research-bracket" d="M28 430v14h715v-14" />
    <text x="28" y="477" className="agent-title">已交付：候选总览 · 完整回放 · 金额反证 · 冻结与恢复交接</text>
    <text x="28" y="512" className="agent-copy">金额堆积、标签集中与累计语义分别审查；不同阶段不拼成效果增长曲线。</text>
    <text x="28" y="545" className="agent-footnote">项目研究与交付已结项 · 正式 Pattern、真实 OOT、生产上线及业务收益不作完成宣称</text>
  </g>;
}

export function FieldKnowledgeEvolution({ id }: { id: string }) {
  return <g data-diagram-layout="field-knowledge-admission">
    <text x="28" y="32" className="agent-overline">两条业务线 / 独立归属与调用范围</text>
    <Plate x={22} y={56} w={240} title="钱包研究与方法" lines={['研究与方法沉淀已封板', '字段资产 / 迁移 SOP 已交付']} />
    <Plate x={22} y={235} w={240} title="外卖字段研究" lines={['全量整理与可用性已交付', '技术账本 / 业务目录分层']} />
    <Path id={id} d="M262 112H314" /><Path id={id} d="M262 291H286V112H314" />
    <Plate x={314} y={56} w={294} title="技术与语义研究" lines={['物理存在 / 稳定解析', '业务对象 / 行为 / 特征族', '技术可读不等于业务有效']} />
    <Path id={id} d="M608 122H660" />
    <Plate x={660} y={56} w={350} title="分用途准入 · 保留证据状态" lines={['语义 / 解析 / 时点 / 跨期效果分层', '已观察、推断、未知与冲突分别记录', '研究交付不自动放行实时决策']} tone="orange" pending />
    <Path id={id} d="M461 185V237" />
    <Plate x={314} y={237} w={294} title="接管、对账与知识库拆分" lines={['内容 / 结构 / 目录归属已核对', '两业务独立知识库已交付', '保留历史与迁移指引']} />
    <Path id={id} d="M608 302H660" />
    <Plate x={660} y={237} w={350} title="SOP 沉淀 → FieldOps 续作" lines={['原研究与 Agent 输入评估设计已交付', '后续：图谱 / 证据 / 评分 / 看板', '工作台功能已验收，详见第六图']} />
    <path className="research-bracket" d="M28 420v14h982v-14" />
    <text x="28" y="469" className="agent-title">我确认业务边界与验收要求；Agent 执行迁移、核对与发布检查。</text>
    <text x="28" y="506" className="agent-copy">项目研究与交付已结项；全字段业务语义、决策时点与跨期效果没有整体通过。</text>
    <text x="28" y="545" className="agent-footnote">公开方法与结项范围示意 · 非公司知识库结构、原始字段表或成熟 Agent 架构</text>
  </g>;
}
