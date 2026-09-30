'use client';

import { useEffect, useRef, useState } from 'react';
import { AmbientScore } from './ambient-score';

export function AmbientMusic() {
  const score = useRef<AmbientScore | null>(null);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [volume, setVolume] = useState(25);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const pause = () => {
      if (score.current) {
        setPlaying(false);
        void score.current.pause().catch(() => {});
      }
    };
    const pauseWhenHidden = () => { if (document.hidden) pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    window.addEventListener('pagehide', pause);
    return () => {
      document.removeEventListener('visibilitychange', pauseWhenHidden);
      window.removeEventListener('pagehide', pause);
      score.current?.dispose();
      score.current = null;
    };
  }, []);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      if (playing) {
        setPlaying(false);
        await score.current?.pause();
      } else {
        if (!score.current) {
          score.current = new AmbientScore();
          score.current.context.onstatechange = () => {
            if (score.current?.context.state !== 'running') setPlaying(false);
          };
        }
        score.current.setVolume(volume);
        await score.current.play();
        if (document.hidden) await score.current.pause();
        else setPlaying(true);
      }
    } catch {
      setPlaying(false);
      setError(true);
      score.current?.dispose();
      score.current = null;
    } finally {
      setBusy(false);
    }
  };

  return (
    <aside className={`ambient-music ${playing ? 'is-playing' : ''}`} aria-label="背景音乐播放器">
      {expanded && <div className="music-settings" id="music-settings">
        <strong>SIGNAL / 原创电子氛围</strong>
        <p>轻一点，让阅读保持专注。</p>
        <label htmlFor="music-volume">音量 <span>{volume}%</span></label>
        <input id="music-volume" type="range" min="0" max="100" step="1" value={volume} onChange={(event) => {
          const nextVolume = Number(event.target.value);
          setVolume(nextVolume);
          score.current?.setVolume(nextVolume);
        }} />
        <small>默认关闭 · 离开页面自动暂停</small>
      </div>}
      <div className="music-controls">
        <button className="music-toggle" type="button" onClick={toggle} aria-pressed={playing} disabled={busy}>
          <span className="music-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>{error ? '点击重试音乐' : playing ? '暂停音乐' : '开启音乐'}</span>
        </button>
        <button className="music-options" type="button" aria-label={expanded ? '收起音乐设置' : '音乐设置'} aria-expanded={expanded} aria-controls="music-settings" onClick={() => setExpanded(!expanded)}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 3v14M10 3v14M16 3v14M2 7h4M8 13h4M14 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>
      <span className="sr-only" role="status">{error ? '音乐暂不可用，请重试；网页内容仍可正常阅读。' : ''}</span>
    </aside>
  );
}
