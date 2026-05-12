interface BaguaProps {
  size?: number;
  className?: string;
  spinning?: boolean;
}

const TRIGRAMS = [
  { lines: [1, 1, 1], name: '乾' },
  { lines: [0, 1, 1], name: '兌' },
  { lines: [1, 0, 1], name: '離' },
  { lines: [0, 0, 1], name: '震' },
  { lines: [1, 1, 0], name: '巽' },
  { lines: [0, 1, 0], name: '坎' },
  { lines: [1, 0, 0], name: '艮' },
  { lines: [0, 0, 0], name: '坤' },
];

export default function Bagua({ size = 200, className = '', spinning = false }: BaguaProps) {
  const center = size / 2;
  const outerRadius = size * 0.46;
  const innerRadius = size * 0.34;
  const yinYangRadius = size * 0.18;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${className} ${spinning ? 'animate-spin-slow' : ''}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="goldRing" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#c89a30" stopOpacity="0" />
          <stop offset="85%" stopColor="#e6b94d" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffe79a" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="yinYangG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f0e0" />
          <stop offset="100%" stopColor="#e6b94d" />
        </linearGradient>
      </defs>

      <circle cx={center} cy={center} r={outerRadius} fill="url(#goldRing)" opacity="0.6" />
      <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#e6b94d" strokeWidth="0.5" opacity="0.6" />
      <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#e6b94d" strokeWidth="0.3" opacity="0.4" />

      {TRIGRAMS.map((trigram, i) => {
        const angle = (i * 360) / 8 - 90;
        const rad = (angle * Math.PI) / 180;
        const tx = center + Math.cos(rad) * (outerRadius - size * 0.06);
        const ty = center + Math.sin(rad) * (outerRadius - size * 0.06);
        const lineLength = size * 0.07;
        const lineGap = size * 0.018;

        return (
          <g key={i} transform={`translate(${tx}, ${ty}) rotate(${angle + 90})`}>
            {trigram.lines.map((solid, lineIdx) => {
              const y = (lineIdx - 1) * lineGap * 1.6;
              if (solid) {
                return (
                  <rect
                    key={lineIdx}
                    x={-lineLength / 2}
                    y={y - lineGap / 2}
                    width={lineLength}
                    height={lineGap}
                    fill="#e6b94d"
                  />
                );
              }
              return (
                <g key={lineIdx}>
                  <rect
                    x={-lineLength / 2}
                    y={y - lineGap / 2}
                    width={lineLength * 0.4}
                    height={lineGap}
                    fill="#e6b94d"
                  />
                  <rect
                    x={lineLength * 0.1}
                    y={y - lineGap / 2}
                    width={lineLength * 0.4}
                    height={lineGap}
                    fill="#e6b94d"
                  />
                </g>
              );
            })}
          </g>
        );
      })}

      <g transform={`translate(${center}, ${center})`}>
        <circle r={yinYangRadius} fill="#f5f0e0" />
        <path
          d={`M 0,${-yinYangRadius}
             A ${yinYangRadius / 2},${yinYangRadius / 2} 0 0 1 0,0
             A ${yinYangRadius / 2},${yinYangRadius / 2} 0 0 0 0,${yinYangRadius}
             A ${yinYangRadius},${yinYangRadius} 0 0 1 0,${-yinYangRadius} Z`}
          fill="#1d1846"
        />
        <circle cx={0} cy={-yinYangRadius / 2} r={yinYangRadius * 0.18} fill="#1d1846" />
        <circle cx={0} cy={yinYangRadius / 2} r={yinYangRadius * 0.18} fill="#f5f0e0" />
      </g>
    </svg>
  );
}
