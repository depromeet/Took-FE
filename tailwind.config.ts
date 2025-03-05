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
         * gray는 단순 숫자를 사용할지, 변수명을 사용할지 고민됩니다.
         * 특정 컬러를 다양한 곳에서 사용하기 때문에....
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
          // light: 'var(--primary-50)',
          // 'light-hover': 'var(--primary-100)',
          // 'light-active': 'var(--primary-200)',
          normal: 'var(--primary-300)',
          // active: 'var(--primary-400)',
          active: 'var(--primary-600)',
        },
        /**
         * Secondary - 변수명은 임시입니다.
         */
        secondary: {
          DEFAULT: 'var(--secondary-500)',
          // light: 'var(--secondary-50)',
          // 'light-hover': 'var(--secondary-100)',
          // 'light-active': 'var(--secondary-200)',
          normal: 'var(--secondary-300)',
          // active: 'var(--secondary-400)',
          active: 'var(--secondary-600)',
        },
        /**
         * Error - 변수명은 임시입니다.
         */
        error: {
          light: 'var(--error-100)',
          medium: 'var(--error-300)',
          normal: 'var(--error-500)',
          dark: 'var(--error-700)',
        },
        /**
         * true - 변수명은 임시입니다.
         */
        true: {
          light: 'var(--true-100)',
          medium: 'var(--true-300)',
          normal: 'var(--true-500)',
          dark: 'var(--true-700)',
        },

        /**
         * opacity - 변수명은 임시입니다.
         */
        opacity: {
          'white-10': 'var(--white-10)',
          'white-20': 'var(--white-20)',
          'purple-30': 'var(--purple-30)',
          'purple-40': 'var(--purple-40)',
          'blue-40': 'var(--blue-40)',
        },
      },
      /**
       * Gradient - 변수명은 임시입니다.
       */
      backgroundImage: {
        main: 'var(--background-main)',
        sub: 'var(--background-sub)',
        designer: 'var(--designer)',
        'designer-50': 'var(--designer-50)',
        developer: 'var(--developer)',
        'developer-50': 'var(--developer-50)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
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
        'body-2': ['18px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '-0.36px' }],
        'body-3': ['16px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '-0.32px' }],
        'body-4': ['14px', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '-0.28px' }],
        'body-5': ['14px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '-0.28px' }],
        'caption-1': ['12px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '-0.24px' }],
        'caption-2': ['11px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '-0.22px' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        ml: '20px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
