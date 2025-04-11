// src/shared/ui/error-boundary/GlobalErrorFallback.tsx
'use client';

import Image from 'next/image';
import { FallbackProps } from 'react-error-boundary';

export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <Image src="/icons/error.svg" alt="에러 아이콘" width={100} height={100} className="mb-[6px]" />
        <span className="mb-[12px] text-body-3 font-medium">{error.message || '알 수 없는 오류가 발생했습니다'}</span>
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-primary-active px-[24px] py-[10px] text-body-5 text-white"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}
