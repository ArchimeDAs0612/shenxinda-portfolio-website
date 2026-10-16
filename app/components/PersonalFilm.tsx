'use client';

/* eslint-disable @next/next/no-img-element -- Lightweight local video poster. */
import { useEffect, useRef, useState } from 'react';
import { promoContent } from '../../content/promo-content';

export function PersonalFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const pause = () => videoRef.current?.pause();
    const pauseWhenHidden = () => { if (document.hidden) pause(); };
    window.addEventListener('portfolio:music-play', pause);
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      window.removeEventListener('portfolio:music-play', pause);
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setOpened(true);
    setError(false);
    window.dispatchEvent(new Event('portfolio:film-play'));
    // Attach the URL only after consent; call play within the tap for mobile Safari.
    if (!video.getAttribute('src')) video.src = promoContent.video;
    void video.play().catch(() => setError(true));
  };

  return <section className={`personal-film ${opened ? 'is-open' : ''}`} id="film" aria-labelledby="personal-film-title">
    <div className="personal-film-copy">
      <p className="eyebrow">A PERSONAL FILM / 个人技术实践</p>
      <h2 id="personal-film-title">{promoContent.title}</h2>
      <p>{promoContent.description}</p>
    </div>
    <div className="personal-film-stage">
      <div className="personal-film-media">
      <video ref={videoRef} poster={promoContent.poster} controls={opened} playsInline preload="none" tabIndex={opened ? 0 : -1} aria-hidden={!opened} aria-label="阿基米达83秒个人技术实践，A配乐版" onPlay={() => window.dispatchEvent(new Event('portfolio:film-play'))} onError={() => setError(true)} />
      {!opened && <button type="button" className="personal-film-trigger" onClick={play} aria-label="播放阿基米达83秒技术实践" aria-expanded={false}>
        <img src={promoContent.poster} alt="阿基米达个人短片封面" loading="lazy" width="960" height="540" />
        <span className="film-play-symbol" aria-hidden="true">▶</span>
        <span className="film-play-label">播放短片 <small>{promoContent.durationLabel} · A 配乐版</small></span>
      </button>}
      </div>
      {opened && <button className="film-collapse" type="button" onClick={() => { videoRef.current?.pause(); setOpened(false); requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.personal-film-trigger')?.focus({ preventScroll: true })); }}>收起短片 ↑</button>}
      {error && <p className="film-error" role="status">如播放器暂未开始，可使用播放控件，或<a href={promoContent.video}>直接打开短片 ↗</a>。</p>}
      <noscript><p className="film-error"><a href={promoContent.video}>直接打开83秒A配乐短片 ↗</a></p></noscript>
    </div>
  </section>;
}
