import type { LottoNumberMeta, SajuPillars } from '@/types/saju';
import { mulberry32 } from '@/lib/lotto/prng';
import {
  STEM_KOREAN,
  ELEMENT_KOREAN,
} from '@/lib/saju/constants';
import {
  DAY_STEM_DESCRIPTIONS,
  DAY_STEM_TODAY_ENERGY,
  ELEMENT_TRAIT,
  YINYANG_TRAIT,
  NUMBER_REASON_POOL,
  BONUS_REASON_POOL,
  DAILY_FORTUNE_OPENERS,
  DAILY_FORTUNE_CLOSURES,
} from './templates';

export interface NumberInterpretation {
  number: number;
  reason: string;
}

export interface SajuInterpretation {
  identity: string;
  todayEnergy: string;
  numbers: NumberInterpretation[];
  bonus: NumberInterpretation;
  opener: string;
  closure: string;
}

function pickOne<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

const RELATIONS = ['삼합', '육합', '상생', '동기', '비견', '식신'];

function hasJongseong(char: string): boolean {
  const code = char.charCodeAt(char.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function applyJosa(text: string): string {
  return text
    .replace(/(\S)\s*\{을를\}/g, (_, c) => `${c}${hasJongseong(c) ? '을' : '를'}`)
    .replace(/(\S)\s*\{이가\}/g, (_, c) => `${c}${hasJongseong(c) ? '이' : '가'}`)
    .replace(/(\S)\s*\{은는\}/g, (_, c) => `${c}${hasJongseong(c) ? '은' : '는'}`)
    .replace(/(\S)\s*\{과와\}/g, (_, c) => `${c}${hasJongseong(c) ? '과' : '와'}`);
}

function renderTemplate(
  template: string,
  vars: Record<string, string>,
): string {
  const replaced = template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
  return applyJosa(replaced);
}

/**
 * 사주 + 로또 결과 → 해석 텍스트
 */
export function renderInterpretation(
  saju: SajuPillars,
  main: LottoNumberMeta[],
  bonus: LottoNumberMeta,
  seed: number,
): SajuInterpretation {
  const rng = mulberry32(seed ^ 0xa5a5a5a5);

  const dayStem = saju.day.stem;
  const dayElement = saju.day.stemElement;

  const identity = `${pickOne(DAY_STEM_DESCRIPTIONS[dayStem], rng)} 당신`;
  const todayEnergy = pickOne(DAY_STEM_TODAY_ENERGY[dayStem], rng);

  const pillars = ['년주', '월주', '일주', '시주'];

  const numbers: NumberInterpretation[] = main.map((meta) => {
    const template = pickOne(NUMBER_REASON_POOL, rng);
    const vars = {
      element: meta.element,
      elementKor: ELEMENT_KOREAN[meta.element],
      yinyang: YINYANG_TRAIT[meta.yinyang],
      dayElement,
      dayElementKor: ELEMENT_KOREAN[dayElement],
      relation: pickOne(RELATIONS, rng),
      pillar: pickOne(pillars, rng),
      trait: ELEMENT_TRAIT[meta.element],
    };
    return {
      number: meta.number,
      reason: renderTemplate(template, vars),
    };
  });

  const bonusTemplate = pickOne(BONUS_REASON_POOL, rng);
  const bonusInterpretation: NumberInterpretation = {
    number: bonus.number,
    reason: renderTemplate(bonusTemplate, {
      element: bonus.element,
      elementKor: ELEMENT_KOREAN[bonus.element],
      yinyang: YINYANG_TRAIT[bonus.yinyang],
    }),
  };

  return {
    identity,
    todayEnergy,
    numbers,
    bonus: bonusInterpretation,
    opener: pickOne(DAILY_FORTUNE_OPENERS, rng),
    closure: pickOne(DAILY_FORTUNE_CLOSURES, rng),
  };
}

export function formatPillar(stem: string, branch: string): string {
  return `${stem}${branch}(${STEM_KOREAN[stem as keyof typeof STEM_KOREAN]}${''})`;
}
