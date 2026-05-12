import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: '개인정보 처리방침 · LotteryChoice',
  description: 'LotteryChoice은 사용자 입력 정보를 서버로 전송하지 않으며, 어떠한 개인정보도 수집·저장하지 않습니다.',
};

export default function PrivacyPage() {
  return (
    <PageShell title="개인정보 처리방침" subtitle="시행일: 2026년 5월 12일">
      <h2>1. 수집하는 개인정보 항목 및 방법</h2>
      <p>
        <strong>LotteryChoice은 어떠한 개인정보도 서버로 전송하거나 저장하지 않습니다.</strong>
      </p>
      <p>
        사용자가 서비스 이용 중 입력하는 정보(이름 또는 닉네임, 생년월일, 출생 시각, 성별)는
        오로지 사용자의 브라우저 내부(클라이언트 사이드)에서만 사주 계산 및 번호 생성에 사용되며,
        외부 서버로 전송되지 않고 페이지를 닫는 즉시 사라집니다.
      </p>

      <h2>2. 자동 수집되는 정보</h2>
      <p>
        본 사이트는 GitHub Pages 인프라를 통해 제공되며, GitHub Pages가 일반적인 웹 접근 로그
        (IP 주소, User-Agent, 접속 시각 등)를 자동으로 수집할 수 있습니다.
        이는 GitHub의 개인정보 처리방침을 따릅니다 —{' '}
        <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
          GitHub 개인정보 처리방침
        </a>
      </p>

      <h2>3. 광고 및 분석</h2>
      <p>
        본 사이트는 향후 Google AdSense 광고를 게재할 수 있습니다. AdSense는 쿠키를 사용하여
        사용자에게 맞춤형 광고를 제공할 수 있으며, 자세한 내용은{' '}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          Google 광고 정책
        </a>{' '}
        을 참조하세요. 사용자는{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google 광고 설정
        </a>
        에서 맞춤 광고를 거부할 수 있습니다.
      </p>

      <h2>4. 쿠키</h2>
      <p>
        LotteryChoice 자체는 쿠키를 사용하지 않습니다. 다만 위 3항의 광고 서비스가 활성화될 경우,
        Google이 광고 목적의 쿠키를 사용할 수 있습니다.
      </p>

      <h2>5. 이용자 권리</h2>
      <p>
        본 서비스는 어떠한 개인정보도 저장하지 않으므로, 별도의 정보 열람·정정·삭제 요청 절차가
        필요하지 않습니다. 사용자가 브라우저 캐시 및 쿠키를 삭제하면 모든 흔적이 제거됩니다.
      </p>

      <h2>6. 변경 안내</h2>
      <p>
        본 방침은 서비스 변경 또는 관련 법령 변경에 따라 개정될 수 있으며, 변경 시 본 페이지에
        공지합니다.
      </p>

      <h2>7. 문의</h2>
      <p>
        개인정보 관련 문의는 <a href="/contact">문의 페이지</a>를 통해 접수해주세요.
      </p>
    </PageShell>
  );
}
