// src/shared/ui/error-boundary/GlobalErrorFallback.tsx
'use client';

import { FallbackProps } from 'react-error-boundary';

export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold text-red-600">앗! 문제가 발생했습니다</h1>
      <p className="mb-6 max-w-md text-gray-700">예상하지 못한 오류가 발생했습니다. 불편을 드려 죄송합니다.</p>
      <div className="mb-6 max-w-md rounded-md bg-gray-200 p-4 text-left text-sm text-gray-800">
        <p className="font-mono">{error instanceof Error ? error.message : '알 수 없는 오류'}</p>
      </div>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
