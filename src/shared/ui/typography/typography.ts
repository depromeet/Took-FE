import { cva, type VariantProps } from 'class-variance-authority';

export const typography = cva('typography', {
  variants: {
    variant: {
      'title-1': 'text-title-1',
      'title-2': 'text-title-2',
      'title-3': 'text-title-3',
      'body-1': 'text-body-1',
      'body-2': 'text-body-2',
      'body-3': 'text-body-3',
      'body-4': 'text-body-4',
      'body-5': 'text-body-5',
      'caption-1': 'text-caption-1',
      'caption-2': 'text-caption-2',
    },
    color: {
      'gray-100': 'text-gray-100',
      'gray-200': 'text-gray-200',
      'gray-300': 'text-gray-300',
      'gray-400': 'text-gray-400',
      'gray-500': 'text-gray-500',
      'gray-600': 'text-gray-600',
      'gray-700': 'text-gray-700',
      'gray-800': 'text-gray-800',
      'gray-900': 'text-gray-900',
      'gray-white': 'text-gray-white',
      'error-light': 'text-error-light',
      'error-medium': 'text-error-medium',
      'error-normal': 'text-error-normal',
      'error-dark': 'text-error-dark',
    },
  },
  // default 글꼴로 설정 body-1
  defaultVariants: {
    variant: 'body-1',
  },
});

export type TypographyVariantProps = VariantProps<typeof typography>;
