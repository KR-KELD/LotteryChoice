# 🎰 LotteryChoice

사주와 오늘의 기운을 기반으로 행운의 로또 번호 6+1을 추천하는 엔터테인먼트 웹사이트.

> 본 서비스는 엔터테인먼트 목적이며, 로또 당첨을 보장하지 않습니다.

## 기술 스택

- **Next.js 14** (App Router, Static Export)
- **TypeScript** + **Tailwind CSS**
- **korean-lunar-calendar** (음력 변환)
- **Vitest** (테스트)
- **GitHub Pages** + **GitHub Actions** (배포)

## 로컬 실행

```powershell
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

## 테스트

```powershell
npm test
```

## 빌드 (정적 출력)

```powershell
npm run build
```

`out/` 폴더에 정적 사이트가 생성됩니다.

## GitHub Pages 배포

### 1. 저장소 준비
```powershell
git init
git add .
git commit -m "init lotterychoice"
git branch -M main
git remote add origin https://github.com/<USERNAME>/LotteryChoice.git
git push -u origin main
```

### 2. GitHub Pages 활성화
1. GitHub 저장소 → **Settings → Pages**
2. **Source**: `GitHub Actions` 선택

### 3. 자동 배포
`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 워크플로우가 자동 실행되어
`https://<USERNAME>.github.io/LotteryChoice/` 에 배포됩니다.

### 저장소 이름이 다를 때
`next.config.mjs` 의 `repo` 상수를 실제 저장소 이름으로 수정해주세요.

## 폴더 구조

```
.
├── app/                  # Next.js App Router 페이지
├── components/           # React UI 컴포넌트
│   ├── MysticBackground  # 별자리 배경 SVG
│   ├── Bagua             # 팔괘 + 태극 SVG
│   ├── LottoBalls        # 로또공 SVG
│   ├── InputForm         # 입력 폼
│   ├── Interpretation    # 해석 표시
│   └── OrnamentalDivider # 장식선 SVG
├── lib/
│   ├── saju/             # 사주 변환 로직
│   ├── lotto/            # 번호 생성기 (PRNG + 시드)
│   └── interpretation/   # 해석 템플릿
├── types/                # TypeScript 타입
├── tests/                # Vitest 테스트
└── .github/workflows/    # GitHub Actions
```

## 핵심 로직

### 사주 계산
1. **년주**: 입춘 기준 60갑자
2. **월주**: 24절기 + 오자둔법 (五子遁法)
3. **일주**: 1900-01-01 = 甲戌일 기준 일수차
4. **시주**: 시지 + 오자둔법, 야자시(23-01) 적용

### 번호 생성 (결정론적)
```
이름 + 사주 8글자 + 성별 + 출생시각 + 오늘 날짜
  → FNV-1a 해시 → 32bit 시드
  → Mulberry32 PRNG → Fisher-Yates 셔플
  → 1-45 중 6개 + 보너스 1개
```

**같은 사람 + 같은 날 = 같은 번호**, 다음날 = 다른 번호.

## 개인정보

입력하신 모든 정보는 **브라우저 내에서만 처리**되며 서버로 전송되지 않습니다.

## 라이선스

MIT
