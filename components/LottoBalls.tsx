import type { LottoNumberMeta } from '@/types/saju';

const COLOR_MAP: Record<LottoNumberMeta['color'], { from: string; to: string; ring: string }> = {
  yellow: { from: '#fde047', to: '#ca8a04', ring: '#fef3c7' },
  blue:   { from: '#7dd3fc', to: '#0369a1', ring: '#bae6fd' },
  red:    { from: '#fca5a5', to: '#b91c1c', ring: '#fecaca' },
  gray:   { from: '#d4d4d4', to: '#525252', ring: '#e5e5e5' },
  green:  { from: '#bef264', to: '#4d7c0f', ring: '#d9f99d' },
};

interface BallProps {
  meta: LottoNumberMeta;
  size?: number;
  delay?: number;
  bonus?: boolean;
}

function Ball({ meta, size = 64, delay = 0, bonus = false }: BallProps) {
  const colors = COLOR_MAP[meta.color];
  const gradId = `grad-${meta.number}-${bonus ? 'b' : 'm'}`;
  const shineId = `shine-${meta.number}-${bonus ? 'b' : 'm'}`;
  const label = bonus ? `보너스 번호 ${meta.number}` : `행운 번호 ${meta.number}`;

  return (
    <div
      className="relative inline-block animate-ball-pop opacity-0"
      style={{ animationDelay: `${delay}ms`, width: size, height: size }}
      role="img"
      aria-label={label}
    >
      {bonus && (
        <div
          className="absolute inset-0 animate-glow-pulse rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.ring} 0%, transparent 70%)`,
            filter: 'blur(12px)',
          }}
        />
      )}
      <svg width={size} height={size} viewBox="0 0 64 64" className="relative">
        <defs>
          <radialGradient id={gradId} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </radialGradient>
          <radialGradient id={shineId} cx="32%" cy="28%" r="20%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill={`url(#${gradId})`} />
        <circle cx="32" cy="32" r="30" fill="none" stroke={colors.ring} strokeWidth="1" opacity="0.7" />
        <ellipse cx="22" cy="20" rx="9" ry="6" fill={`url(#${shineId})`} />
        <text
          x="32"
          y="38"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="#fff"
          style={{
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {meta.number}
        </text>
      </svg>
      {bonus && (
        <div
          className="absolute -top-[22px] left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-2 py-1 text-[10px] leading-none font-bold text-ink-900 whitespace-nowrap shadow-md"
        >
          보너스
        </div>
      )}
    </div>
  );
}

interface LottoBallsProps {
  main: LottoNumberMeta[];
  bonus: LottoNumberMeta;
}

export default function LottoBalls({ main, bonus }: LottoBallsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
      {main.map((meta, i) => (
        <Ball key={meta.number} meta={meta} size={56} delay={i * 120} />
      ))}
      <div className="mx-1 self-center text-2xl font-light text-gold-400 opacity-0 animate-ball-pop" style={{ animationDelay: '720ms' }}>
        +
      </div>
      <Ball meta={bonus} size={56} delay={840} bonus />
    </div>
  );
}
