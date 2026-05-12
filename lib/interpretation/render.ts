import type { LottoNumberMeta, SajuPillars, Element } from '@/types/saju';
import { mulberry32 } from '@/lib/lotto/prng';
import { STEM_KOREAN, ELEMENT_KOREAN } from '@/lib/saju/constants';
import {
  analyzeSaju,
  analyzeNumber,
  type SajuAnalysis,
  type NumberAnalysis,
} from '@/lib/saju/analysis';
import {
  DAY_STEM_DESCRIPTIONS,
  DAY_STEM_TODAY_ENERGY,
  ELEMENT_TRAIT,
  DAILY_FORTUNE_OPENERS,
  DAILY_FORTUNE_CLOSURES,
} from './templates';

export interface NumberInterpretation {
  number: number;
  reason: string;
  tag: '보완수' | '조력수' | '일진수' | '사주수' | '균형수';
}

export interface SajuInterpretation {
  identity: string;
  todayEnergy: string;
  elementBalanceText: string;
  todayRelationText: string;
  zodiacText: string;
  numbers: NumberInterpretation[];
  bonus: NumberInterpretation;
  opener: string;
  closure: string;
  analysis: SajuAnalysis;
}

function pickOne<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function getDominantElement(counts: Record<Element, number>): Element {
  const entries = Object.entries(counts) as [Element, number][];
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

function buildBalanceText(analysis: SajuAnalysis): string {
  const { balance } = analysis;
  const dominant = getDominantElement(balance.counts);
  const dominantKor = ELEMENT_KOREAN[dominant];

  const parts: string[] = [];

  parts.push(
    `사주 8글자 중 ${dominant}(${dominantKor}) 기운이 ${balance.counts[dominant]}자리로 가장 두드러집니다.`
  );

  if (balance.missing.length > 0) {
    const missingStr = balance.missing
      .map((e) => `${e}(${ELEMENT_KOREAN[e]})`)
      .join(' · ');
    parts.push(
      `다만 ${missingStr} 기운이 비어 있어, 이를 채워주는 숫자가 오늘 당신에게 특별한 의미를 가집니다.`
    );
  } else {
    const lowest = balance.weakest[0];
    parts.push(
      `오행의 균형이 비교적 고른 편이며, ${lowest}(${ELEMENT_KOREAN[lowest]}) 기운만 살짝 부족합니다.`
    );
  }

  return parts.join(' ');
}

function buildTodayRelationText(analysis: SajuAnalysis): string {
  const { todayPillar, todayStemHangul, todayBranchHangul, todayRelation, todayRelationName, todayRelationMeaning, todayRelationAdvice, dayElement, todayElement } = analysis;
  const todayElementKor = ELEMENT_KOREAN[todayElement];
  const dayElementKor = ELEMENT_KOREAN[dayElement];

  const relationDesc = todayRelation === '비견'
    ? `당신의 일간(${dayElement}, ${dayElementKor})과 같은 기운`
    : todayRelation === '식상'
      ? `당신이 만들어내는 ${todayElement}(${todayElementKor}) 기운`
      : todayRelation === '재성'
        ? `당신이 다스리는 ${todayElement}(${todayElementKor}) 기운`
        : todayRelation === '관성'
          ? `당신을 단련시키는 ${todayElement}(${todayElementKor}) 기운`
          : `당신을 받쳐주는 ${todayElement}(${todayElementKor}) 기운`;

  return `오늘의 일진은 ${todayPillar.stem}${todayPillar.branch}(${todayStemHangul}${todayBranchHangul})일. ${relationDesc}으로, ${todayRelationName} ${todayRelationMeaning} 하루입니다. ${todayRelationAdvice}`;
}

function buildZodiacText(analysis: SajuAnalysis, age: number): string {
  const ageText = age >= 0 ? `만 ${age}세` : '';
  return `${analysis.zodiacAnimal}띠 · ${analysis.birthSeason}에 태어난 ${ageText}.`;
}

function buildNumberReason(
  na: NumberAnalysis,
  analysis: SajuAnalysis,
  rng: () => number,
): { reason: string; tag: NumberInterpretation['tag'] } {
  const { number, element, elementKor, category, matchedPillarLabel, matchedPillar } = na;

  switch (category) {
    case 'compensate': {
      const variants = [
        `사주에 부족한 ${element}(${elementKor}) 기운을 채워주는 보완수입니다.`,
        `당신에게 비어 있던 ${element}(${elementKor})의 자리를 메우는 의미 있는 번호입니다.`,
        `${element}(${elementKor})의 ${ELEMENT_TRAIT[element]} 기운이 오늘 당신에게 필요한 한 조각입니다.`,
        `사주의 빈자리를 살며시 채워주는 ${element}(${elementKor})의 길수입니다.`,
      ];
      return { reason: pickOne(variants, rng), tag: '보완수' };
    }
    case 'support': {
      const variants = [
        `당신의 일간 ${analysis.dayElement}(${ELEMENT_KOREAN[analysis.dayElement]})을 더욱 든든하게 받쳐주는 조력의 번호입니다.`,
        `타고난 ${element}(${elementKor}) 기운을 한 번 더 빛내는 강화수입니다.`,
        `당신의 강점을 더 단단히 만들어주는 ${element}(${elementKor})의 길수입니다.`,
        `이미 풍부한 ${element}(${elementKor}) 기운에 결을 더하는 번호입니다.`,
      ];
      return { reason: pickOne(variants, rng), tag: '조력수' };
    }
    case 'today-match': {
      const variants = [
        `오늘의 일진과 같은 ${element}(${elementKor}) 기운으로, 하루의 흐름과 가장 잘 맞는 번호입니다.`,
        `오늘 흐르는 기운과 동일한 ${element}(${elementKor})의 자리, 시기적절한 길수입니다.`,
        `오늘 하루 당신 주변을 감싸는 ${element}(${elementKor}) 기운이 깃든 번호입니다.`,
      ];
      return { reason: pickOne(variants, rng), tag: '일진수' };
    }
    case 'pillar-match': {
      const variants = [
        `당신의 ${matchedPillarLabel} ${matchedPillar}와 같은 자리에 있는, 가장 사적인 번호입니다.`,
        `사주 ${matchedPillarLabel}(${matchedPillar})의 기운을 그대로 닮은 번호입니다.`,
        `당신의 ${matchedPillarLabel}에 깊이 닿아 있는 ${element}(${elementKor})의 길수입니다.`,
      ];
      return { reason: pickOne(variants, rng), tag: '사주수' };
    }
    case 'neutral':
    default: {
      const variants = [
        `${element}(${elementKor})의 ${ELEMENT_TRAIT[element]} 기운이 가만히 흐르는 번호입니다.`,
        `사주 전체의 흐름 속에서 균형을 잡아주는 ${element}(${elementKor})의 자리입니다.`,
        `오늘 당신을 따라다닐 ${element}(${elementKor}) 기운의 길수입니다.`,
        `${element}(${elementKor}) 기운이 잔잔히 머무는 번호입니다.`,
      ];
      return { reason: pickOne(variants, rng), tag: '균형수' };
    }
  }
}

export function renderInterpretation(
  saju: SajuPillars,
  main: LottoNumberMeta[],
  bonus: LottoNumberMeta,
  seed: number,
  birthDate: Date,
  today: Date,
): SajuInterpretation {
  const rng = mulberry32(seed ^ 0xa5a5a5a5);

  const analysis = analyzeSaju(saju, birthDate, today);
  const dayStem = analysis.dayStem;

  const identity = `${pickOne(DAY_STEM_DESCRIPTIONS[dayStem], rng)} 당신`;
  const todayEnergy = pickOne(DAY_STEM_TODAY_ENERGY[dayStem], rng);

  const elementBalanceText = buildBalanceText(analysis);
  const todayRelationText = buildTodayRelationText(analysis);
  const zodiacText = buildZodiacText(analysis, analysis.age);

  const numbers: NumberInterpretation[] = main.map((meta) => {
    const na = analyzeNumber(meta.number, analysis);
    const { reason, tag } = buildNumberReason(na, analysis, rng);
    return { number: meta.number, reason, tag };
  });

  const bonusNa = analyzeNumber(bonus.number, analysis);
  const bonusReasonBase = buildNumberReason(bonusNa, analysis, rng);
  const bonusInterpretation: NumberInterpretation = {
    number: bonus.number,
    reason: `예비된 행운 — ${bonusReasonBase.reason}`,
    tag: bonusReasonBase.tag,
  };

  return {
    identity,
    todayEnergy,
    elementBalanceText,
    todayRelationText,
    zodiacText,
    numbers,
    bonus: bonusInterpretation,
    opener: pickOne(DAILY_FORTUNE_OPENERS, rng),
    closure: pickOne(DAILY_FORTUNE_CLOSURES, rng),
    analysis,
  };
}

export function formatPillar(stem: string, branch: string): string {
  return `${stem}${branch}(${STEM_KOREAN[stem as keyof typeof STEM_KOREAN]}${''})`;
}
