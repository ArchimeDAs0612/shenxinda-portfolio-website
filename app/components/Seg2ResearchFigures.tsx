/** Public method diagrams: no company source data or system architecture. */
type Tone = 'teal' | 'orange' | 'neutral';
function Plate({ x, y, w, title, lines, tone = 'teal', pending = false }: { x: number; y: number; w: number; title: string; lines: string[]; tone?: Tone; pending?: boolean }) {
  return <g className={`agent-plate tone-${tone} ${pending ? 'pending-plate' : ''}`} transform={`translate(${x} ${y})`}><rect width={w} height={70 + lines.length * 20} rx="8" /><text x="18" y="30" className="agent-title">{title}</text>{lines.map((line, i) => <text x="18" y={57 + 20 * i} className="agent-copy" key={line}>{line}</text>)}</g>;
}
function Edge({ d, id, tone = 'teal', feedback = false }: { d: string; id: string; tone?: Tone; feedback?: boolean }) { return <path d={d} className={`research-edge edge-${tone} ${feedback ? 'is-provisional' : ''}`} markerEnd={`url(#${id}-arrow-${tone})`} />; }
function Caption({ x, y, children }: { x: number; y: number; children: string }) { return <text x={x} y={y} className="agent-overline">{children}</text>; }

export function FieldOpsPurpose({ id }: { id: string }) {
  return <g data-diagram-layout="fieldops-purpose">
    <Caption x={24} y={30}>治理对象</Caption><Caption x={326} y={30}>理解与评价</Caption><Caption x={720} y={30}>审核与知识交付</Caption>
    <Plate x={24} y={50} w={236} title="特征资产" lines={['来源、语义与使用条件', '钱包 / 外卖分开管理']} />
    <Plate x={24} y={218} w={236} title="策略规则" lines={['完整条件与引用关系', '保留所属业务和版本']} />
    <Plate x={326} y={50} w={314} title="用途与可用性评价" lines={['先判断能否用于指定任务', '再看质量、关系与使用证据']} />
    <Plate x={326} y={218} w={314} title="完整规则理解" lines={['条件结构、特征引用与宗族', '保留未知、冲突及证据缺口']} />
    <Edge id={id} d="M260 105H326" /><Edge id={id} d="M260 273H326" />
    <Plate x={720} y={127} w={296} title="证据联查与人工审核" lines={['核对来源、版本和适用范围', '评分、图谱与看板支持判断', '确认后保留审核状态']} tone="orange" />
    <Edge id={id} d="M640 105H680V175H720" /><Edge id={id} d="M640 273H680V209H720" />
    <Edge id={id} d="M868 257V355H483V383" tone="orange" /><Edge id={id} d="M868 355V383" tone="orange" />
    <Plate x={326} y={383} w={314} title="特征治理知识" lines={['用途、关系、限制与引用证据']} />
    <Plate x={720} y={383} w={296} title="策略治理知识" lines={['规则理解、引用与审查记录']} />
    <text x="24" y="420" className="agent-title">我的职责</text><text x="24" y="452" className="agent-copy">核心架构与工程推进</text><text x="24" y="477" className="agent-copy">评价约束与交付审查</text>
  </g>;
}

export function FieldOpsEngineering({ id }: { id: string }) {
  return <g data-diagram-layout="fieldops-engineering">
    <Caption x={24} y={30}>已形成工程实现的工作链</Caption>
    <Plate x={24} y={62} w={220} title="增量与版本" lines={['接入新增资料', '比较版本变化', '固定本轮输入']} />
    <Plate x={280} y={62} w={220} title="解析与验证" lines={['字段与完整规则', '历史证据核对', '局部离线测试']} />
    <Plate x={536} y={62} w={220} title="人工审核" lines={['来源与解释审查', '确认用途和限制', '保留未知与分歧']} tone="orange" />
    <Plate x={792} y={62} w={220} title="知识产物" lines={['候选治理文档', '证据与版本索引', '可继续接管的记录']} />
    <Edge id={id} d="M244 127H280" /><Edge id={id} d="M500 127H536" /><Edge id={id} d="M756 127H792" tone="orange" />
    <Plate x={24} y={264} w={476} title="AI 协作执行" lines={['按任务约束完成代码、调试与材料整理', '测试回执和失败记录随版本保留']} />
    <Plate x={536} y={264} w={476} title="我定义与审查" lines={['明确架构、评价口径与验收条件', '审查执行结果，决定修订与继续推进']} tone="orange" />
    <Edge id={id} d="M500 309H536" /><Edge id={id} d="M774 374V405H130V374" tone="orange" feedback />
    <text x="190" y="431" className="agent-copy">纠偏 → 版本追溯 → Checkpoint 恢复</text>
    <Plate x={536} y={445} w={476} title="继续推进" lines={['RAG 接入 · 周期调度']} pending />
    <text x="24" y="491" className="agent-copy">核心方案通过评审，工程持续开发。</text><text x="24" y="516" className="agent-copy">本地测试与生产应用分别记录。</text>
  </g>;
}

export function RiskDiscovery({ id }: { id: string }) {
  return <g data-diagram-layout="risk-discovery">
    <Caption x={24} y={30}>问题与样本</Caption><Caption x={356} y={30}>输入与模型对照</Caption><Caption x={758} y={30}>候选发现</Caption>
    <Plate x={24} y={58} w={264} title="短窗口受阻观察" lines={['Rej → Pass 配对与复盘', '先限定可比较的业务背景', '观察线索不等于误伤标签']} />
    <Plate x={356} y={58} w={334} title="可比输入与受约束实验" lines={['评分 / 原始行为 / 混合输入', '非限额信号与宽特征研究', '分别检查来源、标签和泄漏']} />
    <Plate x={758} y={58} w={258} title="树模型发现" lines={['XGBoost / LightGBM', '对照、特征族消融', '解释完整路径条件']} />
    <Edge id={id} d="M288 123H356" /><Edge id={id} d="M690 123H758" />
    <g className="research-model" transform="translate(43 282)"><path d="M112 0L54 49M112 0L170 49M54 49L22 98M54 49L85 98M170 49L137 98M170 49L202 98" />{[[112, 0], [54, 49], [170, 49], [22, 98], [85, 98], [137, 98], [202, 98]].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={index < 3 ? 8 : 5} />)}<text x="112" y="137" className="model-caption">路径用于探索特征组合</text></g>
    <Plate x={356} y={286} w={334} title="方法审查与反证" lines={['检查模型究竟区分了什么', '比较输入贡献与依赖条件', '重新约束下一轮实验']} tone="orange" />
    <Plate x={758} y={286} w={258} title="候选研究输出" lines={['可解释的组合与路径', '交给回放与业务复核', '不直接变成上线规则']} />
    <Edge id={id} d="M887 188V240H523V286" tone="orange" /><Edge id={id} d="M690 351H758" tone="orange" />
    <Edge id={id} d="M523 416V467H316V123H356" tone="orange" feedback />
    <text x="370" y="500" className="agent-copy">本人确定问题、对照与候选取舍；AI 辅助实验、调试和证据整理。</text>
  </g>;
}

export function RiskValidation({ id }: { id: string }) {
  return <g data-diagram-layout="risk-validation">
    <Caption x={24} y={30}>从完整路径到可交接的候选</Caption>
    <Plate x={24} y={60} w={264} title="还原完整条件" lines={['祖先条件 / 比较符 / 缺失路由', '固定范围与输入版本', '回放候选及原策略覆盖']} />
    <Plate x={350} y={60} w={334} title="覆盖与重叠核对" lines={['包含 / 独占 / 顺序新增', '比较候选成员与条件覆盖', '不将重叠群体重复相加']} />
    <Plate x={350} y={286} w={334} title="稳定性与金额反证" lines={['结构重现与搜索流程留出', '前置细分、金额聚集检查', '观察浓度与业务增益分开']} tone="orange" />
    <Plate x={758} y={172} w={258} title="取舍与交接" lines={['保留 / 排除及判断依据', '完整回放与反证说明', '冻结版本与恢复交付']} />
    <Edge id={id} d="M288 125H350" /><Edge id={id} d="M517 190V286" tone="orange" /><Edge id={id} d="M684 125H719V220H758" /><Edge id={id} d="M684 351H719V254H758" tone="orange" />
    <g className="candidate-overlap" transform="translate(24 286)"><rect width="264" height="130" rx="8" /><ellipse cx="96" cy="64" rx="68" ry="46" /><ellipse cx="127" cy="64" rx="28" ry="25" /><text x="62" y="68" className="agent-copy">A</text><text x="121" y="68" className="agent-copy">B</text><text x="177" y="60" className="agent-copy">子群更浓</text><text x="170" y="84" className="agent-copy">≠ 新增覆盖</text></g>
    <path className="research-bracket" d="M24 449v14h992v-14" />
    <text x="24" y="499" className="agent-title">沉淀为 Pattern Discovery 方法流程与可复核交付</text>
    <text x="24" y="530" className="agent-copy">条件满足、真实命中与业务收益分开解释；独立业务验证不由研究结项推导。</text>
  </g>;
}

export function FieldMethodTransfer({ id }: { id: string }) {
  return <g data-diagram-layout="field-governance">
    <Caption x={24} y={30}>业务隔离</Caption><Caption x={332} y={30}>共享整理方法</Caption><Caption x={728} y={30}>分业务交付</Caption>
    <Plate x={24} y={60} w={244} title="钱包字段研究" lines={['解析原始类型与嵌套结构', '沉淀整理方法与迁移条件']} />
    <Plate x={24} y={265} w={244} title="外卖字段研究" lines={['全量整理与可用性分析', '迁移方法，不混用业务语义']} />
    <Plate x={332} y={60} w={330} title="语义与使用条件" lines={['主体、事件、窗口与聚合口径', '技术账本与业务目录分开', '决策时点和未知状态单独记录']} />
    <Plate x={332} y={265} w={330} title="质量与关系研究" lines={['覆盖、缺失与层级关系', '用途准入与证据审查', '人工解释、纠偏与验收']} tone="orange" />
    <Plate x={728} y={60} w={288} title="钱包知识资产" lines={['字段知识与治理 SOP', '来源、版本及用途限制']} />
    <Plate x={728} y={265} w={288} title="外卖知识资产" lines={['独立知识库与接管对账', '支持 FieldOps 后续接入']} />
    <Edge id={id} d="M268 115H332" /><Edge id={id} d="M268 320H300V148H332" /><Edge id={id} d="M497 190V265" tone="orange" /><Edge id={id} d="M662 320H696V115H728" /><Edge id={id} d="M662 320H728" />
    <path className="research-bracket" d="M24 433v14h992v-14" />
    <text x="24" y="484" className="agent-title">方法可迁移，业务归属与证据范围保持独立。</text>
    <text x="24" y="519" className="agent-copy">既定研究与知识交付已完成；字段存在、可解析、可解释和可用于决策是不同结论。</text>
  </g>;
}

export function PublicRiskLab({ id }: { id: string }) {
  return <g data-diagram-layout="risk-lab">
    <Caption x={24} y={30}>公开、独立的研究与工程作品</Caption>
    <Plate x={24} y={64} w={220} title="独立实验数据" lines={['模拟支付场景', '许可外部信用观测', '与公司资料隔离']} />
    <Plate x={280} y={64} w={220} title="模型与候选" lines={['可复现输入对照', '完整路径与候选回放', '选择性标签限制']} />
    <Plate x={536} y={64} w={220} title="策略模拟" lines={['收益与成本假设', '候选策略比较', '模拟结果单独解释']} tone="orange" />
    <Plate x={792} y={64} w={220} title="版本化实验" lines={['运行命令与测试', '结果与失败记录', '可接续的检查点']} />
    <Edge id={id} d="M244 129H280" /><Edge id={id} d="M500 129H536" /><Edge id={id} d="M756 129H792" tone="orange" />
    <Plate x={24} y={288} w={476} title="确定性工具工作流" lines={['字段与规则检查 · 证据变化核对', '真实工具调用、失败恢复及人工审查', '工具编排不等于自主 LLM Agent']} />
    <Plate x={536} y={288} w={476} title="可公开查看的交付" lines={['源码、运行说明与测试入口', '静态 Demo：查看研究问题与方法', 'AI 辅助开发，设计与审查由我负责']} />
    <Edge id={id} d="M902 194V237H262V288" /><Edge id={id} d="M500 353H536" />
    <Edge id={id} d="M774 418V463H134V418" tone="orange" feedback />
    <text x="230" y="499" className="agent-copy">Specification → AI Coding → Test / Review → Checkpoint</text>
    <text x="24" y="532" className="agent-copy">公开研究环境中的方法与工程验证，不用模拟表现证明真实支付业务效果。</text>
  </g>;
}
