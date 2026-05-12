import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://kr-keld.github.io/LotteryChoice';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LotteryChoice · 사주로 보는 행운의 번호',
    template: '%s',
  },
  description: '당신의 사주와 오늘의 기운이 들려주는 행운의 로또 번호 6+1. 엔터테인먼트 목적의 사주 명리학 기반 번호 추천 서비스.',
  keywords: ['로또', '사주', '운세', '행운의 번호', '로또 번호 생성', '사주풀이', '오행', '명리학', '오늘의 운세'],
  authors: [{ name: 'KR-KELD' }],
  creator: 'KR-KELD',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    title: 'LotteryChoice · 사주로 보는 행운의 번호',
    description: '당신의 사주와 오늘의 기운이 들려주는 행운의 로또 번호',
    siteName: 'LotteryChoice',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LotteryChoice · 사주로 보는 행운의 번호',
    description: '당신의 사주와 오늘의 기운이 들려주는 행운의 로또 번호',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0820',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LotteryChoice',
  description: '사주와 오늘의 기운을 풀어 행운의 로또 번호를 추천하는 엔터테인먼트 웹앱',
  url: SITE_URL,
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Any',
  inLanguage: 'ko',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
