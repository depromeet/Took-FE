import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
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
          900: 'var(--gray-900)',
        },
        /**
         * Primary
         */
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          normal: 'var(--primary-normal)',
          'normal-hover': 'var(--primary-normal-hover)',
          'normal-active': 'var(--primary-normal-active)',
          dark: 'var(--primary-dark)',
          'dark-hover': 'var(--primary-dark-hover)',
          'dark-active': 'var(--primary-dark-active)',
          darker: 'var(--primary-darker)',
        },
        /**
         * Secondary
         */
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
          hover: 'var(--secondary-hover)',
          active: 'var(--secondary-active)',
          normal: 'var(--secondary-normal)',
          'normal-hover': 'var(--secondary-normal-hover)',
          'normal-active': 'var(--secondary-normal-active)',
          dark: 'var(--secondary-dark)',
          'dark-hover': 'var(--secondary-dark-hover)',
          'dark-active': 'var(--secondary-dark-active)',
          darker: 'var(--secondary-darker)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
