'use client';

import { useState } from 'react';
import type { UserInput } from '@/types/saju';

interface Props {
  onSubmit: (input: UserInput) => void;
}

export default function InputForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [knowHour, setKnowHour] = useState(true);
  const [birthHour, setBirthHour] = useState('12');
  const [birthMinute, setBirthMinute] = useState('00');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [isLunar, setIsLunar] = useState(false);
  const [isLeapMonth, setIsLeapMonth] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !birthDate) return;
    onSubmit({
      name: name.trim(),
      birthDate,
      birthHour: knowHour ? parseInt(birthHour, 10) : null,
      birthMinute: knowHour ? parseInt(birthMinute, 10) : null,
      gender,
      isLunar,
      isLeapMonth: isLunar && isLeapMonth,
    });
  };

  const canSubmit = name.trim().length > 0 && birthDate.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="사주 입력 폼">
      <Field label="이름 또는 닉네임" htmlFor="name-input">
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          placeholder="홍길동"
          autoComplete="name"
          className="input-mystic w-full rounded-lg px-4 py-3"
          required
          aria-required="true"
        />
      </Field>

      <Field label="생년월일" htmlFor="birth-date">
        <div className="space-y-2">
          <input
            id="birth-date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            min="1900-01-01"
            max="2099-12-31"
            autoComplete="bday"
            className="input-mystic w-full rounded-lg px-4 py-3"
            required
            aria-required="true"
          />
          <div className="flex gap-4 pl-1 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calendar"
                checked={!isLunar}
                onChange={() => setIsLunar(false)}
                className="accent-gold-500"
              />
              <span>양력</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calendar"
                checked={isLunar}
                onChange={() => setIsLunar(true)}
                className="accent-gold-500"
              />
              <span>음력</span>
            </label>
            {isLunar && (
              <label className="flex items-center gap-2 cursor-pointer text-gold-400">
                <input
                  type="checkbox"
                  checked={isLeapMonth}
                  onChange={(e) => setIsLeapMonth(e.target.checked)}
                  className="accent-gold-500"
                />
                <span>윤달</span>
              </label>
            )}
          </div>
        </div>
      </Field>

      <Field label="출생 시각">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={!knowHour}
              onChange={(e) => setKnowHour(!e.target.checked)}
              className="accent-gold-500"
            />
            <span className="text-gold-400/80">출생 시각을 모릅니다 (시주 생략)</span>
          </label>
          {knowHour && (
            <div className="flex gap-2">
              <select
                value={birthHour}
                onChange={(e) => setBirthHour(e.target.value)}
                className="input-mystic flex-1 rounded-lg px-3 py-3"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={String(i).padStart(2, '0')}>
                    {String(i).padStart(2, '0')}시
                  </option>
                ))}
              </select>
              <select
                value={birthMinute}
                onChange={(e) => setBirthMinute(e.target.value)}
                className="input-mystic flex-1 rounded-lg px-3 py-3"
              >
                {['00', '15', '30', '45'].map((m) => (
                  <option key={m} value={m}>{m}분</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </Field>

      <Field label="성별">
        <div className="grid grid-cols-2 gap-3">
          <GenderButton selected={gender === 'M'} onClick={() => setGender('M')}>남성</GenderButton>
          <GenderButton selected={gender === 'F'} onClick={() => setGender('F')}>여성</GenderButton>
        </div>
      </Field>

      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-gold w-full rounded-xl py-4 text-lg tracking-wider"
      >
        🔮 번호 뽑기
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-gold-400/90 tracking-wide"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function GenderButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg py-3 transition-all ${
        selected
          ? 'bg-gold-500/20 border border-gold-400 text-gold-400'
          : 'input-mystic hover:border-gold-400/50'
      }`}
    >
      {children}
    </button>
  );
}
