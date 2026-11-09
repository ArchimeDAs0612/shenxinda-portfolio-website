/** A single, public-facing film shared by the public and career views. */
export const promoContent = {
  // Switch on only after the user explicitly approves a specific final film.
  // 2026-11-10: user approved the new 88-second film and replacement on the website.
  published: true,
  title: '88 秒，看我的技术作品',
  description: '支付风控研究、FieldOps 联合治理、数据自动化与 AI 创作。',
  recordNote: '2026年11月更新 · 阿基米达个人作品。',
  video: '/media/archimedas-88s-20261110.mp4',
  poster: '/images/promo/archimedas-88s-20261110.jpg',
  durationLabel: '01:28',
  durationSeconds: 88,
  sha256: '42331e340e85263e5b153404d05d4daa790a7511598fad6a0ddc1c05fa73a774',
} as const;
