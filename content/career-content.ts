/** 公开职业内容：只维护去敏摘要，不存放内部资料、字段或实验数值。 */
export const careerContent = {
  updatedAt: '2026-09-30',
  zeekr: {
    company: '极氪智能科技有限公司',
    context: '吉利控股集团旗下智能电动品牌',
    role: '数据分析实习生 · 品牌营销中心',
    period: '2025', // 结束月份待确认，不把 06/07 的歧义写成确定事实。
    metrics: [['3000+', '销售终端'], ['20万+', '潜在购车用户'], ['20+', '分析交付']] as const,
    work: [
      ['经营分析', '围绕全国销售经营，搭建销售转化与经营监测指标体系。'],
      ['用户分群', '结合线索、试驾与购车行为，研究潜客分层、高价值特征和区域差异，支持资源投放与经营判断。'],
      ['Python 自动化', '完成数据清洗、指标计算与报表自动化，将约 3 小时的人工流程压缩至约 5 分钟。'],
      ['分析交付', '输出经营周报、月报与专题分析，形成数据驱动的业务沟通与决策支持基础。'],
    ] as const,
  },
  // 只填写经本人确认、实际修读的课程；空数组时页面不显示该模块。
  selectedCoursework: [] as string[],
  didiFocus: [
    '构造 Rej → Pass 观察关系，组织同质样本与短窗口复盘范围',
    '设计订单级策略条件对比，连接分布、窗口、分支与实际命中',
    '推进 Score-only / Raw-all / Hybrid 树模型对照、消融与重复实验',
    '审查来源混淆与信息泄漏；将 OOT 和 Pattern 准入纳入验证边界',
  ],
  projects: [
    {
      id: 'risk-pattern', number: '01', status: 'WIP',
      title: '支付风控误伤识别与风险 Pattern 分析',
      english: 'Payment Risk Pattern Discovery & Decision Analysis',
      problem: '风控不仅要识别风险，也要理解误伤：观测到的差异，是否足以支持更好的决策？',
      work: '围绕短窗口支付风险场景，开展样本关系与可比性分析、特征研究、候选 Pattern 探索和树模型实验。',
      evidence: '已推进到可复跑的模型实验与方法审计；业务有效性与跨时间泛化仍待验证。',
      tags: ['Python / SQL', 'PySpark GBT', 'Feature Engineering', 'Evaluation'],
      details: [
        ['Context / 角色', '在国际支付风控实习中参与分析与验证，以公开摘要解释方法，不披露内部样本、规则或业务指标。'],
        ['Method / 方法', '由样本与特征出发，进行树模型辅助发现、交叉验证、特征族消融、复杂度敏感性与重复实验。'],
        ['Evaluation / 判断', '不把高模型分数直接当作风险识别能力。检查样本可比性、来源差异、信息泄漏与验证口径，区分实验可复现和业务可应用。'],
        ['Reflection / 边界', '观察关联、条件覆盖与实际决策是不同证据层级。跨时间验证尚未完成；不宣称正式 Pattern、策略上线、业务增益或生产模型所有权。'],
      ],
    },
    {
      id: 'feature-research', number: '02', status: 'WIP',
      title: '跨市场支付风险字段治理与特征研究',
      english: 'International Payment Risk Feature Research',
      problem: '复杂原始字段如何变成可以理解、可以判断、适合风险研究的特征输入？',
      work: '从物理可解析性、业务语义和决策价值理解字段，整理 Feature Family，并判断其用于 Pattern 研究的可用性。',
      evidence: '外卖字段部分已做并有知识沉淀；钱包字段尚未做。整体仍为 WIP，不写成全量完成。',
      tags: ['Business Semantics', 'Feature Family', 'Data Quality', 'Pattern-ready Input'],
      details: [
        ['Context / 角色', '参与国际支付风险特征研究，重点是把字段理解转化为可复用的分析输入，而非仅做字段列表。'],
        ['Method / 方法', '字段理解 → 业务语义 → 特征族 → 可用性判断 → Pattern-ready Input。先明确观察对象和分析粒度，再讨论特征价值。'],
        ['Evaluation / 判断', '区分能解析、能解释与能用于决策；不把字段存在等同于特征有效，不把待核验的语义写成已确认结论。'],
        ['Reflection / 边界', '输入资产仍在完善。公开页面不展示内部字段名、数据源、SQL、阈值或具体市场业务细节，也不宣称 Agent 已上线。'],
      ],
    },
  ],
  agentUses: 'SQL / Python · 数据分析 · Debug · 文档与项目整理 · 网页工程',
  aigc: {
    title: '荒诞研究所',
    english: 'AIGC Content Production System',
    views: '约183万', likes: '约4.2万', dataAsOf: '2026-09-30',
    question: '如何把生成式 AI 从一次性生成工具，变成可重复的内容生产能力？',
    process: [
      ['选题与拆解', '由我选择主题，把创意拆成有因果关系的分幕故事。'],
      ['Prompt 与封板', 'AI 协作产出单幕提示词、连续性约束与发布包；版本明确后再生成。'],
      ['逐幕生成与审查', '检查人物、道具、画面可理解性与素材可用性，保留失败记录。'],
      ['剪辑与发布', '人工选择素材、剪辑和核对封面文案；脚本不等于成片，成片不等于发布。'],
      ['数据反馈与迭代', '结合留存、观看与互动反馈复盘，改进下一轮选题、开头与叙事。'],
    ],
  },
} as const;
