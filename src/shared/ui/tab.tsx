import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const tabVariants = cva(
  'inline-flex items-center justify-center rounded-lg border gap-2 px-3 py-1.5 text-xs cursor-pointer font-semibold transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border border-gray-200 bg-black text-gray-200',
        all: 'border-transparent bg-white text-gray-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface tabProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabVariants> {}

/**
 * 공통 컴포넌트 - Tab
 *
 * @example
 * <Tab variant="all">전체 보기</Tab>
 *
 * @prop {'default' | 'all'} [variant='default'] - 탭 스타일 종류
 *  - `default`: 일반 탭 디자인 (검은 배경, 회색 테두리 및 텍스트)
 *  - `all`: '전체 보기' 탭 디자인 (흰 배경, 짙은 회색 텍스트)
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 기본 div 속성
 *
 * @returns {JSX.Element} Tab 컴포넌트
 */
function Tab({ className, variant, ...props }: tabProps) {
  return (
    <div>
      <div className={cn(tabVariants({ variant }), className)} {...props} />
    </div>
  );
}

export { Tab, tabVariants };
