import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: '오행(五行) 가이드 — 木火土金水 · LotteryChoice',
  description: '동양 사상의 핵심인 오행(목·화·토·금·수)이 무엇이며 사주와 일상에 어떻게 적용되는지 정리한 입문서입니다.',
  keywords: ['오행', '목화토금수', '상생상극', '사주 오행', '음양오행'],
};

export default function ElementsGuidePage() {
  return (
    <PageShell title="오행(五行) 가이드" subtitle="木 · 火 · 土 · 金 · 水, 다섯 흐름의 이야기">
      <h2>오행이란?</h2>
      <p>
        오행은 우주 만물을 구성하는 다섯 가지 기운,{' '}
        <strong>나무(木) · 불(火) · 흙(土) · 쇠(金) · 물(水)</strong>을 말합니다.
        실제 물질이라기보다는 &ldquo;다섯 가지 운동의 양상&rdquo;에 가깝습니다.
        뻗어나가는 기운(木), 타오르는 기운(火), 머무는 기운(土), 갈무리하는 기운(金), 흐르는 기운(水) —
        이렇게 다섯 결로 세상의 변화를 읽습니다.
      </p>

      <h2>다섯 기운의 특성</h2>
      <table>
        <thead>
          <tr>
            <th>오행</th>
            <th>상징</th>
            <th>계절</th>
            <th>방향</th>
            <th>색</th>
            <th>키워드</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>木 (목)</td><td>나무</td><td>봄</td><td>동쪽</td><td>청(靑)</td><td>성장, 도약</td></tr>
          <tr><td>火 (화)</td><td>불</td><td>여름</td><td>남쪽</td><td>적(赤)</td><td>열정, 광명</td></tr>
          <tr><td>土 (토)</td><td>흙</td><td>환절기</td><td>중앙</td><td>황(黃)</td><td>안정, 신뢰</td></tr>
          <tr><td>金 (금)</td><td>쇠</td><td>가을</td><td>서쪽</td><td>백(白)</td><td>결단, 명예</td></tr>
          <tr><td>水 (수)</td><td>물</td><td>겨울</td><td>북쪽</td><td>흑(黑)</td><td>지혜, 흐름</td></tr>
        </tbody>
      </table>

      <h2>상생(相生) — 서로 살리는 흐름</h2>
      <p>
        오행은 끊임없이 순환하면서 서로를 살립니다. 이를 상생(相生)이라 합니다.
      </p>
      <ul>
        <li><strong>木生火</strong> — 나무는 불을 살린다 (불의 땔감이 된다)</li>
        <li><strong>火生土</strong> — 불은 흙을 살린다 (재가 흙이 된다)</li>
        <li><strong>土生金</strong> — 흙은 쇠를 살린다 (흙 속에 광물이 묻혀 있다)</li>
        <li><strong>金生水</strong> — 쇠는 물을 살린다 (차가운 쇠 표면에 물이 맺힌다)</li>
        <li><strong>水生木</strong> — 물은 나무를 살린다 (나무에 물을 준다)</li>
      </ul>

      <h2>상극(相剋) — 서로 견제하는 흐름</h2>
      <p>
        반대로 한쪽이 강하면 다른 한쪽을 누르기도 합니다. 이를 상극(相剋)이라 합니다.
      </p>
      <ul>
        <li><strong>木剋土</strong> — 나무는 흙을 뚫는다</li>
        <li><strong>土剋水</strong> — 흙은 물을 막는다</li>
        <li><strong>水剋火</strong> — 물은 불을 끈다</li>
        <li><strong>火剋金</strong> — 불은 쇠를 녹인다</li>
        <li><strong>金剋木</strong> — 쇠는 나무를 자른다</li>
      </ul>
      <p>
        상극이라고 해서 무조건 나쁜 관계는 아닙니다. 적절한 상극은 오히려 서로를 다듬어주는
        &ldquo;자극&rdquo;이 되기도 합니다. 사주에서도 일간을 적절히 자극하는 글자가
        오히려 큰 성취로 이어진다고 봅니다.
      </p>

      <h2>사주에서의 오행</h2>
      <p>
        사주 8글자에 어떤 오행이 많고 적은지를 살피면, 그 사람의 성향과 보완해야 할 기운을
        가늠할 수 있습니다.
      </p>
      <ul>
        <li><strong>木이 많은 사람</strong> — 진취적이고 추진력이 있으나, 때로 너무 곧아 부러질 수 있음</li>
        <li><strong>火가 많은 사람</strong> — 활기차고 표현력이 풍부하나, 감정 기복이 클 수 있음</li>
        <li><strong>土가 많은 사람</strong> — 신중하고 인내심 있으나, 결정이 느릴 수 있음</li>
        <li><strong>金이 많은 사람</strong> — 의리 있고 결단력 있으나, 융통성이 부족할 수 있음</li>
        <li><strong>水가 많은 사람</strong> — 지혜롭고 사려 깊으나, 때로 우유부단할 수 있음</li>
      </ul>

      <h2>일상에서 오행을 활용하기</h2>
      <p>
        오행은 단순한 점술 도구가 아니라, 균형의 철학입니다. 어떤 기운이 부족하면 일상에서
        보충할 수 있다고 보는데, 예를 들어:
      </p>
      <ul>
        <li><strong>木 보충</strong> — 푸른 식물 가까이 두기, 동쪽 자리 선호</li>
        <li><strong>火 보충</strong> — 따뜻한 조명, 붉은 소품, 남향 공간</li>
        <li><strong>土 보충</strong> — 흙과 가까운 활동(가드닝), 황토색 인테리어</li>
        <li><strong>金 보충</strong> — 금속 장신구, 흰색 옷, 서쪽 자리</li>
        <li><strong>水 보충</strong> — 어항이나 분수, 검정/짙은 파랑 계열, 북쪽 자리</li>
      </ul>

      <p>
        물론 이는 어디까지나 동양 사상의 권유이며, 절대적인 처방은 아닙니다. 즐겁게 받아들이고
        취할 만큼 취하시면 좋겠습니다.
      </p>

      <h2>LotteryChoice에서의 오행</h2>
      <p>
        <a href="/">LotteryChoice</a>은 각 번호에 천간을 매핑하고, 그 천간의 오행을 부여합니다.
        결과 페이지에서 &ldquo;火(화) 기운이 깃든 번호&rdquo;와 같은 해석이 나오는 이유입니다.
        오행의 흐름을 따라 결과를 음미해보세요.
      </p>
    </PageShell>
  );
}
