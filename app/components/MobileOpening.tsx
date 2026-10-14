'use client';

import { useEffect, useRef } from 'react';

const openingKey = 'portfolio-opening-shown';

/** A finite, optional entrance for direct mobile visits. Native dialog keeps focus contained. */
export function MobileOpening() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const mobile = window.matchMedia('(max-width: 639px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!dialog?.showModal || !mobile.matches || reduced.matches || window.location.hash) return;
    try { if (window.sessionStorage.getItem(openingKey)) return; } catch { /* Private modes can disable storage. */ }

    let finishTimer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      dialog.showModal();
      skipRef.current?.focus({ preventScroll: true });
      try { window.sessionStorage.setItem(openingKey, '1'); } catch { /* Animation still ends automatically. */ }
    });
    const close = () => { if (dialog.open) dialog.close(); };
    const startExit = window.setTimeout(() => {
      dialog.dataset.leaving = 'true';
      finishTimer = window.setTimeout(close, 330);
    }, 1050);
    const onResize = () => { if (!mobile.matches) close(); };
    const onReducedMotion = () => { if (reduced.matches) close(); };
    const onVisibility = () => { if (document.hidden) close(); };
    mobile.addEventListener('change', onResize);
    reduced.addEventListener('change', onReducedMotion);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(startExit);
      window.clearTimeout(finishTimer);
      mobile.removeEventListener('change', onResize);
      reduced.removeEventListener('change', onReducedMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      close();
    };
  }, []);

  return (
    <dialog className="mobile-opening" ref={dialogRef} aria-labelledby="mobile-opening-name" aria-describedby="mobile-opening-welcome">
      <div className="mobile-opening-frame">
        <div className="mobile-opening-header"><span>ARCHIMEDAS<br />PERSONAL PORTAL</span><button ref={skipRef} type="button" onClick={() => dialogRef.current?.close()}>跳过开场 <span aria-hidden="true">↗</span></button></div>
        <div className="mobile-opening-content">
          <p className="mobile-opening-index">A PERSONAL PERSPECTIVE / 01</p>
          <p className="mobile-opening-name" id="mobile-opening-name">阿基米达</p>
          <p className="mobile-opening-domains">STATISTICS · DECISION · CREATION</p>
          <svg className="mobile-opening-signal" viewBox="0 0 360 150" aria-hidden="true"><path className="opening-rail" d="M0 75H360"/><path className="opening-gold" d="M0 125C80 125 100 20 180 75S280 125 360 25"/><path className="opening-sage" d="M0 25C80 25 100 130 180 75S280 25 360 125"/><path className="opening-paper" d="M0 75C80 75 120 25 180 75S280 75 360 75"/><circle cx="180" cy="75" r="3"/></svg>
          <p className="mobile-opening-welcome" id="mobile-opening-welcome">从一个想法，认识一个人。<span>欢迎来到我的主页。</span></p>
        </div>
        <div className="mobile-opening-footer"><span>STATISTICS × HUMAN JUDGMENT</span><span>职业 · 创作 · 生活</span></div>
      </div>
    </dialog>
  );
}
