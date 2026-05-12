import type { HeavenlyStem, EarthlyBranch, Element, YinYang } from '@/types/saju';

export const HEAVENLY_STEMS: HeavenlyStem[] = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸',
];

export const EARTHLY_BRANCHES: EarthlyBranch[] = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥',
];

export const STEM_KOREAN: Record<HeavenlyStem, string> = {
  '甲': '갑', '乙': '을', '丙': '병', '丁': '정', '戊': '무',
  '己': '기', '庚': '경', '辛': '신', '壬': '임', '癸': '계',
};

export const BRANCH_KOREAN: Record<EarthlyBranch, string> = {
  '子': '자', '丑': '축', '寅': '인', '卯': '묘', '辰': '진', '巳': '사',
  '午': '오', '未': '미', '申': '신', '酉': '유', '戌': '술', '亥': '해',
};

export const STEM_ELEMENT: Record<HeavenlyStem, Element> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};

export const BRANCH_ELEMENT: Record<EarthlyBranch, Element> = {
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '辰': '土', '丑': '土', '戌': '土', '未': '土',
  '申': '金', '酉': '金',
  '亥': '水', '子': '水',
};

export const STEM_YINYANG: Record<HeavenlyStem, YinYang> = {
  '甲': '陽', '丙': '陽', '戊': '陽', '庚': '陽', '壬': '陽',
  '乙': '陰', '丁': '陰', '己': '陰', '辛': '陰', '癸': '陰',
};

export const BRANCH_YINYANG: Record<EarthlyBranch, YinYang> = {
  '子': '陽', '寅': '陽', '辰': '陽', '午': '陽', '申': '陽', '戌': '陽',
  '丑': '陰', '卯': '陰', '巳': '陰', '未': '陰', '酉': '陰', '亥': '陰',
};

export const ELEMENT_KOREAN: Record<Element, string> = {
  '木': '목', '火': '화', '土': '토', '金': '금', '水': '수',
};

export const ELEMENT_COLOR: Record<Element, string> = {
  '木': '청', '火': '적', '土': '황', '金': '백', '水': '흑',
};

export const MONTH_BRANCH_BY_SOLAR_TERM: EarthlyBranch[] = [
  '寅', '卯', '辰', '巳', '午', '未',
  '申', '酉', '戌', '亥', '子', '丑',
];

export const MONTH_STEM_START: Record<HeavenlyStem, HeavenlyStem> = {
  '甲': '丙', '己': '丙',
  '乙': '戊', '庚': '戊',
  '丙': '庚', '辛': '庚',
  '丁': '壬', '壬': '壬',
  '戊': '甲', '癸': '甲',
};

export const HOUR_STEM_START: Record<HeavenlyStem, HeavenlyStem> = {
  '甲': '甲', '己': '甲',
  '乙': '丙', '庚': '丙',
  '丙': '戊', '辛': '戊',
  '丁': '庚', '壬': '庚',
  '戊': '壬', '癸': '壬',
};

export const REFERENCE_DAY = {
  date: new Date(Date.UTC(1900, 0, 1)),
  stem: '甲' as HeavenlyStem,
  branch: '戌' as EarthlyBranch,
  sexagenaryIndex: 10,
};

export function buildPillar(
  stem: HeavenlyStem,
  branch: EarthlyBranch,
) {
  return {
    stem,
    branch,
    stemElement: STEM_ELEMENT[stem],
    branchElement: BRANCH_ELEMENT[branch],
    stemYinYang: STEM_YINYANG[stem],
    branchYinYang: BRANCH_YINYANG[branch],
  };
}
