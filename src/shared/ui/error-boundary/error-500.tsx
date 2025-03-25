'use client';

import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';

export function Error500({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center bg-gray-black">
        <p className="mb-6 text-gray-600">
          {error.message || '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={resetErrorBoundary}
            className="w-[200px] rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            다시 시도
          </button>
          <button
            onClick={() => {
              // 메인 페이지로 이동
              router.push('/login');
            }}
            className="w-[200px] rounded-md border border-gray-300 bg-white py-2 text-gray-700 transition hover:bg-gray-50"
          >
            메인으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
