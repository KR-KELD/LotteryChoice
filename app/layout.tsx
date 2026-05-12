import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '로또 포춘 · 사주로 보는 행운의 번호',
  description: '당신의 사주와 오늘의 기운이 들려주는 행운의 로또 번호. 엔터테인먼트 목적.',
  keywords: ['로또', '사주', '운세', '행운', '번호 생성', '로또번호', '사주풀이'],
  openGraph: {
    title: '로또 포춘 · 사주로 보는 행운의 번호',
    description: '당신의 사주와 오늘의 기운이 들려주는 행운의 로또 번호',
    type: 'website',
    locale: 'ko_KR',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0820',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
