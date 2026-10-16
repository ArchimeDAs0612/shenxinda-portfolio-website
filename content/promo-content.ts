/** A single, public-facing film shared by the public and career views. */
export const promoContent = {
  // Switch on only after the user explicitly approves a specific final film.
  // 2026-10-16: approved A film + placement + retention of its original audio.
  published: true,
  title: '83 秒，看我的技术实践',
  description: '支付风控研究、字段知识与 Agent 原型，以及数据分析自动化。',
  video: '/media/archimedas-83s-a-v1.mp4',
  poster: '/images/promo/archimedas-83s-a-v1.jpg',
  durationLabel: '01:23',
  durationSeconds: 83,
  sha256: 'a9761dd29d8bc4d21d62acfe9e8d2fd088b4c631c9040b4b55b382b875ea57d2',
} as const;
