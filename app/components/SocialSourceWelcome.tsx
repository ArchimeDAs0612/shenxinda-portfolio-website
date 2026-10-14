'use client';

import { useEffect, useState } from 'react';

type Source = 'xhs' | 'douyin';

const sourceCopy: Record<Source, { label: string; message: string }> = {
  xhs: {
    label: 'XIAOHONGSHU / 小红书',
    message: '从小红书来的朋友，欢迎看我的 AI 创作、职业实践与生活记录。',
  },
  douyin: {
    label: 'DOUYIN / 抖音',
    message: '从抖音来的朋友，欢迎看我的 AI 创作、职业实践与生活记录。',
  },
};

/** Source-aware copy occupies the existing hero introduction, without extra layout. */
export function SocialSourceWelcome({ career = false }: { career?: boolean }) {
  const [source, setSource] = useState<Source | null>(null);

  useEffect(() => {
    const candidate = new URLSearchParams(window.location.search).get('from');
    if (candidate !== 'xhs' && candidate !== 'douyin') return;
    const frame = window.requestAnimationFrame(() => setSource(candidate));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <p className={`hero-statement hero-intro-copy${source ? ' social-source-welcome' : ''}`}>
      {source ? sourceCopy[source].message : career ? '做风险研究，也用 AI 创作与表达。这里有我的实习与项目、创作栏目和生活记录。' : '用统计理解世界，也用 AI 创作与表达。这里有我的创作、思考与生活记录。'}
    </p>
  );
}
