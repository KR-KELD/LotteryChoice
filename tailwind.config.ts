import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0a0820',
          800: '#0f0c2a',
          700: '#161238',
          600: '#1d1846',
        },
        mystic: {
          purple: '#3a2873',
          violet: '#5e3fb8',
          indigo: '#2a1e5e',
        },
        gold: {
          400: '#f7d774',
          500: '#e6b94d',
          600: '#c89a30',
          glow: '#ffe79a',
        },
        lotto: {
          yellow: '#fbc400',
          blue: '#69c8f2',
          red: '#ff7272',
          gray: '#aaaaaa',
          green: '#b0d840',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif KR"', 'serif'],
        hanja: ['"Noto Serif KR"', '"Nanum Myeongjo"', 'serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'ball-pop': 'ballPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(8px)' },
          '50%': { opacity: '1', filter: 'blur(14px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ballPop: {
          '0%': { opacity: '0', transform: 'scale(0.3) rotate(-180deg)' },
          '60%': { opacity: '1', transform: 'scale(1.1) rotate(10deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0)' },
        },
      },
      backgroundImage: {
        'mystic-radial': 'radial-gradient(ellipse at top, #2a1e5e 0%, #0a0820 60%)',
        'gold-gradient': 'linear-gradient(135deg, #ffe79a 0%, #e6b94d 50%, #c89a30 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
