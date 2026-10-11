'use client';

import { useEffect, useRef, useState } from 'react';
import { portalContent } from '../../content/portal-content';

/** Share the one canonical portal, never a temporary URL or a private browser state. */
export function PortalShare() {
  const [feedback, setFeedback] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(portalContent.url);
      setFeedback('主页链接已复制');
    } catch {
      setFeedback('请长按下方网址复制');
    }
    timer.current = setTimeout(() => setFeedback(''), 2400);
  };

  return <aside className="portal-share" aria-label="分享个人主页">
    <p>把这张个人名片，留给下一次交流。</p>
    <div><button type="button" onClick={copy}>复制主页链接 <span aria-hidden="true">↗</span></button><span role="status" aria-live="polite">{feedback}</span></div>
    <a href={portalContent.url}>{portalContent.url}</a>
  </aside>;
}
