import type {
  SajuPillars,
  HeavenlyStem,
  EarthlyBranch,
  Element,
  YinYang,
  Pillar,
} from '@/types/saju';
import {
  STEM_ELEMENT,
  BRANCH_ELEMENT,
  STEM_KOREAN,
  BRANCH_KOREAN,
  ELEMENT_KOREAN,
} from './constants';
import { calculatePillars } from './pillars';

const ELEMENTS: Element[] = ['木', '火', '土', '金', '水'];

const GENERATES: Record<Element, Element> = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
};
const OVERCOMES: Record<Element, Element> = {
  '木': '土', '土': '水', '水': '火', '火': '金', '金': '木',
};

export type SimpleRelation = '비견' | '식상' | '재성' | '관성' | '인성';

const RELATION_NAME: Record<SimpleRelation, string> = {
  '비견': '비견(比肩)',
  '식상': '식상(食傷)',
  '재성': '재성(財星)',
  '관성': '관성(官星)',
  '인성': '인성(印星)',
};

const RELATION_MEANING: Record<SimpleRelation, string> = {
  '비견': '자신감과 독립심이 살아나는',
  '식상': '표현력과 재능이 빛나는',
  '재성': '성취와 결실이 다가오는',
  '관성': '책임과 도전을 시험받는',
  '인성': '도움과 가르침을 받는',
};

const RELATION_ADVICE: Record<SimpleRelation, string> = {
  '비견': '오늘은 자기 신뢰가 가장 큰 무기입니다. 흔들리지 마세요.',
  '식상': '오늘 떠오르는 아이디어를 흘려보내지 마세요. 한 번 표현해보세요.',
  '재성': '욕심내기보다 정성껏 마무리하는 자세가 결실로 이어집니다.',
  '관성': '서두르지 말고 차분히. 단단함이 길을 엽니다.',
  '인성': '겸손히 듣고 배우는 자리에서 행운이 다가옵니다.',
};

const ZODIAC: Record<EarthlyBranch, { animal: string; hangul: string }> = {
  '子': { animal: '쥐', hangul: '자' },
  '丑': { animal: '소', hangul: '축' },
  '寅': { animal: '호랑이', hangul: '인' },
  '卯': { animal: '토끼', hangul: '묘' },
  '辰': { animal: '용', hangul: '진' },
  '巳': { animal: '뱀', hangul: '사' },
  '午': { animal: '말', hangul: '오' },
  '未': { animal: '양', hangul: '미' },
  '申': { animal: '원숭이', hangul: '신' },
  '酉': { animal: '닭', hangul: '유' },
  '戌': { animal: '개', hangul: '술' },
  '亥': { animal: '돼지', hangul: '해' },
};

const MONTH_SEASON: Record<EarthlyBranch, string> = {
  '寅': '초봄', '卯': '봄', '辰': '늦봄',
  '巳': '초여름', '午': '여름', '未': '늦여름',
  '申': '초가을', '酉': '가을', '戌': '늦가을',
  '亥': '초겨울', '子': '겨울', '丑': '늦겨울',
};

export function getRelation(self: Element, other: Element): SimpleRelation {
  if (self === other) return '비견';
  if (GENERATES[other] === self) return '인성';
  if (GENERATES[self] === other) return '식상';
  if (OVERCOMES[other] === self) return '관성';
  if (OVERCOMES[self] === other) return '재성';
  throw new Error(`Invalid element relation: ${self} vs ${other}`);
}

export interface ElementBalance {
  counts: Record<Element, number>;
  strongest: Element[];
  weakest: Element[];
  missing: Element[];
  total: number;
}

function countElements(pillars: SajuPillars): ElementBalance {
  const counts: Record<Element, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };

  const pillarList: Pillar[] = [pillars.year, pillars.month, pillars.day];
  if (pillars.hour) pillarList.push(pillars.hour);

  for (const p of pillarList) {
    counts[STEM_ELEMENT[p.stem]] += 1;
    counts[BRANCH_ELEMENT[p.branch]] += 1;
  }

  const total = pillarList.length * 2;
  const max = Math.max(...Object.values(counts));
  const min = Math.min(...Object.values(counts));

  return {
    counts,
    strongest: ELEMENTS.filter((e) => counts[e] === max),
    weakest: ELEMENTS.filter((e) => counts[e] === min),
    missing: ELEMENTS.filter((e) => counts[e] === 0),
    total,
  };
}

export interface SajuAnalysis {
  balance: ElementBalance;
  dayStem: HeavenlyStem;
  dayElement: Element;
  dayYinyang: YinYang;
  dayHangul: string;
  pillarStems: HeavenlyStem[];
  pillarBranches: EarthlyBranch[];
  zodiacAnimal: string;
  zodiacBranch: EarthlyBranch;
  birthSeason: string;
  todayPillar: Pillar;
  todayStemHangul: string;
  todayBranchHangul: string;
  todayElement: Element;
  todayRelation: SimpleRelation;
  todayRelationName: string;
  todayRelationMeaning: string;
  todayRelationAdvice: string;
  age: number;
}

export function analyzeSaju(
  pillars: SajuPillars,
  birthDate: Date,
  today: Date,
): SajuAnalysis {
  const balance = countElements(pillars);

  const stems = [pillars.year.stem, pillars.month.stem, pillars.day.stem];
  const branches = [pillars.year.branch, pillars.month.branch, pillars.day.branch];
  if (pillars.hour) {
    stems.push(pillars.hour.stem);
    branches.push(pillars.hour.branch);
  }

  const todayPillars = calculatePillars(
    new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())),
    12,
    0,
  );
  const todayPillar = todayPillars.day;
  const todayElement = STEM_ELEMENT[todayPillar.stem];

  const dayElement = STEM_ELEMENT[pillars.day.stem];
  const todayRelation = getRelation(dayElement, todayElement);

  const zodiac = ZODIAC[pillars.year.branch];
  const season = MONTH_SEASON[pillars.month.branch];

  const age = computeKoreanAge(birthDate, today);

  return {
    balance,
    dayStem: pillars.day.stem,
    dayElement,
    dayYinyang: pillars.day.stemYinYang,
    dayHangul: STEM_KOREAN[pillars.day.stem],
    pillarStems: stems,
    pillarBranches: branches,
    zodiacAnimal: zodiac.animal,
    zodiacBranch: pillars.year.branch,
    birthSeason: season,
    todayPillar,
    todayStemHangul: STEM_KOREAN[todayPillar.stem],
    todayBranchHangul: BRANCH_KOREAN[todayPillar.branch],
    todayElement,
    todayRelation,
    todayRelationName: RELATION_NAME[todayRelation],
    todayRelationMeaning: RELATION_MEANING[todayRelation],
    todayRelationAdvice: RELATION_ADVICE[todayRelation],
    age,
  };
}

function computeKoreanAge(birth: Date, today: Date): number {
  let age = today.getFullYear() - birth.getUTCFullYear();
  const birthMonth = birth.getUTCMonth();
  const birthDay = birth.getUTCDate();
  const tm = today.getMonth();
  const td = today.getDate();
  if (tm < birthMonth || (tm === birthMonth && td < birthDay)) age -= 1;
  return age;
}

export type NumberCategory =
  | 'compensate'
  | 'support'
  | 'today-match'
  | 'pillar-match'
  | 'neutral';

export interface NumberAnalysis {
  number: number;
  element: Element;
  elementKor: string;
  category: NumberCategory;
  matchedPillarLabel?: string;
  matchedPillar?: string;
}

const NUMBER_TO_STEM: HeavenlyStem[] = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸',
];
const NUMBER_TO_BRANCH: EarthlyBranch[] = [
  '子', '丑', '寅', '卯', '辰', '巳',
  '午', '未', '申', '酉', '戌', '亥',
];
const PILLAR_LABELS = ['년주', '월주', '일주', '시주'];

export function analyzeNumber(
  num: number,
  analysis: SajuAnalysis,
): NumberAnalysis {
  const stem = NUMBER_TO_STEM[(num - 1) % 10];
  const branch = NUMBER_TO_BRANCH[(num - 1) % 12];
  const element = STEM_ELEMENT[stem];

  let category: NumberCategory = 'neutral';
  let matchedPillarLabel: string | undefined;
  let matchedPillar: string | undefined;

  const stemIdx = analysis.pillarStems.indexOf(stem);
  const branchIdx = analysis.pillarBranches.indexOf(branch);
  if (stemIdx !== -1) {
    category = 'pillar-match';
    matchedPillarLabel = PILLAR_LABELS[stemIdx];
    matchedPillar = analysis.pillarStems[stemIdx] + analysis.pillarBranches[stemIdx];
  } else if (branchIdx !== -1) {
    category = 'pillar-match';
    matchedPillarLabel = PILLAR_LABELS[branchIdx];
    matchedPillar = analysis.pillarStems[branchIdx] + analysis.pillarBranches[branchIdx];
  } else if (analysis.balance.missing.includes(element)) {
    category = 'compensate';
  } else if (analysis.balance.weakest.includes(element) && analysis.balance.counts[element] <= 1) {
    category = 'compensate';
  } else if (element === analysis.todayElement) {
    category = 'today-match';
  } else if (element === analysis.dayElement) {
    category = 'support';
  } else if (analysis.balance.strongest.includes(element)) {
    category = 'support';
  }

  return {
    number: num,
    element,
    elementKor: ELEMENT_KOREAN[element],
    category,
    matchedPillarLabel,
    matchedPillar,
  };
}

export { ELEMENT_KOREAN } from './constants';
