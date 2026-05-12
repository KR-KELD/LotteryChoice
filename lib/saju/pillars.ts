import type {
  HeavenlyStem,
  EarthlyBranch,
  Pillar,
  SajuPillars,
} from '@/types/saju';
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  MONTH_BRANCH_BY_SOLAR_TERM,
  MONTH_STEM_START,
  HOUR_STEM_START,
  REFERENCE_DAY,
  buildPillar,
} from './constants';
import { getIpchunDate, getMonthBranchIndex } from './solar-terms';

/**
 * 60갑자 인덱스 → Pillar
 */
function sexagenaryToPillar(index: number): Pillar {
  const stem = HEAVENLY_STEMS[((index % 10) + 10) % 10];
  const branch = EARTHLY_BRANCHES[((index % 12) + 12) % 12];
  return buildPillar(stem, branch);
}

/**
 * 년주 (입춘 기준)
 */
export function getYearPillar(date: Date): Pillar {
  const year = date.getUTCFullYear();
  const ipchun = getIpchunDate(year);
  const effectiveYear = date.getTime() < ipchun.getTime() ? year - 1 : year;

  const ganjiIndex = ((effectiveYear - 4) % 60 + 60) % 60;
  const stem = HEAVENLY_STEMS[ganjiIndex % 10];
  const branch = EARTHLY_BRANCHES[ganjiIndex % 12];
  return buildPillar(stem, branch);
}

/**
 * 월주 (절기 + 오자둔법)
 */
export function getMonthPillar(date: Date, yearStem: HeavenlyStem): Pillar {
  const monthBranchIndex = getMonthBranchIndex(date);
  const branch = MONTH_BRANCH_BY_SOLAR_TERM[monthBranchIndex];

  const startStem = MONTH_STEM_START[yearStem];
  const startStemIndex = HEAVENLY_STEMS.indexOf(startStem);
  const stemIndex = (startStemIndex + monthBranchIndex) % 10;
  const stem = HEAVENLY_STEMS[stemIndex];

  return buildPillar(stem, branch);
}

/**
 * 일주 (1900-01-01 = 甲戌일 기준, 60갑자 인덱스 10)
 * 야자시 적용 시: 23시 이후는 다음 날 일주
 */
export function getDayPillar(date: Date, hour: number | null): Pillar {
  let effectiveDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  ));

  if (hour !== null && hour >= 23) {
    effectiveDate = new Date(effectiveDate.getTime() + 24 * 60 * 60 * 1000);
  }

  const msDiff = effectiveDate.getTime() - REFERENCE_DAY.date.getTime();
  const dayDiff = Math.round(msDiff / (24 * 60 * 60 * 1000));
  const sexagenaryIndex = ((REFERENCE_DAY.sexagenaryIndex + dayDiff) % 60 + 60) % 60;

  return sexagenaryToPillar(sexagenaryIndex);
}

/**
 * 시간 → 시지 인덱스 (子=0, 丑=1, ... 亥=11)
 * 23:00-00:59 = 子시 (야자시 포함)
 */
export function getHourBranchIndex(hour: number, minute: number): number {
  const totalMinutes = hour * 60 + minute;

  if (totalMinutes >= 23 * 60 || totalMinutes < 60) return 0;

  return Math.floor((totalMinutes - 60) / 120) + 1;
}

/**
 * 시주 (오자둔법)
 */
export function getHourPillar(
  hour: number,
  minute: number,
  dayStem: HeavenlyStem,
): Pillar {
  const branchIndex = getHourBranchIndex(hour, minute);
  const branch = EARTHLY_BRANCHES[branchIndex];

  const startStem = HOUR_STEM_START[dayStem];
  const startStemIndex = HEAVENLY_STEMS.indexOf(startStem);
  const stemIndex = (startStemIndex + branchIndex) % 10;
  const stem = HEAVENLY_STEMS[stemIndex];

  return buildPillar(stem, branch);
}

/**
 * 메인 사주 계산
 */
export function calculatePillars(
  date: Date,
  hour: number | null,
  minute: number | null,
): SajuPillars {
  const yearPillar = getYearPillar(date);
  const monthPillar = getMonthPillar(date, yearPillar.stem);
  const dayPillar = getDayPillar(date, hour);
  const hourPillar = hour !== null && minute !== null
    ? getHourPillar(hour, minute, dayPillar.stem)
    : null;

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
  };
}
