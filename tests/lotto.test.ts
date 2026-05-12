import { describe, it, expect } from 'vitest';
import { generateLotto } from '@/lib/lotto/generator';
import type { UserInput } from '@/types/saju';

const baseUser: UserInput = {
  name: '홍길동',
  birthDate: '1990-05-15',
  birthHour: 14,
  birthMinute: 30,
  gender: 'M',
  isLunar: false,
  isLeapMonth: false,
};

describe('generateLotto', () => {
  it('returns 6 main + 1 bonus number', () => {
    const r = generateLotto(baseUser, new Date('2026-05-12'));
    expect(r.main.length).toBe(6);
    expect(r.bonus).toBeDefined();
  });

  it('all numbers are within 1-45', () => {
    const r = generateLotto(baseUser, new Date('2026-05-12'));
    const all = [...r.main.map((m) => m.number), r.bonus.number];
    all.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(45);
    });
  });

  it('all numbers are unique', () => {
    const r = generateLotto(baseUser, new Date('2026-05-12'));
    const all = [...r.main.map((m) => m.number), r.bonus.number];
    const unique = new Set(all);
    expect(unique.size).toBe(7);
  });

  it('main numbers are sorted ascending', () => {
    const r = generateLotto(baseUser, new Date('2026-05-12'));
    const nums = r.main.map((m) => m.number);
    const sorted = [...nums].sort((a, b) => a - b);
    expect(nums).toEqual(sorted);
  });

  it('same input + same day → same result (determinism)', () => {
    const today = new Date('2026-05-12');
    const r1 = generateLotto(baseUser, today);
    const r2 = generateLotto(baseUser, today);
    expect(r1.main.map((m) => m.number)).toEqual(r2.main.map((m) => m.number));
    expect(r1.bonus.number).toBe(r2.bonus.number);
  });

  it('different day → different result', () => {
    const r1 = generateLotto(baseUser, new Date('2026-05-12'));
    const r2 = generateLotto(baseUser, new Date('2026-05-13'));
    const set1 = JSON.stringify(r1.main.map((m) => m.number));
    const set2 = JSON.stringify(r2.main.map((m) => m.number));
    expect(set1).not.toBe(set2);
  });

  it('different name → different result (same DOB)', () => {
    const today = new Date('2026-05-12');
    const r1 = generateLotto({ ...baseUser, name: '홍길동' }, today);
    const r2 = generateLotto({ ...baseUser, name: '김철수' }, today);
    expect(JSON.stringify(r1.main.map((m) => m.number)))
      .not.toBe(JSON.stringify(r2.main.map((m) => m.number)));
  });

  it('different gender → different result', () => {
    const today = new Date('2026-05-12');
    const r1 = generateLotto({ ...baseUser, gender: 'M' }, today);
    const r2 = generateLotto({ ...baseUser, gender: 'F' }, today);
    expect(JSON.stringify(r1.main.map((m) => m.number)))
      .not.toBe(JSON.stringify(r2.main.map((m) => m.number)));
  });

  it('each number has element + yinyang metadata', () => {
    const r = generateLotto(baseUser, new Date('2026-05-12'));
    r.main.forEach((m) => {
      expect(['木', '火', '土', '金', '水']).toContain(m.element);
      expect(['陽', '陰']).toContain(m.yinyang);
      expect(['yellow', 'blue', 'red', 'gray', 'green']).toContain(m.color);
    });
  });
});
