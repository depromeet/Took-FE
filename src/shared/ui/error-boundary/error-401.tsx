'use client';

import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';

export function Error401({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center bg-gray-black">
        <p className="mb-6 text-white">{error.message || '로그인 세션이 만료되었습니다. 다시 로그인해주세요.'}</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              router.push('/login');
            }}
            className="w-[200px] rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            로그인 하기
          </button>
          <button
            onClick={resetErrorBoundary}
            className="w-[200px] rounded-md border border-gray-300 bg-white py-2 text-gray-700 transition hover:bg-gray-50"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
}
