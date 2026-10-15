/** Public research methods only: no company data, rules, thresholds or system architecture. */
function Plate({ x, y, w, title, lines, tone = 'teal', pending = false }: { x: number; y: number; w: number; title: string; lines: string[]; tone?: string; pending?: boolean }) {
  return <g className={`agent-plate tone-${tone} ${pending ? 'pending-plate' : ''}`} transform={`translate(${x} ${y})`}><rect width={w} height={70 + lines.length * 20} rx="8" /><text x="18" y="30" className="agent-title">{title}</text>{lines.map((line, i) => <text x="18" y={57 + 20 * i} className="agent-copy" key={line}>{line}</text>)}</g>;
}
function Path({ d, id, pending = false }: { d: string; id: string; pending?: boolean }) {
  return <path d={d} className={`research-edge edge-teal ${pending ? 'is-provisional' : ''}`} markerEnd={`url(#${id}-arrow-teal)`} />;
}

export function ModelCandidateEvolution({ id }: { id: string }) {
  return <g data-diagram-layout="model-candidate-evolution">
    <text x="28" y="32" className="agent-overline">已沉淀 / WIDE-FEATURE STUDY</text>
    <text x="388" y="32" className="agent-overline">持续深化 / CANDIDATE RESEARCH</text>
    <text x="810" y="32" className="agent-overline">待验证 / BUSINESS EVIDENCE</text>
    <Plate x={22} y={55} w={286} title="输入与模型对照" lines={['评分 / 原始行为 / 混合输入', '特征族消融 · 重复实验', '审查来源、标签与时点可得性']} />
    <g className="research-model" transform="translate(42 239)">
      <path d="M112 0L54 55M112 0L170 55M54 55L22 105M54 55L85 105M170 55L137 105M170 55L202 105" />
      {[[112, 0], [54, 55], [170, 55], [22, 105], [85, 105], [137, 105], [202, 105]].map(([cx, cy], i) => <circle cx={cx} cy={cy} r={i < 3 ? 9 : 6} key={i} />)}
      <text x="112" y="145" className="model-caption">树路径用于探索特征组合</text>
    </g>
    <Path id={id} d="M308 110H375" />
    <Plate x={375} y={55} w={374} title="筛选与候选取舍" lines={['目标准入 → 排序 → 重叠核对 → 展示', '覆盖 × 浓度 × 支持量 × 包含关系', '小而浓的子群 ≠ 独立新增覆盖']} />
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
    <Plate x={794} y={255} w={224} title="解释边界" lines={['原研究总体回放', '包含训练见过的样本', '结构稳定 ≠ 独立有效']} tone="orange" />
    <Path id={id} d="M739 312H794" />
    <path className="research-bracket" d="M28 430v14h715v-14" />
    <text x="28" y="477" className="agent-title">交付：候选总览 · 取舍说明 · 金额证据 · 待核验清单</text>
    <text x="28" y="512" className="agent-copy">金额堆积与正标签集中分别解释；AUC 保持既有主评价地位。</text>
    <text x="28" y="545" className="agent-footnote">研究阶段沉淀不等于正式 Pattern 或生产效果验收 · 不展示内部指标、规则或模型版本细节</text>
  </g>;
}

export function FieldKnowledgeEvolution({ id }: { id: string }) {
  return <g data-diagram-layout="field-knowledge-admission">
    <text x="28" y="32" className="agent-overline">两条业务线 / 独立归属与调用范围</text>
    <Plate x={22} y={56} w={240} title="钱包研究" lines={['研究阶段已封板', '独立知识库已发布']} />
    <Plate x={22} y={235} w={240} title="外卖字段资产" lines={['知识库已拆分发布', '研究与业务准入继续推进']} />
    <Path id={id} d="M262 112H314" /><Path id={id} d="M262 291H286V112H314" />
    <Plate x={314} y={56} w={294} title="技术与语义研究" lines={['物理存在 / 稳定解析', '业务对象 / 行为 / 特征族', '技术可读不等于业务有效']} />
    <Path id={id} d="M608 122H660" />
    <Plate x={660} y={56} w={350} title="决策时点与效果核验" lines={['决策前是否可得？窗口是否一致？', '跨期稳定性与真实反例是否充分？', '保留待确认项，不逐层自动放行']} tone="orange" pending />
    <Path id={id} d="M461 185V237" />
    <Plate x={314} y={237} w={294} title="内容 × 结构一致性" lines={['关键文本 / 字段标识核对', '目录归属 / 链接目标核对', '保留历史与迁移指引']} />
    <Path id={id} d="M608 302H660" />
    <Plate x={660} y={237} w={350} title="可追溯的研究输入" lines={['业务范围 · 证据版本 · 准入状态', '按明确范围提供人和 Agent 调用', '知识发布 ≠ 字段业务准入']} />
    <path className="research-bracket" d="M28 420v14h982v-14" />
    <text x="28" y="469" className="agent-title">我确认业务边界与验收要求；Agent 执行迁移、核对与发布检查。</text>
    <text x="28" y="506" className="agent-copy">后续：继续核验时点、语义与发布目标，不将尚未验证的输入写成生产特征。</text>
    <text x="28" y="545" className="agent-footnote">公开方法与阶段状态示意 · 非公司知识库结构、原始字段表或成熟 Agent 架构</text>
  </g>;
}
