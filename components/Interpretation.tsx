import type { LottoResult } from '@/types/saju';
import type { SajuInterpretation, NumberInterpretation } from '@/lib/interpretation/render';
import { STEM_KOREAN, BRANCH_KOREAN } from '@/lib/saju/constants';
import ElementBalance from './ElementBalance';

interface Props {
  result: LottoResult;
  interpretation: SajuInterpretation;
  userName: string;
}

function formatPillar(stem: string, branch: string) {
  const s = STEM_KOREAN[stem as keyof typeof STEM_KOREAN];
  const b = BRANCH_KOREAN[branch as keyof typeof BRANCH_KOREAN];
  return { hanja: `${stem}${branch}`, hangul: `${s}${b}` };
}

const TAG_COLORS: Record<NumberInterpretation['tag'], string> = {
  '보완수': 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300',
  '조력수': 'bg-amber-500/15 border-amber-400/50 text-amber-300',
  '일진수': 'bg-sky-500/15 border-sky-400/50 text-sky-300',
  '사주수': 'bg-rose-500/15 border-rose-400/50 text-rose-300',
  '균형수': 'bg-white/5 border-white/20 text-white/60',
};

export default function Interpretation({ result, interpretation, userName }: Props) {
  const { saju } = result;
  const pillars = [
    { label: '년주', ...formatPillar(saju.year.stem, saju.year.branch) },
    { label: '월주', ...formatPillar(saju.month.stem, saju.month.branch) },
    { label: '일주', ...formatPillar(saju.day.stem, saju.day.branch) },
    saju.hour
      ? { label: '시주', ...formatPillar(saju.hour.stem, saju.hour.branch) }
      : null,
  ].filter(Boolean) as Array<{ label: string; hanja: string; hangul: string }>;

  return (
    <div className="space-y-6">
      <section className="card-mystic rounded-2xl p-6 animate-fade-in-up">
        <p className="text-xs text-gold-400/80 tracking-wider mb-2">{interpretation.opener}</p>
        <h2 className="text-xl sm:text-2xl font-semibold leading-relaxed">
          <span className="text-gold-gradient font-bold">{userName}</span>님,
          <br />
          {interpretation.identity}.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
          {interpretation.todayEnergy}
        </p>
        <p className="mt-3 text-xs text-gold-400/70">{interpretation.zodiacText}</p>
      </section>

      <section className="card-mystic rounded-2xl p-6">
        <h3 className="text-xs text-gold-400/80 tracking-widest mb-4">당신의 사주</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
          {pillars.map((p) => (
            <div key={p.label} className="text-center">
              <div className="text-[10px] text-white/50 mb-1">{p.label}</div>
              <div className="hanja text-3xl text-gold-400 leading-none">{p.hanja}</div>
              <div className="text-[10px] text-white/60 mt-1">{p.hangul}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card-mystic rounded-2xl p-6">
        <h3 className="text-xs text-gold-400/80 tracking-widest mb-4">오행 균형</h3>
        <ElementBalance balance={interpretation.analysis.balance} />
        <p className="mt-4 text-sm text-white/80 leading-relaxed">
          {interpretation.elementBalanceText}
        </p>
      </section>

      <section className="card-mystic rounded-2xl p-6">
        <h3 className="text-xs text-gold-400/80 tracking-widest mb-3">오늘의 일진과 당신</h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="hanja text-2xl text-gold-400 font-bold">
            {interpretation.analysis.todayPillar.stem}{interpretation.analysis.todayPillar.branch}
          </span>
          <span className="text-xs text-white/60">
            {interpretation.analysis.todayStemHangul}{interpretation.analysis.todayBranchHangul}일
          </span>
          <span className="ml-auto text-xs px-2 py-1 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-400">
            {interpretation.analysis.todayRelationName}
          </span>
        </div>
        <p className="text-sm text-white/85 leading-relaxed">
          {interpretation.todayRelationText}
        </p>
      </section>

      <section>
        <h3 className="text-xs text-gold-400/80 tracking-widest mb-4 px-2">번호 풀이</h3>
        <ul className="space-y-2.5">
          {interpretation.numbers.map((n, idx) => (
            <li
              key={n.number}
              className="card-mystic flex items-start gap-4 rounded-xl p-4 animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both', opacity: 0 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500/15 border border-gold-400/40 flex items-center justify-center font-bold text-gold-400">
                {n.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${TAG_COLORS[n.tag]}`}>
                    {n.tag}
                  </span>
                </div>
                <p className="text-sm text-white/85 leading-relaxed">
                  {n.reason}
                </p>
              </div>
            </li>
          ))}
          <li
            className="card-mystic flex items-start gap-4 rounded-xl p-4 animate-fade-in-up"
            style={{ animationDelay: '560ms', animationFillMode: 'both', opacity: 0, borderColor: 'rgba(230,185,77,0.5)' }}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-400/30 border border-gold-400 flex items-center justify-center font-bold text-gold-400">
              {interpretation.bonus.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full border font-semibold bg-gold-400/20 border-gold-400 text-gold-300">
                  보너스 · {interpretation.bonus.tag}
                </span>
              </div>
              <p className="text-sm text-white/85 leading-relaxed">
                {interpretation.bonus.reason}
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="text-center px-4">
        <p className="text-base sm:text-lg text-gold-400/90 italic leading-relaxed">
          “{interpretation.closure}”
        </p>
      </section>
    </div>
  );
}
