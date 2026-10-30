/** Decorative mathematical linework, deliberately without business data or axes. */
export function ResearchMotif() {
  return <svg className="hero-mathematics" viewBox="0 0 900 520" fill="none" aria-hidden="true" focusable="false">
    {Array.from({ length: 12 }, (_, index) => <path key={index} d={`M-40 ${430 + index * 5} C${170 + index * 7} ${430 + index * 5}, ${250 + index * 4} ${75 + index * 13}, 460 ${95 + index * 14} S690 ${480 - index * 3}, 960 ${180 + index * 12}`} />)}
    <path className="motif-accent" d="M-40 455C205 455 270 140 460 165S690 465 960 240" />
    <circle cx="460" cy="165" r="5" className="motif-point" />
    <path className="motif-register" d="M444 165h32M460 149v32" />
  </svg>;
}
