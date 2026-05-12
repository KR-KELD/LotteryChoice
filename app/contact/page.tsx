import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: '문의 · LotteryChoice',
  description: 'LotteryChoice 운영자에게 문의하거나 피드백을 보낼 수 있는 페이지입니다.',
};

export default function ContactPage() {
  return (
    <PageShell title="문의" subtitle="피드백과 제안은 언제든 환영합니다">
      <h2>어떻게 연락하나요?</h2>
      <p>
        본 서비스는 별도의 회원가입이나 메시지 시스템 없이 운영되고 있습니다.
        문의·제안·오류 신고는 아래 채널로 보내주세요.
      </p>

      <h2>이메일</h2>
      <p>
        <strong>kyhking@gmail.com</strong>
        <br />
        <span className="text-white/60 text-sm">
          (사주 계산 오류, 광고/제휴, 일반 문의 모두 가능합니다)
        </span>
      </p>

      <h2>GitHub Issues</h2>
      <p>
        기술적 버그 신고나 기능 제안은 GitHub 저장소의 Issues 탭을 활용해주세요.
      </p>
      <p>
        <a
          href="https://github.com/KR-KELD/LotteryChoice/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          → GitHub에서 새 이슈 작성하기
        </a>
      </p>

      <h2>어떤 문의를 보내면 좋을까요?</h2>
      <ul>
        <li><strong>사주 계산 오류</strong> — 만세력 사이트와 결과가 다를 경우 (출생 정보 + 비교 사이트 명시)</li>
        <li><strong>UI/UX 개선 제안</strong> — 사용하면서 불편했던 점</li>
        <li><strong>해석 템플릿 제안</strong> — 더 나은 표현이나 새로운 해석 아이디어</li>
        <li><strong>기능 요청</strong> — 추가되었으면 하는 기능</li>
        <li><strong>광고/제휴 문의</strong> — 비즈니스 관련 제안</li>
      </ul>

      <h2>응답 안내</h2>
      <p>
        본 서비스는 개인이 비영리로 운영하고 있어 모든 문의에 즉시 답변드리기 어려울 수
        있습니다. 가급적 일주일 내 회신 드리도록 노력하겠습니다.
      </p>

      <h2>도박 문제 상담</h2>
      <p>
        본 서비스 이용 중 도박 문제가 우려되신다면, 본 서비스가 아닌 전문 기관에 연락해주세요.
      </p>
      <blockquote>
        <strong>한국도박문제예방치유원</strong>
        <br />
        전화: <strong>☎ 1336</strong> (24시간 무료)
        <br />
        웹사이트:{' '}
        <a href="https://www.kcgp.or.kr" target="_blank" rel="noopener noreferrer">
          www.kcgp.or.kr
        </a>
      </blockquote>
    </PageShell>
  );
}
