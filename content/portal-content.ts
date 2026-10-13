/** One public identity for metadata and migration. No private source material. */
export const portalContent = {
  url: 'https://archimedas0612.github.io/',
  // Cloudflare's site tag is intentionally public: it identifies this website to
  // the analytics beacon and is not an account credential or an API secret.
  analyticsToken: '86fa2109d1784ac79a8f4b6cbea5d608',
  updatedAt: '2026-10-13',
  title: '沈鑫达｜统计 · 风险决策 · AI 创作',
  description: '沈鑫达的个人品牌门户。厦门大学应用统计硕士，2028年毕业，参与2027届校招；滴滴国际支付风控算法实习、极氪数据分析经历。探索风险决策、机器学习与 AI 创作，欢迎职业、同行与内容合作交流。',
  shareImage: 'images/portal-share.png',
} as const;
