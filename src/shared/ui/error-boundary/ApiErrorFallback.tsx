// src/shared/ui/error-boundary/ApiErrorFallback.tsx
'use client';

import { FallbackProps } from 'react-error-boundary';

export function ApiErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  // API 에러 상태 코드 추출
  const statusCode = error.response?.status || '';
  const isAuthError = statusCode === 401;

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-2 text-xl font-semibold text-red-500">
        {isAuthError ? '인증이 필요합니다' : '데이터를 불러올 수 없습니다'}
      </h2>
      <p className="mb-4 max-w-md text-gray-600">
        {isAuthError
          ? '로그인이 필요하거나 세션이 만료되었습니다.'
          : '서버에 연결할 수 없거나 데이터를 가져오는 중 오류가 발생했습니다.'}
      </p>
      <div className="mb-4 max-w-md rounded-lg bg-gray-100 p-3 text-sm text-gray-700">{error.message}</div>
      <div className="flex gap-4">
        {isAuthError && (
          <button
            onClick={() => {
              // 로그인 페이지로 이동
              window.location.href = '/login';
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            로그인 하기
          </button>
        )}
        <button onClick={resetErrorBoundary} className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
          다시 시도
        </button>
      </div>
    </div>
  );
}
