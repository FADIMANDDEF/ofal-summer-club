import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dolce: {
          50: '#EEF4F6',
          100: '#D6E5EA',
          200: '#AEC9D3',
          300: '#82ADBC',
          400: '#5C93A6',
          500: '#3D7690',
          600: '#2C5A70',
          700: '#1E4B5F',
          800: '#173B4B',
          900: '#102A36',
        },
        butter: {
          50: '#FEFBF0',
          100: '#FBEFC8',
          200: '#F7E3A0',
          300: '#F3D77A',
          400: '#EFC957',
          500: '#E5B838',
          600: '#C99A24',
        },
        bloom: {
          100: '#F6E4DE',
          300: '#E8C2B7',
          500: '#D9A9A0',
        },
        cream: '#FDFBF6',
        ink: '#1F2A2E',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px -8px rgba(30, 75, 95, 0.18)',
        card: '0 4px 24px -6px rgba(30, 75, 95, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
