'use client';

import { useEffect, useRef, useState } from 'react';
import { portalContent } from '../../content/portal-content';

/** Share the one canonical portal, never a temporary URL or a private browser state. */
export function PortalShare({ career = false }: { career?: boolean }) {
  const [feedback, setFeedback] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = career ? portalContent.careerUrl : portalContent.url;
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setFeedback('主页链接已复制');
    } catch {
      setFeedback('请长按下方网址复制');
    }
    timer.current = setTimeout(() => setFeedback(''), 2400);
  };

  return <aside className="portal-share" aria-label="分享个人主页">
    <div><button type="button" onClick={copy}>复制{career ? '职业页' : '主页'}链接 <span aria-hidden="true">↗</span></button><span role="status" aria-live="polite">{feedback}</span></div>
    <a href={url}>{url}</a>
  </aside>;
}
