'use client';

import { useState } from 'react';
import type { UserInput, LottoResult } from '@/types/saju';
import { generateLotto } from '@/lib/lotto/generator';
import { renderInterpretation, type SajuInterpretation } from '@/lib/interpretation/render';
import MysticBackground from '@/components/MysticBackground';
import Bagua from '@/components/Bagua';
import InputForm from '@/components/InputForm';
import LottoBalls from '@/components/LottoBalls';
import Interpretation from '@/components/Interpretation';
import OrnamentalDivider from '@/components/OrnamentalDivider';

type View = 'input' | 'loading' | 'result';

export default function Home() {
  const [view, setView] = useState<View>('input');
  const [result, setResult] = useState<LottoResult | null>(null);
  const [interpretation, setInterpretation] = useState<SajuInterpretation | null>(null);
  const [userName, setUserName] = useState('');

  const handleSubmit = (input: UserInput) => {
    setView('loading');
    setUserName(input.name);

    setTimeout(() => {
      try {
        const today = new Date();
        const r = generateLotto(input, today);
        const birthDate = new Date(input.birthDate + 'T00:00:00Z');
        const interp = renderInterpretation(r.saju, r.main, r.bonus, r.seed, birthDate, today);
        setResult(r);
        setInterpretation(interp);
        setView('result');
      } catch (err) {
        console.error(err);
        alert('번호 생성 중 오류가 발생했습니다. 입력값을 확인해주세요.');
        setView('input');
      }
    }, 1800);
  };

  const handleReset = () => {
    setResult(null);
    setInterpretation(null);
    setView('input');
  };

  return (
    <>
      <MysticBackground />
      <main className="relative min-h-screen w-full">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
          <Header />

          <div className="mt-8">
            {view === 'input' && <InputView onSubmit={handleSubmit} />}
            {view === 'loading' && <LoadingView />}
            {view === 'result' && result && interpretation && (
              <ResultView
                result={result}
                interpretation={interpretation}
                userName={userName}
                onReset={handleReset}
              />
            )}
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
}

function Header() {
  return (
    <header className="text-center">
      <div className="mb-3 inline-flex items-center justify-center">
        <Bagua size={56} />
      </div>
      <h1 className="hanja text-4xl sm:text-5xl font-bold text-gold-gradient leading-tight">
        로또 포춘
      </h1>
      <p className="mt-2 text-sm sm:text-base text-white/70 tracking-wide">
        사주와 오늘의 기운이 알려주는 행운의 번호
      </p>
      <OrnamentalDivider className="mt-5" />
    </header>
  );
}

function InputView({ onSubmit }: { onSubmit: (input: UserInput) => void }) {
  return (
    <div className="card-mystic rounded-2xl p-6 sm:p-8 animate-fade-in-up">
      <p className="text-center text-sm text-white/60 mb-2">
        당신의 사주와 이름을 풀어
        <br className="sm:hidden" />
        오늘의 행운 번호 6개를 찾아드립니다.
      </p>
      <p className="text-center text-xs text-gold-400/60 mb-6">
        ※ 같은 사람·같은 날에는 같은 번호가 나옵니다 (재방문 시 일관성 보장)
      </p>
      <InputForm onSubmit={onSubmit} />
    </div>
  );
}

function LoadingView() {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 animate-fade-in-up"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Bagua size={140} spinning />
      <p className="mt-8 text-gold-400 tracking-widest text-sm animate-glow-pulse">
        사주를 풀고 있습니다…
      </p>
      <div className="mt-2 text-white/50 text-xs tracking-wider" aria-hidden>
        天 · 地 · 人 · 時
      </div>
    </div>
  );
}

function ResultView({
  result,
  interpretation,
  userName,
  onReset,
}: {
  result: LottoResult;
  interpretation: SajuInterpretation;
  userName: string;
  onReset: () => void;
}) {
  const handleShare = async () => {
    const text = `🔮 ${userName}님의 오늘의 행운 번호\n${result.main.map((m) => m.number).join(' · ')} + ${result.bonus.number}\n\n로또 포춘에서 사주로 뽑은 번호입니다.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: '로또 포춘', text });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('결과가 복사되었습니다!');
      } catch {
        alert('공유가 지원되지 않는 환경입니다.');
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up" role="region" aria-live="polite" aria-label="로또 번호 결과">
      <div className="card-mystic rounded-2xl p-6 text-center">
        <p className="text-sm text-gold-400/80 tracking-widest mb-1">오늘의 행운 번호</p>
        <p className="text-xs text-white/50 mb-6">
          {result.generatedAt.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </p>
        <LottoBalls main={result.main} bonus={result.bonus} />
      </div>

      <Interpretation result={result} interpretation={interpretation} userName={userName} />

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleShare}
          className="rounded-xl border border-gold-400/40 bg-gold-500/10 py-3 text-gold-400 hover:bg-gold-500/20 transition"
        >
          공유하기
        </button>
        <button
          onClick={onReset}
          className="btn-gold rounded-xl py-3"
        >
          다시 뽑기
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-gold-400/15 text-center text-xs text-white/50 leading-relaxed">
      <p className="mb-2">
        본 서비스는 <span className="text-gold-400/80">엔터테인먼트 목적</span>으로 제공되며,
        <br />
        로또 당첨을 보장하지 않습니다.
      </p>
      <p className="mb-2">19세 미만은 로또 구매가 불가합니다.</p>
      <p className="text-white/40">
        도박 문제 상담: <span className="text-gold-400/70">한국도박문제예방치유원 ☎ 1336</span>
      </p>
      <p className="mt-4 text-white/30 text-[10px]">
        © 2026 Lotto Fortune · 입력 정보는 서버로 전송되지 않습니다
      </p>
    </footer>
  );
}
