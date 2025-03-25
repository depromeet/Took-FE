'use client';

import { FallbackProps } from 'react-error-boundary';

export function Error403({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center bg-gray-black">
        <p className="mb-6 text-gray-600">
          {error.message || '해당 기능에 대한 접근 권한이 없습니다. 관리자에게 문의하세요.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="w-[200px] rounded-md border border-gray-300 bg-white py-2 text-gray-700 transition hover:bg-gray-50"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
