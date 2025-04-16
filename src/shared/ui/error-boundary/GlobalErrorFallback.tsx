'use client';

import Image from 'next/image';
import { FallbackProps } from 'react-error-boundary';

export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error.response?.message || '일시적인 오류가 발생했어요';
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex h-full w-full max-w-[600px] flex-col items-center bg-gray-black">
        <div className="flex h-full flex-col items-center justify-center">
          <Image src="/icons/error.svg" alt="에러 아이콘" width={100} height={100} className="mb-[6px]" />
          <span className="mb-[12px] text-body-3 font-medium">{message || '알 수 없는 오류가 발생했습니다'}</span>
          <button
            onClick={resetErrorBoundary}
            className="rounded-md bg-primary-active px-[24px] py-[10px] text-body-5 text-white"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
}
