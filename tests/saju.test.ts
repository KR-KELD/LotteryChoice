import { describe, it, expect } from 'vitest';
import { getSaju, pillarsToString } from '@/lib/saju';
import { getIpchunDate, getMonthBranchIndex } from '@/lib/saju/solar-terms';
import { getHourBranchIndex } from '@/lib/saju/pillars';

describe('solar terms', () => {
  it('returns 입춘 in Feb', () => {
    const date2025 = getIpchunDate(2025);
    expect(date2025.getUTCMonth()).toBe(1);
    expect([3, 4, 5]).toContain(date2025.getUTCDate());
  });

  it('returns 입춘 across centuries', () => {
    const d1990 = getIpchunDate(1990);
    const d2025 = getIpchunDate(2025);
    expect(d1990.getUTCMonth()).toBe(1);
    expect(d2025.getUTCMonth()).toBe(1);
  });
});

describe('hour branch', () => {
  it('子시는 23-01', () => {
    expect(getHourBranchIndex(23, 0)).toBe(0);
    expect(getHourBranchIndex(0, 30)).toBe(0);
    expect(getHourBranchIndex(0, 59)).toBe(0);
  });

  it('丑시는 01-03', () => {
    expect(getHourBranchIndex(1, 0)).toBe(1);
    expect(getHourBranchIndex(2, 59)).toBe(1);
  });

  it('午시는 11-13', () => {
    expect(getHourBranchIndex(11, 0)).toBe(6);
    expect(getHourBranchIndex(12, 30)).toBe(6);
  });

  it('亥시는 21-23', () => {
    expect(getHourBranchIndex(21, 0)).toBe(11);
    expect(getHourBranchIndex(22, 59)).toBe(11);
  });
});

describe('getSaju', () => {
  it('1990-05-15 14:30 양력 → 8글자 사주 반환', () => {
    const saju = getSaju({
      date: new Date(Date.UTC(1990, 4, 15)),
      hour: 14,
      minute: 30,
    });
    const str = pillarsToString(saju);
    expect(str.length).toBe(8);
    expect(saju.year).toBeDefined();
    expect(saju.month).toBeDefined();
    expect(saju.day).toBeDefined();
    expect(saju.hour).toBeDefined();
  });

  it('출생 시각 모름 → 3주만 반환', () => {
    const saju = getSaju({
      date: new Date(Date.UTC(1995, 6, 20)),
      hour: null,
      minute: null,
    });
    expect(saju.hour).toBeNull();
    expect(pillarsToString(saju).length).toBe(6);
  });

  it('입춘 이전 출생자는 전년도 년주 적용', () => {
    const beforeIpchun = getSaju({
      date: new Date(Date.UTC(2000, 0, 15)),
      hour: 12,
      minute: 0,
    });
    const afterIpchun = getSaju({
      date: new Date(Date.UTC(2000, 5, 15)),
      hour: 12,
      minute: 0,
    });
    expect(beforeIpchun.year.stem).not.toBe(afterIpchun.year.stem);
  });

  it('야자시 (23시) 출생자는 다음날 일주', () => {
    const beforeMidnight = getSaju({
      date: new Date(Date.UTC(2020, 0, 1)),
      hour: 22,
      minute: 0,
    });
    const yajaSi = getSaju({
      date: new Date(Date.UTC(2020, 0, 1)),
      hour: 23,
      minute: 30,
    });
    expect(beforeMidnight.day.stem + beforeMidnight.day.branch)
      .not.toBe(yajaSi.day.stem + yajaSi.day.branch);
  });

  it('월지가 절기 따라 결정됨', () => {
    const earlyFeb = getMonthBranchIndex(new Date(Date.UTC(2025, 1, 1)));
    const lateFeb = getMonthBranchIndex(new Date(Date.UTC(2025, 1, 20)));
    expect(earlyFeb).toBe(11);
    expect(lateFeb).toBe(0);
  });

  it('각 기둥은 오행/음양 메타를 포함', () => {
    const saju = getSaju({
      date: new Date(Date.UTC(1988, 7, 8)),
      hour: 9,
      minute: 0,
    });
    expect(['木', '火', '土', '金', '水']).toContain(saju.day.stemElement);
    expect(['陽', '陰']).toContain(saju.day.stemYinYang);
  });
});
