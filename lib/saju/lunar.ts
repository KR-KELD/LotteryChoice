import KoreanLunarCalendar from 'korean-lunar-calendar';

export interface SolarDate {
  year: number;
  month: number;
  day: number;
}

/**
 * 음력 → 양력 변환
 * @param year 음력 연도
 * @param month 음력 월 (1-12)
 * @param day 음력 일
 * @param isLeap 윤달 여부
 */
export function lunarToSolar(
  year: number,
  month: number,
  day: number,
  isLeap = false,
): SolarDate {
  const calendar = new KoreanLunarCalendar();
  const ok = calendar.setLunarDate(year, month, day, isLeap);
  if (!ok) {
    throw new Error(`Invalid lunar date: ${year}-${month}-${day} (leap: ${isLeap})`);
  }
  const solar = calendar.getSolarCalendar();
  return {
    year: solar.year,
    month: solar.month,
    day: solar.day,
  };
}

/**
 * 양력 → 음력 변환
 */
export function solarToLunar(year: number, month: number, day: number) {
  const calendar = new KoreanLunarCalendar();
  const ok = calendar.setSolarDate(year, month, day);
  if (!ok) {
    throw new Error(`Invalid solar date: ${year}-${month}-${day}`);
  }
  const lunar = calendar.getLunarCalendar();
  return {
    year: lunar.year,
    month: lunar.month,
    day: lunar.day,
    isLeap: lunar.intercalation,
  };
}
