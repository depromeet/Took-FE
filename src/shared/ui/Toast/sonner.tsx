'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

import { cn } from '@/shared/lib/utils';

import { MarginValue } from './types';

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  bottomMargin?: MarginValue;
};

const Toaster = ({ bottomMargin = 'detail', ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  // 미리 정의된 마진 클래스 맵
  const marginClasses: Record<MarginValue, string> = {
    detail: 'mb-[20px]',
    receive: 'mb-[95px]',
  };

  // 기본 토스트 클래스
  // 임시적으로 max-w-[200px] 설정 -> 추후 번경 사항
  const baseToastClass = cn(
    'group toast flex flex-row items-center justify-center gap-2 !w-fit',
    'group-[.toaster]:bg-gray-600 group-[.toaster]:text-gray-white group-[.toaster]:text-body-4',
    'group-[.toaster]:rounded-full group-[.toaster]:border-none',
    'group-[.toaster]:fixed group-[.toaster]:left-1/2 group-[.toaster]:transform group-[.toaster]:-translate-x-1/2',
    marginClasses[bottomMargin],
  );

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={cn('toaster group')}
      style={
        {
          '--width': '100%',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: baseToastClass,
          description: 'group-[.toast]:text-gray-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
