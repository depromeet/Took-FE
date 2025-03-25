'use client';

import { FallbackProps } from 'react-error-boundary';

export function ErrorDefault({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center bg-gray-black">
        <p className="mb-6 text-gray-600">
          {error.message || '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}
        </p>
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
