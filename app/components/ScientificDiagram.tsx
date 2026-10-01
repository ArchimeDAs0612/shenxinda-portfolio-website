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
  const id = `research-${kind}`;
  return <figure className="research-figure">
    <figcaption><span>METHOD FIGURE / 研究逻辑图</span><strong>{title}</strong></figcaption>
    <div className="research-pan" tabIndex={0} role="region" aria-label={`${title}，可左右滚动`}>
      <svg className="research-svg" viewBox="0 0 1040 420" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{description}</desc>
        <defs>{(['neutral', 'teal', 'orange'] as const).map((tone) => <marker key={tone} id={`${id}-arrow-${tone}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1L9 5L0 9" className={`arrow-${tone}`} /></marker>)}</defs>
        {kind === 'risk-phase-0' && <>
          <Group x={20} y={36} w={238} h={285} title="A / 观察对象" />
          <Block x={42} y={90} w={194} title="样本关系" sub="Rej → Pass · 复盘入口" tone="teal" />
          <g className="sample-symbol" transform="translate(63 190)"><circle cx="21" cy="25" r="22" /><circle cx="78" cy="25" r="22" /><path d="M49 25h7" /><text x="21" y="30">拒</text><text x="78" y="30">过</text></g>
          <Label x={42} y={289}>观察关系 ≠ 误伤标签</Label>
          <Group x={302} y={36} w={400} h={285} title="B / 可比性与行为研究" tone="teal" />
          <Block x={326} y={85} w={170} title="范围拆分" sub="保留业务背景" />
          <Block x={326} y={218} w={170} title="同质样本比较" sub="先限定可比范围" tone="teal" />
          <Block x={522} y={149} w={158} title="窗口特征" sub="分数切片 / 聚类" tone="teal" />
          <Edge id={id} d="M236 128H326" /><Edge id={id} d="M411 161V218" />
          <Edge id={id} d="M496 256H508V187H522" tone="teal" />
          <Block x={762} y={149} w={248} h={110} title="复核候选 / 研究输出" sub="短窗口策略复盘优先级" tone="orange"><text x="16" y="83" className="block-sub">不直接形成可放行结论</text></Block>
          <Edge id={id} d="M680 187H762" tone="teal" />
          <path className="research-bracket" d="M326 341v12h354v-12" /><Label x={346} y={382}>研究范围与解释边界先于结论</Label>
        </>}
        {kind === 'risk-phase-1' && <>
          <Group x={20} y={36} w={670} h={285} title="A / 分层解释证据" tone="teal" />
          <Block x={42} y={95} w={186} title="分布画像" sub="连续变量 / 分位数" />
          <Block x={42} y={215} w={186} title="订单级覆盖" sub="绝对量 + 组内占比" tone="teal" />
          <Block x={280} y={145} w={186} h={110} title="窗口 × 规则分支" sub="保留条件上下文" tone="teal"><text x="16" y="83" className="block-sub">曾达到 ≠ 同时发生</text></Block>
          <Block x={508} y={145} w={158} h={110} title="候选证据链" sub="不直接相加 / 去重" tone="teal" />
          <Edge id={id} d="M228 133H250V181H280" /><Edge id={id} d="M228 253H250V219H280" />
          <Edge id={id} d="M466 200H508" tone="teal" />
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
          <Block x={520} y={164} w={170} h={90} title="PySpark GBT" sub="实际执行 / 分布式树" tone="teal" />
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
          <Edge id={id} d="M479 89V16H239V271" dashed tone="orange" />
          <Label x={510} y={26}>审查发现矛盾 → 重新约束执行</Label>
          <path className="research-bracket" d="M42 390v12h953v-12" />
          <Label x={302} y={418}>执行能力可扩大 · 判断与责任不可外包</Label>
        </>}
      </svg>
    </div>
    <p className="research-legend"><span className="legend-teal">研究 / 执行</span><span className="legend-orange">审查 / 责任 / 准入</span><span>虚线：待验证、待开展或反馈约束</span></p>
    <p className="research-note">方法关系示意，非公司系统架构；不含原始业务数据。手机可左右滑动查看完整图，全部说明也在下方直接呈现。</p>
  </figure>;
}
