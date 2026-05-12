import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: '사주(四柱)란 무엇인가 · 로또 포춘',
  description: '사주명리학의 기초 — 천간과 지지, 60갑자, 4기둥 8글자가 무엇을 의미하는지 입문자도 이해할 수 있도록 설명합니다.',
  keywords: ['사주', '사주풀이', '명리학', '천간', '지지', '60갑자', '4기둥'],
};

export default function SajuGuidePage() {
  return (
    <PageShell title="사주(四柱)란 무엇인가" subtitle="입문자를 위한 명리학의 기초">
      <h2>한 사람의 시간을 8글자로</h2>
      <p>
        사주(四柱)는 글자 그대로 &ldquo;네 개의 기둥&rdquo;을 의미합니다. 한 사람이 태어난
        <strong> 년·월·일·시</strong>를 각각 하나의 기둥으로 보고, 각 기둥마다 천간(天干) 한 글자와
        지지(地支) 한 글자를 짝지어, 총 <strong>여덟 글자</strong>로 표현합니다. 그래서 사주를
        &ldquo;팔자(八字)&rdquo;라고도 부릅니다.
      </p>

      <h2>천간(天干) 10가지</h2>
      <p>하늘의 기운을 나타내는 10개의 글자입니다.</p>
      <table>
        <thead>
          <tr><th>한자</th><th>한글</th><th>오행</th><th>음양</th></tr>
        </thead>
        <tbody>
          <tr><td>甲</td><td>갑</td><td>木 (목)</td><td>양</td></tr>
          <tr><td>乙</td><td>을</td><td>木 (목)</td><td>음</td></tr>
          <tr><td>丙</td><td>병</td><td>火 (화)</td><td>양</td></tr>
          <tr><td>丁</td><td>정</td><td>火 (화)</td><td>음</td></tr>
          <tr><td>戊</td><td>무</td><td>土 (토)</td><td>양</td></tr>
          <tr><td>己</td><td>기</td><td>土 (토)</td><td>음</td></tr>
          <tr><td>庚</td><td>경</td><td>金 (금)</td><td>양</td></tr>
          <tr><td>辛</td><td>신</td><td>金 (금)</td><td>음</td></tr>
          <tr><td>壬</td><td>임</td><td>水 (수)</td><td>양</td></tr>
          <tr><td>癸</td><td>계</td><td>水 (수)</td><td>음</td></tr>
        </tbody>
      </table>

      <h2>지지(地支) 12가지</h2>
      <p>땅의 기운을 나타내는 12개의 글자로, 우리에게 익숙한 12지신과도 연결됩니다.</p>
      <table>
        <thead>
          <tr><th>한자</th><th>한글</th><th>띠</th><th>시간</th></tr>
        </thead>
        <tbody>
          <tr><td>子</td><td>자</td><td>쥐</td><td>23~01시</td></tr>
          <tr><td>丑</td><td>축</td><td>소</td><td>01~03시</td></tr>
          <tr><td>寅</td><td>인</td><td>호랑이</td><td>03~05시</td></tr>
          <tr><td>卯</td><td>묘</td><td>토끼</td><td>05~07시</td></tr>
          <tr><td>辰</td><td>진</td><td>용</td><td>07~09시</td></tr>
          <tr><td>巳</td><td>사</td><td>뱀</td><td>09~11시</td></tr>
          <tr><td>午</td><td>오</td><td>말</td><td>11~13시</td></tr>
          <tr><td>未</td><td>미</td><td>양</td><td>13~15시</td></tr>
          <tr><td>申</td><td>신</td><td>원숭이</td><td>15~17시</td></tr>
          <tr><td>酉</td><td>유</td><td>닭</td><td>17~19시</td></tr>
          <tr><td>戌</td><td>술</td><td>개</td><td>19~21시</td></tr>
          <tr><td>亥</td><td>해</td><td>돼지</td><td>21~23시</td></tr>
        </tbody>
      </table>

      <h2>60갑자(六十甲子)</h2>
      <p>
        천간 10개와 지지 12개를 짝짓는데, 양과 양끼리 / 음과 음끼리만 만납니다.
        그래서 짝의 종류가 60가지가 나옵니다. 이 60개의 조합을 <strong>60갑자</strong>라고 하며,
        &ldquo;갑자(甲子)&rdquo;로 시작해 60년·60일마다 한 바퀴를 돕니다.
      </p>
      <p>
        흔히 &ldquo;환갑(還甲)&rdquo;이라 부르는 60세 생일은, 태어난 해의 갑자가 다시 돌아왔다는
        뜻입니다.
      </p>

      <h2>4기둥(四柱) 만들기</h2>
      <ol>
        <li>
          <strong>년주(年柱)</strong> — 태어난 해의 60갑자. 단, 양력 새해가 아니라
          <strong> 입춘(立春, 약 2월 4일)</strong>을 한 해의 시작으로 봅니다.
          입춘 전에 태어났다면 전년도 년주를 사용합니다.
        </li>
        <li>
          <strong>월주(月柱)</strong> — 24절기 중 12개의 &ldquo;절기(節氣)&rdquo;를 경계로
          월지(月支)가 정해집니다. 양력 월과는 다릅니다. 월간(月干)은 년간(年干)에 따라
          <strong> 오자둔법(五子遁法)</strong> 공식으로 산출합니다.
        </li>
        <li>
          <strong>일주(日柱)</strong> — 태어난 날짜의 60갑자. 기준일에서 며칠이 지났는지로
          계산합니다.
        </li>
        <li>
          <strong>시주(時柱)</strong> — 태어난 시각의 12시진. 시지(時支)는 표 그대로 결정되고,
          시간(時干)은 일간(日干)에 따라 오자둔법으로 정합니다.
        </li>
      </ol>

      <h2>예시: 1990년 5월 15일 14시 30분 (양력)</h2>
      <blockquote>
        년주 <strong>庚午(경오)</strong> · 월주 <strong>辛巳(신사)</strong>
        <br />
        일주 <strong>庚辰(경진)</strong> · 시주 <strong>癸未(계미)</strong>
      </blockquote>
      <p>
        이 사람은 일간이 庚(경)金, 즉 단단한 금속의 기운을 타고난 사람입니다.
        결단력과 명예를 중시하는 성향으로 해석되곤 합니다.
      </p>

      <h2>사주의 의미와 한계</h2>
      <p>
        사주명리학은 동양 문화권에서 오랫동안 쌓여온 인간 이해의 한 방식입니다.
        타고난 기질을 살피고 시기를 가늠하는 도구로 사용되어 왔으나,{' '}
        <strong>운명을 결정짓는 절대적 예언</strong>이 아닙니다.
        결국 사주는 &ldquo;바람의 방향을 알려주는 깃발&rdquo;에 가깝지, 배의 항로를 강제하지는 않습니다.
      </p>

      <p>
        본 사이트의 <a href="/">로또 포춘</a>은 이러한 사주의 기운을 가볍게 빌려와,
        오늘 하루의 분위기와 함께 즐길 수 있는 <strong>엔터테인먼트 콘텐츠</strong>로 제공됩니다.
      </p>
    </PageShell>
  );
}
