import type {
  SajuPillars,
  UserInput,
  LottoNumberMeta,
  LottoResult,
} from '@/types/saju';
import { mulberry32 } from './prng';
import { buildSeed } from './seed';
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  STEM_ELEMENT,
  STEM_YINYANG,
} from '@/lib/saju/constants';
import { getSaju } from '@/lib/saju';

/**
 * 한국 로또 공식 번호별 색상
 */
function getBallColor(n: number): LottoNumberMeta['color'] {
  if (n <= 10) return 'yellow';
  if (n <= 20) return 'blue';
  if (n <= 30) return 'red';
  if (n <= 40) return 'gray';
  return 'green';
}

/**
 * 1-45 번호에 사주 메타 부착
 */
function attachMeaning(n: number): LottoNumberMeta {
  const stemIdx = (n - 1) % 10;
  const branchIdx = (n - 1) % 12;
  const stem = HEAVENLY_STEMS[stemIdx];
  const branch = EARTHLY_BRANCHES[branchIdx];

  return {
    number: n,
    stem,
    branch,
    element: STEM_ELEMENT[stem],
    yinyang: STEM_YINYANG[stem],
    color: getBallColor(n),
  };
}

/**
 * Fisher-Yates 셔플 (결정론적)
 */
function shuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 메인 진입점: 사용자 입력 → 로또 번호 6+1
 */
export function generateLotto(user: UserInput, today: Date = new Date()): LottoResult {
  const birth = new Date(user.birthDate + 'T00:00:00Z');

  const saju = getSaju({
    date: birth,
    hour: user.birthHour,
    minute: user.birthMinute,
    isLunar: user.isLunar,
    isLeapMonth: user.isLeapMonth,
  });

  const seed = buildSeed(saju, user, today);
  const rng = mulberry32(seed);

  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  const shuffled = shuffle(pool, rng);

  const mainNumbers = shuffled.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = shuffled[6];

  return {
    main: mainNumbers.map(attachMeaning),
    bonus: attachMeaning(bonusNumber),
    saju,
    generatedAt: today,
    seed,
  };
}
