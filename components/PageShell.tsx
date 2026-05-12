import Link from 'next/link';
import MysticBackground from './MysticBackground';
import OrnamentalDivider from './OrnamentalDivider';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageShell({ title, subtitle, children }: Props) {
  return (
    <>
      <MysticBackground />
      <main className="relative min-h-screen w-full">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <nav className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-gold-gradient hover:opacity-90 transition tracking-tight"
            >
              LotteryChoice
            </Link>
            <Link
              href="/"
              className="text-xs sm:text-sm text-gold-400/80 hover:text-gold-400 transition"
            >
              ← 홈으로
            </Link>
          </nav>

          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gold-gradient leading-tight tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-white/70">{subtitle}</p>
            )}
            <OrnamentalDivider className="mt-5" />
          </header>

          <article className="card-mystic rounded-2xl p-6 sm:p-8 prose-mystic">
            {children}
          </article>

          <SiteFooter />
        </div>
      </main>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-12 pt-8 border-t border-gold-400/15 text-center text-xs text-white/50 leading-relaxed">
      <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-white/60">
        <Link href="/about" className="hover:text-gold-400 transition">소개</Link>
        <Link href="/guide/saju" className="hover:text-gold-400 transition">사주 개론</Link>
        <Link href="/guide/elements" className="hover:text-gold-400 transition">오행 가이드</Link>
        <Link href="/privacy" className="hover:text-gold-400 transition">개인정보</Link>
        <Link href="/terms" className="hover:text-gold-400 transition">이용약관</Link>
        <Link href="/contact" className="hover:text-gold-400 transition">문의</Link>
      </div>
      <p className="mb-2">
        본 서비스는 <span className="text-gold-400/80">엔터테인먼트 목적</span>으로 제공되며,
        로또 당첨을 보장하지 않습니다.
      </p>
      <p className="mb-2">19세 미만은 로또 구매가 불가합니다.</p>
      <p className="text-white/40">
        도박 문제 상담: <span className="text-gold-400/70">한국도박문제예방치유원 ☎ 1336</span>
      </p>
      <p className="mt-4 text-white/30 text-[10px]">
        © 2026 LotteryChoice · 입력 정보는 서버로 전송되지 않습니다
      </p>
    </footer>
  );
}
