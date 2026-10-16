/** One public identity for metadata and migration. No private source material. */
export const portalContent = {
  url: 'https://archimedas0612.github.io/',
  careerUrl: 'https://archimedas0612.github.io/career/',
  // Cloudflare's site tag is intentionally public: it identifies this website to
  // the analytics beacon and is not an account credential or an API secret.
  analyticsToken: '86fa2109d1784ac79a8f4b6cbea5d608',
  socialEntryPaths: {
    xiaohongshu: '/from/xhs/',
    douyin: '/from/douyin/',
  },
  updatedAt: '2026-10-16',
  title: '阿基米达｜统计 · AI 创作 · 个人表达',
  description: '阿基米达的个人主页。用统计理解世界，用 AI 创作表达；记录研究、创作与生活，欢迎同行交流与内容合作。',
  careerTitle: '沈鑫达｜统计 · 风险决策 · AI 创作',
  careerDescription: '沈鑫达的职业主页。厦门大学应用统计硕士，2028年毕业，参与2027届校招；滴滴国际支付风控算法实习、极氪数据分析经历。探索风险决策、机器学习与 AI 创作。',
  shareImage: 'images/profile/bdf5afa6a8fc8fc136fd282f6c467fcd.jpg',
} as const;
