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
export function SocialSourceWelcome() {
  const [source, setSource] = useState<Source | null>(null);

  useEffect(() => {
    const candidate = new URLSearchParams(window.location.search).get('from');
    if (candidate !== 'xhs' && candidate !== 'douyin') return;
    const frame = window.requestAnimationFrame(() => setSource(candidate));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!source) return null;

  return (
    <p className="hero-statement hero-intro-copy social-source-welcome">
      {sourceCopy[source].message}
    </p>
  );
}
