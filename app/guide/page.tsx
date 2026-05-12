import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: '사주와 행운의 숫자 가이드 · 로또 포춘',
  description: '사주 명리학과 오행, 행운의 숫자에 대한 입문 가이드 모음. 사주 입문자도 부담 없이 읽을 수 있는 안내서입니다.',
};

const guides = [
  {
    href: '/guide/saju',
    title: '사주(四柱)란 무엇인가',
    desc: '입문자를 위한 명리학 기초 — 천간, 지지, 60갑자, 4기둥 8글자',
  },
  {
    href: '/guide/elements',
    title: '오행(五行) 가이드',
    desc: '木 · 火 · 土 · 金 · 水, 다섯 흐름과 상생·상극의 원리',
  },
  {
    href: '/guide/lucky-numbers',
    title: '행운의 숫자, 사주에서 어떻게 찾을까',
    desc: '오행과 숫자의 관계, 일간별 친근한 숫자, 그리고 그 한계',
  },
  {
    href: '/guide/lunar-calendar',
    title: '음력과 양력, 사주는 어느 쪽?',
    desc: '24절기, 입춘 기준, 그리고 가장 많이 묻는 질문에 대한 답',
  },
];

export default function GuideIndexPage() {
  return (
    <PageShell title="사주 가이드" subtitle="명리학 입문, 부담 없이 읽는 안내서">
      <p>
        로또 포춘은 사주 명리학의 기초 개념을 바탕으로 행운의 번호를 추천합니다.
        결과를 더 깊이 즐기시려면 아래 가이드를 가볍게 훑어보세요.
      </p>

      <h2>가이드 목록</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {guides.map((g) => (
          <li
            key={g.href}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              border: '1px solid rgba(230, 185, 77, 0.2)',
              borderRadius: '0.75rem',
              background: 'rgba(10, 8, 32, 0.4)',
            }}
          >
            <Link href={g.href} style={{ textDecoration: 'none' }}>
              <h3 style={{ marginTop: 0, marginBottom: '0.4rem' }}>{g.title}</h3>
              <p style={{ marginBottom: 0, color: 'rgba(255,255,255,0.7)' }}>{g.desc}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p>
        가이드를 다 읽지 않으셔도 괜찮습니다. <a href="/">바로 번호 받기</a>도 가능합니다.
      </p>
    </PageShell>
  );
}
