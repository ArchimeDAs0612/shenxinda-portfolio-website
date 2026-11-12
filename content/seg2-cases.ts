/** Seg2 公开案例：本人确认的职业摘要与独立公开作品，不包含公司原始资料。 */
export type Seg2FigureKind = 'fieldops-purpose' | 'fieldops-engineering' | 'risk-discovery' | 'risk-validation' | 'field-governance' | 'risk-lab';
export type Seg2Case = {
  id: string;
  number: string;
  title: string;
  status: string;
  problem: string;
  contribution: string;
  delivery: string;
  tags: readonly string[];
  figures: readonly { kind: Seg2FigureKind; title: string; contribution: string; delivery: string }[];
  links?: readonly { label: string; href: string }[];
};

// 页面与本人新简历对齐的日期，不替代各项目的阶段验收日期。
export const seg2ContentUpdatedAt = '2026-11-12';

export const seg2Cases: readonly Seg2Case[] = [
  {
    id: 'fieldops', number: '01',
    title: 'FieldOps：特征 × 策略联合治理',
    status: '核心方案已评审 · 持续开发',
    problem: '让分散的特征、规则和使用证据，成为可持续更新、可审查的治理知识，为 Pattern 发现与策略研究提供可信输入。',
    contribution: '负责 FieldOps 核心架构与工程推进：明确治理对象、评价约束与业务隔离，组织规则理解、关系图谱和知识交付；与团队协作，通过 AI Coding 推进实现、测试与纠偏。',
    delivery: '核心方案已通过评审，已形成用途评价、宗族图谱、证据联查和首页看板等工程能力。RAG 接入与周期调度仍在推进；本地实现与测试不等于完整业务验收或生产上线。',
    tags: ['特征与策略治理', '用途评价', '证据与版本'],
    figures: [
      {
        kind: 'fieldops-purpose', title: '联合治理目标',
        contribution: '将“整理字段”推进为特征与策略联合治理：先明确用途，再评价质量、关系与使用证据，保留业务隔离和人工审核。',
        delivery: '形成可追溯的特征知识与策略知识，支持评价、图谱和联查；未知依据保留待核验状态。',
      },
      {
        kind: 'fieldops-engineering', title: '工程交付与迭代',
        contribution: '把增量接入、版本变化、规则解析、历史验证与人工审查组织为工程流程；使用测试与 Checkpoint 恢复约束 AI 辅助执行。',
        delivery: '已形成候选治理文档及本地离线测试记录。知识接入与调度作为后续建设单独记录，避免把模块实现等同于全系统验收。',
      },
    ],
  },
  {
    id: 'risk-pattern', number: '02',
    title: 'FP 研究与 Pattern 发现',
    status: '研究与交付已结项',
    problem: '围绕短窗口支付受阻，寻找既有策略命中群中的额外信息，判断哪些候选值得进一步复核。',
    contribution: '开展样本比较、特征对照及 XGBoost / LightGBM 研究；负责问题拆解、方法纠偏、完整路径审查和候选取舍。团队提供业务支持，AI 辅助代码、分析与报告。',
    delivery: '短窗口复盘、非限额建模、宽特征消融、候选回放与反证，以及恢复交接均已完成，沉淀为 Pattern Discovery SOP。研究结项不等于误伤认证、真实 OOT 验证、正式策略上线或业务收益。',
    tags: ['XGBoost / LightGBM', '特征消融', '完整路径回放'],
    figures: [
      {
        kind: 'risk-discovery', title: '问题定义与模型发现',
        contribution: '从 Rej → Pass 观察入口限定可比对象，检查来源与标签差异；通过输入对照、模型比较和消融研究额外信息，而非只追求模型分数。',
        delivery: '形成分阶段样本、特征和模型研究记录，明确候选发现依据。先拒后过是观察线索，离线区分效果不直接解释为风险识别能力。',
      },
      {
        kind: 'risk-validation', title: '候选复核与交付',
        contribution: '将完整路径回放到研究总体，核对覆盖、重叠、结构稳定性和金额聚集；结合前置细分主动寻找反例，保留和舍弃候选均说明理由。',
        delivery: '交付候选说明、回放反证与版本化交接材料。条件覆盖、实际动作和独立业务验证分别记录，不将重叠子群相加或推算收益。',
      },
    ],
  },
  {
    id: 'feature-research', number: '03',
    title: '巴西钱包与外卖字段治理',
    status: '研究与交付已结项',
    problem: '让复杂的字段成为能解释、可追溯、具有明确使用条件的风险研究输入。',
    contribution: '组织字段解析、业务语义、质量与关系研究，纠正来源和统计口径；将钱包方法迁移到外卖，分开技术账本与业务目录，完成业务隔离和知识交付审查。',
    delivery: '钱包方法沉淀、外卖全量整理与可用性分析、成果接管对账及知识库拆分已交付。研究资产和治理 SOP 是 FieldOps 的方法基础；逐字段业务准入与效果另行核验。',
    tags: ['业务语义', '使用条件', '方法迁移'],
    figures: [
      {
        kind: 'field-governance', title: '字段治理与方法迁移',
        contribution: '把解析、语义、决策时点和质量关系分层检查，按用途形成准入约束；团队补充业务与数据知识，AI 辅助统计、整理和迁移。',
        delivery: '沉淀字段合同、用途准入、分业务知识资产及治理 SOP。钱包与外卖共享方法、隔离知识；未确认的语义与时点不会因归档完成而变成已知。',
      },
    ],
  },
  {
    id: 'risk-lab', number: '04',
    title: 'Risk Decision Lab / 阿基米达风险决策实验室',
    status: '公开研究 · 持续迭代',
    problem: '在独立、可公开的实验环境中，把模型发现、候选复核与策略决策连成可复现的研究过程。',
    contribution: '组织公开实验与模块迭代，将任务定义、AI Coding、测试审查和 Checkpoint 恢复用于开发；保留实验输入、结果与版本，使研究判断可以回查。',
    delivery: '已提供公开代码、运行说明及静态演示，展示候选回放、策略模拟和字段治理工具流程。使用独立模拟数据及许可外部数据，不代表公司系统或业务效果；工具工作流不宣称自主规划的 LLM Agent。',
    tags: ['可复现实验', '策略模拟', '测试与恢复'],
    figures: [
      {
        kind: 'risk-lab', title: '公开风险决策实验室',
        contribution: '将输入版本、模型与候选、决策成本和验证记录连接起来；对标签可观测性及验证范围作明确限制。',
        delivery: '公开仓库承载实现与运行方式，演示承载实验阅读。模型结果、决策模拟与业务结论分开呈现，可通过公开代码与演示查看。',
      },
    ],
    links: [
      { label: '查看实验演示', href: 'https://archimedas0612.github.io/archimeda-risk-lab/' },
      { label: '查看公开代码', href: 'https://github.com/ArchimeDAs0612/archimeda-risk-lab' },
    ],
  },
];
