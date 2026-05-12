import type { SajuPillars, UserInput } from '@/types/saju';
import { pillarsToString } from '@/lib/saju';

/**
 * FNV-1a 32bit 해시 — Web Crypto 비동기 회피용 동기 해시
 * SHA-256보다 약하지만 시드 분산에는 충분
 */
function fnv1a32(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

/**
 * 사주 + 사용자 정보 + 날짜를 혼합해 32bit 시드 생성
 *
 * 시드 입력 요소:
 *  - 이름 (다양성의 핵심)
 *  - 사주 8글자
 *  - 성별
 *  - 출생 시각 (시:분)
 *  - 오늘 날짜
 *
 * 결과:
 *  - 같은 사람, 같은 날 → 같은 시드 (결정론)
 *  - 이름만 바꿔도 완전히 다른 결과
 *  - 다음 날 → 다른 결과
 */
export function buildSeed(
  saju: SajuPillars,
  user: UserInput,
  today: Date,
): number {
  const sajuStr = pillarsToString(saju);
  const hourStr = user.birthHour !== null
    ? `${String(user.birthHour).padStart(2, '0')}:${String(user.birthMinute ?? 0).padStart(2, '0')}`
    : 'unknown';

  const components = [
    user.name.trim().normalize('NFC'),
    sajuStr,
    user.gender,
    hourStr,
    formatDate(today),
  ];

  return fnv1a32(components.join('|'));
}

export { fnv1a32, formatDate };
