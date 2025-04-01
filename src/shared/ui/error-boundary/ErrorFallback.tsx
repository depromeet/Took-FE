'use client';

import { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <p className="mb-4 max-w-md rounded bg-red-50 p-2 text-sm text-red-600">{errorMessage}</p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="w-[200px] rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
