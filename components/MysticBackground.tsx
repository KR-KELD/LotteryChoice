'use client';

import { useMemo } from 'react';

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
}

function generateStars(count: number, seed: number): Star[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    cx: rand() * 100,
    cy: rand() * 100,
    r: rand() * 1.2 + 0.3,
    delay: rand() * 3,
  }));
}

export default function MysticBackground() {
  const stars = useMemo(() => generateStars(80, 42), []);
  const bigStars = useMemo(() => generateStars(12, 99), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-mystic-radial">
      <svg
        className="absolute inset-0 h-full w-full constellation"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffe79a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffe79a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5e3fb8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5e3fb8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="15" cy="20" r="35" fill="url(#nebula)" />
        <circle cx="85" cy="75" r="40" fill="url(#nebula)" opacity="0.6" />

        {stars.map((star, i) => (
          <circle
            key={`s-${i}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r * 0.15}
            fill="#ffffff"
            opacity={0.7}
            className="star-twinkle"
            style={{ animationDelay: `${star.delay}s` }}
          />
        ))}

        {bigStars.map((star, i) => (
          <g key={`b-${i}`} className="star-twinkle" style={{ animationDelay: `${star.delay}s` }}>
            <circle cx={star.cx} cy={star.cy} r={star.r * 0.5} fill="url(#starGlow)" />
            <circle cx={star.cx} cy={star.cy} r={star.r * 0.1} fill="#fff" />
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-900 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
    </div>
  );
}
