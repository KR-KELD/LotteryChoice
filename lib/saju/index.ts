import type { SajuPillars, SajuInput } from '@/types/saju';
import { calculatePillars } from './pillars';
import { lunarToSolar } from './lunar';

/**
 * 사주 계산 메인 API
 *
 * @example
 * const saju = getSaju({
 *   date: new Date('1990-05-15'),
 *   hour: 14,
 *   minute: 30,
 *   isLunar: false,
 * });
 */
export function getSaju(input: SajuInput): SajuPillars {
  let effectiveDate = input.date;

  if (input.isLunar) {
    const solar = lunarToSolar(
      input.date.getUTCFullYear(),
      input.date.getUTCMonth() + 1,
      input.date.getUTCDate(),
      input.isLeapMonth ?? false,
    );
    effectiveDate = new Date(Date.UTC(solar.year, solar.month - 1, solar.day));
  }

  return calculatePillars(effectiveDate, input.hour, input.minute);
}

/**
 * 사주 8글자 문자열 (해시용)
 */
export function pillarsToString(pillars: SajuPillars): string {
  const parts = [
    pillars.year.stem + pillars.year.branch,
    pillars.month.stem + pillars.month.branch,
    pillars.day.stem + pillars.day.branch,
  ];
  if (pillars.hour) {
    parts.push(pillars.hour.stem + pillars.hour.branch);
  }
  return parts.join('');
}

export * from './constants';
export * from './pillars';
export * from './solar-terms';
export * from './lunar';
