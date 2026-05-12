interface Props {
  className?: string;
}

export default function OrnamentalDivider({ className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <svg width="80" height="12" viewBox="0 0 80 12">
        <line x1="0" y1="6" x2="60" y2="6" stroke="#e6b94d" strokeOpacity="0.5" strokeWidth="0.8" />
        <circle cx="70" cy="6" r="2.5" fill="none" stroke="#e6b94d" strokeOpacity="0.7" strokeWidth="0.8" />
        <circle cx="70" cy="6" r="1" fill="#e6b94d" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <g transform="translate(10,10)">
          <path
            d="M 0,-7 L 1.5,-1.5 L 7,0 L 1.5,1.5 L 0,7 L -1.5,1.5 L -7,0 L -1.5,-1.5 Z"
            fill="#e6b94d"
            opacity="0.8"
          />
          <circle r="1.2" fill="#ffe79a" />
        </g>
      </svg>
      <svg width="80" height="12" viewBox="0 0 80 12">
        <circle cx="10" cy="6" r="2.5" fill="none" stroke="#e6b94d" strokeOpacity="0.7" strokeWidth="0.8" />
        <circle cx="10" cy="6" r="1" fill="#e6b94d" />
        <line x1="20" y1="6" x2="80" y2="6" stroke="#e6b94d" strokeOpacity="0.5" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
