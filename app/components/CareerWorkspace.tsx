'use client';

import { Children, type ReactNode, useEffect, useState } from 'react';

const panels = [['work', '经历', 'Experience'], ['projects', '风控项目', 'Project Evidence'], ['ai', 'AI 协作', 'Agent in Practice']] as const;

/** No-JS readers retain all sections; hydrated readers get a compact workbench. */
export function CareerWorkspace({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    const resolve = () => {
      const hash = location.hash.slice(1);
      const panel = hash === 'risk-pattern' || hash === 'feature-research' ? 'projects' : panels.find(([id]) => id === hash)?.[0];
      setSelected(panel || 'work');
      if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }));
    };
    resolve();
    window.addEventListener('hashchange', resolve);
    return () => window.removeEventListener('hashchange', resolve);
  }, []);
  const choose = (id: string) => {
    setSelected(id);
    history.pushState(null, '', `#${id}`);
  };
  return <div className="career-workspace" id="career-workspace">
    <div className="workspace-heading"><p className="eyebrow">CAREER / RESEARCH / AI</p><h2>经历有来路，<br />方法有证据。</h2><p>不用一页页往下找。选择一个模块，直接阅读经历、研究过程与真实协作。</p></div>
    <div className="workspace-tabs" role="tablist" aria-label="职业内容模块">
      {panels.map(([id, title, english], index) => <button type="button" role="tab" id={`tab-${id}`} aria-controls={`panel-${id}`} aria-selected={selected === id} tabIndex={selected === null || selected === id ? 0 : -1} key={id} onClick={() => choose(id)} onKeyDown={(event) => {
        const target = event.key === 'ArrowRight' ? (index + 1) % panels.length : event.key === 'ArrowLeft' ? (index + panels.length - 1) % panels.length : event.key === 'Home' ? 0 : event.key === 'End' ? panels.length - 1 : -1;
        if (target < 0) return;
        event.preventDefault(); choose(panels[target][0]); document.getElementById(`tab-${panels[target][0]}`)?.focus();
      }}><span>0{index + 1}</span><strong>{title}</strong><small>{english}</small></button>)}
    </div>
    {Children.toArray(children).map((child, index) => <div role="tabpanel" tabIndex={0} id={`panel-${panels[index][0]}`} aria-labelledby={`tab-${panels[index][0]}`} hidden={selected !== null && selected !== panels[index][0]} key={panels[index][0]}>{child}</div>)}
  </div>;
}
