/** A single, public-facing film shared by the public and career views. */
export const promoContent = {
  // Switch on only after the user explicitly approves a specific final film.
  published: false,
  title: '从一个想法，认识阿基米达。',
  description: '统计如何变成判断，AI 如何变成创作。用一分钟，看见我的思考、实践与生活。',
  video: '/media/archimedas-one-minute-v1.mp4',
  poster: '/images/promo/archimedas-one-minute-v1.jpg',
  durationLabel: '01:00',
} as const;
