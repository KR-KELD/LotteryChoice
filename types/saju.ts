export type HeavenlyStem =
  | '甲' | '乙' | '丙' | '丁' | '戊'
  | '己' | '庚' | '辛' | '壬' | '癸';

export type EarthlyBranch =
  | '子' | '丑' | '寅' | '卯' | '辰' | '巳'
  | '午' | '未' | '申' | '酉' | '戌' | '亥';

export type Element = '木' | '火' | '土' | '金' | '水';
export type YinYang = '陽' | '陰';

export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  stemElement: Element;
  branchElement: Element;
  stemYinYang: YinYang;
  branchYinYang: YinYang;
}

export interface SajuPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar | null;
}

export interface SajuInput {
  date: Date;
  hour: number | null;
  minute: number | null;
  isLunar?: boolean;
  isLeapMonth?: boolean;
}

export interface LottoNumberMeta {
  number: number;
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  element: Element;
  yinyang: YinYang;
  color: 'yellow' | 'blue' | 'red' | 'gray' | 'green';
}

export interface LottoResult {
  main: LottoNumberMeta[];
  bonus: LottoNumberMeta;
  saju: SajuPillars;
  generatedAt: Date;
  seed: number;
}

export interface UserInput {
  name: string;
  birthDate: string;
  birthHour: number | null;
  birthMinute: number | null;
  gender: 'M' | 'F';
  isLunar: boolean;
  isLeapMonth: boolean;
}
