'use client';

import { FallbackProps } from 'react-error-boundary';

export function Error400({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center bg-gray-black">
        <p className="mb-6 text-white">{error.message || '요청 형식이 올바르지 않습니다. 입력 값을 확인해주세요.'}</p>
        <button
          onClick={resetErrorBoundary}
          className="w-[200px] rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
