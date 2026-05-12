import type { Element } from '@/types/saju';
import type { ElementBalance as Balance } from '@/lib/saju/analysis';
import { ELEMENT_KOREAN } from '@/lib/saju/constants';

const ELEMENT_COLORS: Record<Element, { bar: string; text: string }> = {
  '木': { bar: 'bg-green-500', text: 'text-green-300' },
  '火': { bar: 'bg-rose-500', text: 'text-rose-300' },
  '土': { bar: 'bg-amber-600', text: 'text-amber-300' },
  '金': { bar: 'bg-zinc-300', text: 'text-zinc-200' },
  '水': { bar: 'bg-sky-500', text: 'text-sky-300' },
};

const ORDER: Element[] = ['木', '火', '土', '金', '水'];

interface Props {
  balance: Balance;
}

export default function ElementBalance({ balance }: Props) {
  const max = Math.max(...Object.values(balance.counts), 1);

  return (
    <div className="space-y-2.5" role="img" aria-label="오행 균형 차트">
      {ORDER.map((el) => {
        const count = balance.counts[el];
        const pct = (count / max) * 100;
        const colors = ELEMENT_COLORS[el];
        const isMax = balance.strongest.includes(el);
        const isMissing = count === 0;

        return (
          <div key={el} className="flex items-center gap-3 text-sm">
            <div className="flex w-14 flex-shrink-0 items-baseline gap-1">
              <span className={`hanja text-lg font-bold ${colors.text}`}>{el}</span>
              <span className="text-[10px] text-white/50">{ELEMENT_KOREAN[el]}</span>
            </div>
            <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                style={{ width: `${pct}%`, opacity: isMissing ? 0.15 : 0.85 }}
              />
            </div>
            <div className="w-10 text-right text-xs">
              <span className={isMax ? colors.text + ' font-bold' : isMissing ? 'text-white/30' : 'text-white/60'}>
                {count}
              </span>
              <span className="text-white/30">/{balance.total}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
