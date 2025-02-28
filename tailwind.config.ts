import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: 'var(--white)',
        black: 'var(--black)',
        /**
         * Gray
         */
        gray: {
          white: 'var(--gray-white)',
          50: 'var(--gray-50)',
          75: 'var(--gray-75)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          black: 'var(--gray-black)',
        },
        /**
         * Primary - 변수명은 임시입니다.
         */
        primary: {
          DEFAULT: 'var(--primary-500)',
          light: 'var(--primary-50)',
          'light-hover': 'var(--primary-100)',
          'light-active': 'var(--primary-200)',
          hover: 'var(--primary-300)',
          active: 'var(--primary-400)',
          dark: 'var(--primary-500)',
        },
        /**
         * Secondary - 변수명은 임시입니다.
         */
        secondary: {
          DEFAULT: 'var(--secondary-500)',
          light: 'var(--secondary-50)',
          'light-hover': 'var(--secondary-100)',
          'light-active': 'var(--secondary-200)',
          hover: 'var(--secondary-300)',
          active: 'var(--secondary-400)',
          dark: 'var(--secondary-500)',
        },
        /**
         * Error - 속성들은 임시입니다.
         */
        error: {
          light: 'var(--error-100)',
          medium: 'var(--error-300)',
          normal: 'var(--error-500)',
          dark: 'var(--error-700)',
        },
        true: {
          light: 'var(--true-100)',
          medium: 'var(--true-300)',
          normal: 'var(--true-500)',
          dark: 'var(--true-700)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-s)',
        md: 'var(--radius-m)',
        lg: 'var(--radius-l)',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      // '키 이름': [fontSize, { lineHeight, fontWeight, letterSpacing }]
      // - fontSize: 글자 크기
      // - lineHeight: 줄 높이
      // - fontWeight: 글자 두께
      // - letterSpacing: 글자 간격
      fontSize: {
        'title-1': ['22px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '-0.44px' }],
        'title-2': ['20px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '-0.4px' }],
        'title-3': ['18px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '-0.36px' }],
        'body-1': ['18px', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '-0.36px' }],
        'body-2': ['16px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '-0.32px' }],
        'body-3': ['14px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '-0.28px' }],
        'body-4': ['14px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '-0.28px' }],
        'caption-1': ['12px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '-0.24px' }],
        'caption-2': ['11px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '-0.22px' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
