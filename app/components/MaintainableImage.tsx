'use client';

import { useState } from 'react';

type MaintainableImageProps = {
  src: string;
  alt: string;
  label: string;
  fallbackTitle: string;
  caption?: string;
  className: string;
  objectPosition?: string;
  priority?: boolean;
};

export function MaintainableImage({
  src,
  alt,
  label,
  fallbackTitle,
  caption,
  className,
  objectPosition = 'center center',
  priority = false,
}: MaintainableImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`${className} media-frame ${failed ? 'is-missing' : 'is-loaded'}`}
      aria-label={failed ? fallbackTitle : undefined}
    >
      {!failed && (
        // A plain img keeps one relative asset path working on localhost, Sites,
        // and the GitHub Pages subdirectory without provider-specific loaders.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="media-image"
          src={src}
          alt={alt}
          width={1600}
          height={2000}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{ objectPosition }}
          onError={() => setFailed(true)}
        />
      )}
      <div className="media-fallback" aria-hidden={!failed}>
        <span>{label}</span>
        <strong>{fallbackTitle}</strong>
        {caption && <p>{caption}</p>}
      </div>
    </div>
  );
}
