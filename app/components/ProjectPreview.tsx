'use client';

import { useEffect, useRef, useState } from 'react';
import { ScientificDiagram } from './ScientificDiagram';

const previews = [
  { kind: 'risk-phase-2', target: 'risk-phase-2', label: '风险模型 · 对照实验', summary: '三组输入、交叉验证与重复实验：先审查模型学到了什么，再讨论决策价值。' },
  { kind: 'field-governance', target: 'feature-research', label: '特征研究 · 语义治理', summary: '把可解析的字段，变成可理解、可追溯的研究输入。外卖已有沉淀，钱包尚未开展。' },
  { kind: 'ai-case-0', target: 'ai-case-0', label: 'AI 协作 · 研究纠偏', summary: 'Agent 扩大代码与实验执行能力；我设定对照、审查证据并保留最终判断。' },
] as const;

/** An optional preview, never a gate to the complete vertically readable cases. */
export function ProjectPreview() {
  const track = useRef<HTMLDivElement>(null);
  const region = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [occupied, setOccupied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (region.current) observer.observe(region.current);
    return () => { observer.disconnect(); motion.removeEventListener('change', sync); };
  }, []);

  const go = (next: number) => {
    const target = (next + previews.length) % previews.length;
    track.current?.scrollTo({ left: target * track.current.clientWidth, behavior: reduced ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    if (paused || occupied || reduced || !visible) return;
    const timer = window.setTimeout(() => {
      const node = track.current;
      if (node) node.scrollTo({ left: ((index + 1) % previews.length) * node.clientWidth, behavior: 'smooth' });
    }, 6500);
    return () => clearTimeout(timer);
  }, [index, paused, occupied, reduced, visible]);

  return <section className="project-preview-section" ref={region} aria-labelledby="preview-title" onMouseEnter={() => setOccupied(true)} onMouseLeave={() => setOccupied(false)} onFocusCapture={() => setOccupied(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOccupied(false); }}>
    <div className="preview-heading"><div><p className="eyebrow">RESEARCH IN PRACTICE / 项目速览</p><h2 id="preview-title">先看方法，再看履历。</h2><p>三张图，快速了解我正在解决什么。完整案例继续向下阅读，无需切换。</p></div><div className="preview-controls"><span>{String(index + 1).padStart(2, '0')} / 03</span><button type="button" aria-label="上一张项目图" onClick={() => { setPaused(true); go(index - 1); }}>←</button><button type="button" aria-label="下一张项目图" onClick={() => { setPaused(true); go(index + 1); }}>→</button><button type="button" aria-label={paused || reduced ? '开启项目图轮播' : '暂停项目图轮播'} aria-pressed={!paused && !reduced} disabled={reduced} onClick={() => setPaused(!paused)}>{paused || reduced ? '▶' : 'Ⅱ'}</button></div></div>
    <div className="preview-track" ref={track} onPointerDown={() => setPaused(true)} onScroll={() => { const node = track.current; if (node) setIndex(Math.round(node.scrollLeft / node.clientWidth)); }}>
      {previews.map((item, i) => <article className="preview-slide" key={item.kind} aria-label={item.label}><ScientificDiagram kind={item.kind} preview idPrefix={`preview-${i}-`} /><div className="preview-caption"><div><strong>{item.label}</strong><p>{item.summary}</p></div><a href={`#${item.target}`}>阅读完整案例 ↘</a></div></article>)}
    </div>
    <p className="preview-boundary">研究项目均为 WIP。图示展示方法与个人工作，不代表公司系统或已上线结果。</p>
  </section>;
}
