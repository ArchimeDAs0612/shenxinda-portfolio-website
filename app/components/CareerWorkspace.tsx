'use client';

import { Children, type ReactNode, useEffect, useState } from 'react';

const panels = [['work', '滴滴研究', 'Project Context'], ['projects', '风控项目', 'Project Evidence'], ['ai', 'AI 协作', 'Agent in Practice']] as const;

/** Navigation shortcuts supplement continuous reading; no section is ever hidden. */
export function CareerWorkspace({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState('work');
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const resolve = () => {
      const hash = location.hash.slice(1);
      const panel = hash === 'risk-pattern' || hash === 'feature-research' ? 'projects' : panels.find(([id]) => id === hash)?.[0];
      setSelected(panel || 'work');
      if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }));
    };
    resolve();
    window.addEventListener('hashchange', resolve);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (focused) return;
      const current = panels.map(([id]) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity }))
        .filter((item) => item.top <= 185).sort((a, b) => b.top - a.top)[0];
      if (current) setSelected(current.id);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('hashchange', resolve); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [focused]);
  const choose = (id: string) => {
    setSelected(id);
  };
  return <div className="career-workspace" id="career-workspace">
    <div className="workspace-heading"><p className="eyebrow">CAREER / RESEARCH / AI</p><h2>经历有来路，<br />方法有证据。</h2><p>向下阅读，即可了解全部经历、研究过程与 AI 协作。也可以使用下方目录快速定位。</p></div>
    <div className="reading-mode" aria-label="阅读方式"><button type="button" aria-pressed={!focused} onClick={() => setFocused(false)}>连续阅读</button><button type="button" aria-pressed={focused} onClick={() => setFocused(true)}>专注浏览</button><span>{focused ? '按模块切换 · 可随时返回全部内容' : '默认展示全部内容 · 无需切换'}</span></div>
    <nav className="workspace-tabs" aria-label="职业内容快捷目录">
      {panels.map(([id, title, english], index) => <a href={`#${id}`} id={`tab-${id}`} aria-current={selected === id ? 'location' : undefined} key={id} onClick={() => choose(id)}><span>0{index + 1}</span><strong>{title}</strong><small>{english}</small></a>)}
    </nav>
    {Children.toArray(children).map((child, index) => <div id={`panel-${panels[index][0]}`} hidden={focused && selected !== panels[index][0]} key={panels[index][0]}>{child}</div>)}
  </div>;
}
