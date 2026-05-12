import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: '소개 · LotteryChoice',
  description: 'LotteryChoice은 한국 전통 사주 명리학을 기반으로 행운의 번호를 추천하는 엔터테인먼트 웹사이트입니다.',
};

export default function AboutPage() {
  return (
    <PageShell title="LotteryChoice 소개" subtitle="사주 명리학과 디지털이 만난 자리">
      <h2>한 줄로</h2>
      <p>
        <strong>사주 8글자와 오늘의 기운을 풀어 행운의 로또 번호 6+1을 추천하는</strong>{' '}
        엔터테인먼트 웹사이트입니다.
      </p>

      <h2>어떻게 동작하나요?</h2>
      <p>
        사용자가 입력한 이름·생년월일·출생 시각·성별을 바탕으로, 사주 명리학의 4기둥(년주·월주·일주·시주)을
        계산합니다. 그리고 그 사주 8글자와 오늘 날짜를 혼합해 결정론적 난수 시드를 만들고,
        Mulberry32 PRNG와 Fisher-Yates 셔플을 거쳐 1-45 중 6개와 보너스 1개를 추출합니다.
      </p>
      <p>
        같은 사람이 같은 날 다시 조회하면 같은 번호가 나오고, 다음 날에는 다른 번호가 나옵니다.
        이름이 다르면 같은 생일이라도 다른 번호가 추천됩니다.
      </p>

      <h2>사주를 어떻게 계산하나요?</h2>
      <p>전통 명리학의 일반 보편 방식을 따릅니다.</p>
      <ul>
        <li><strong>년주</strong>: 입춘(立春)을 기준으로 60갑자(甲子)를 적용</li>
        <li><strong>월주</strong>: 24절기 중 12개 절기를 기준으로 월지(月支)를 정하고, 오자둔법(五子遁法)으로 월간(月干)을 산출</li>
        <li><strong>일주</strong>: 1900년 1월 1일(甲戌일)을 기준점으로 한 일수차 계산. 야자시(夜子時, 23-00시) 적용으로 23시 이후 출생은 다음 날 일주로 계산</li>
        <li><strong>시주</strong>: 출생 시각을 12시진으로 환산한 후 오자둔법으로 시간(時干)을 산출</li>
      </ul>
      <p>음력 생일은 한국식 음력 변환 라이브러리를 통해 양력으로 변환 후 동일하게 처리합니다.</p>

      <h2>이 서비스의 신념</h2>
      <ul>
        <li><strong>개인정보 미전송</strong> — 모든 계산은 사용자의 브라우저 안에서만 이루어지며, 서버로 전송되지 않습니다.</li>
        <li><strong>당첨 예측이 아닌 엔터테인먼트</strong> — 결과는 오락 목적이며, 어떠한 금전적 결과도 보장하지 않습니다.</li>
        <li><strong>책임 있는 안내</strong> — 도박 문제가 의심될 경우 한국도박문제예방치유원(☎ 1336)을 안내합니다.</li>
        <li><strong>투명성</strong> — 사주 계산 알고리즘과 번호 생성 로직을 문서화하여 공개합니다.</li>
      </ul>

      <h2>한계와 정직한 고지</h2>
      <ul>
        <li>24절기 계산은 날짜 단위까지만 정확하며, 절기 발생 &ldquo;시각&rdquo;까지는 따지지 않습니다. 경계일에 출생한 경우 일부 전통 만세력과 1일 차이가 날 수 있습니다.</li>
        <li>진태양시(眞太陽時) 보정은 적용하지 않으며, 입력하신 시각을 그대로 사용합니다. 정통 명리학 유파에 따라 결과가 다를 수 있습니다.</li>
        <li>해석 텍스트는 사주 명리학의 일반 개념에 기반한 템플릿이며, 전문 상담을 대체하지 않습니다.</li>
      </ul>

      <h2>오픈소스</h2>
      <p>
        본 서비스는 오픈소스로 개발되며, 소스 코드는{' '}
        <a href="https://github.com/KR-KELD/LotteryChoice" target="_blank" rel="noopener noreferrer">
          GitHub 저장소
        </a>
        에서 확인하실 수 있습니다.
      </p>
    </PageShell>
  );
}
