/**
 * 24절기 계산 (12개 節氣만, 月支 경계 결정용)
 *
 * 通用日期公式 (universal day formula):
 *   day = floor(Y * 0.2422 + C) - floor(Y / 4)
 *
 * - 20세기/21세기 상수가 다름
 * - 예외 연도는 corrections 테이블로 보정
 * - 절기 "시각"까지는 안 따짐 (날짜 단위만) — 경계일 출생자는 만세력 사이트와 다를 수 있음
 *
 * 절기 인덱스 (0~11): 입춘, 경칩, 청명, 입하, 망종, 소서, 입추, 백로, 한로, 입동, 대설, 소한
 * 각 절기는 月支 [寅, 卯, 辰, 巳, 午, 未, 申, 酉, 戌, 亥, 子, 丑]의 시작점
 */

export const SOLAR_TERM_NAMES = [
  '입춘', '경칩', '청명', '입하', '망종', '소서',
  '입추', '백로', '한로', '입동', '대설', '소한',
] as const;

export const SOLAR_TERM_MONTH = [
  2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 1,
] as const;

const C_21: number[] = [
  3.87,   // 입춘 Feb
  5.63,   // 경칩 Mar
  4.81,   // 청명 Apr
  5.52,   // 입하 May
  5.678,  // 망종 Jun
  7.108,  // 소서 Jul
  7.5,    // 입추 Aug
  7.646,  // 백로 Sep
  8.318,  // 한로 Oct
  7.438,  // 입동 Nov
  7.18,   // 대설 Dec
  5.4055, // 소한 Jan
];

const C_20: number[] = [
  4.6295, // 입춘
  6.3968, // 경칩
  5.59,   // 청명
  6.3179, // 입하
  6.5417, // 망종
  7.928,  // 소서
  8.35,   // 입추
  8.44,   // 백로
  9.098,  // 한로
  8.218,  // 입동
  7.9,    // 대설
  6.11,   // 소한
];

type CorrectionKey = `${number}-${number}`;
const CORRECTIONS: Record<CorrectionKey, number> = {
  '2026-0': 0,
  '1985-0': 1,
  '2017-11': 1,
  '1982-11': 1,
};

/**
 * 특정 연도의 특정 절기 발생일 계산
 * @param year 양력 연도
 * @param termIndex 0=입춘, 1=경칩, ..., 11=소한
 * @returns 절기 발생 양력 날짜 (UTC 기준 Date)
 */
export function getSolarTermDate(year: number, termIndex: number): Date {
  const month = SOLAR_TERM_MONTH[termIndex];
  const calendarYear = termIndex === 11 ? year + 1 : year;
  const century = calendarYear < 2000 ? 20 : 21;
  const C = century === 21 ? C_21[termIndex] : C_20[termIndex];
  const Y = calendarYear % 100;

  let day = Math.floor(Y * 0.2422 + C) - Math.floor(Y / 4);

  const correctionKey: CorrectionKey = `${calendarYear}-${termIndex}`;
  if (CORRECTIONS[correctionKey] !== undefined) {
    day += CORRECTIONS[correctionKey];
  }

  return new Date(Date.UTC(calendarYear, month - 1, day));
}

/**
 * 입춘 발생일 (해당 연도)
 */
export function getIpchunDate(year: number): Date {
  return getSolarTermDate(year, 0);
}

/**
 * 주어진 날짜의 월지 인덱스 결정
 * 절기 구간에 따라 월지가 정해짐
 * @returns 0=寅, 1=卯, ..., 11=丑
 */
export function getMonthBranchIndex(date: Date): number {
  const year = date.getUTCFullYear();

  const candidates: Array<{ index: number; termDate: Date }> = [];
  for (let i = 0; i < 12; i++) {
    const termYear = i === 11 ? year - 1 : year;
    candidates.push({
      index: i,
      termDate: getSolarTermDate(termYear, i),
    });
  }
  candidates.push({
    index: 11,
    termDate: getSolarTermDate(year, 11),
  });

  candidates.sort((a, b) => a.termDate.getTime() - b.termDate.getTime());

  let monthBranchIndex = 11;
  for (const c of candidates) {
    if (date.getTime() >= c.termDate.getTime()) {
      monthBranchIndex = c.index;
    } else {
      break;
    }
  }
  return monthBranchIndex;
}
