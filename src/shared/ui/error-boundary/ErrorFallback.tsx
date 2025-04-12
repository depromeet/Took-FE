'use client';

import Image from 'next/image';
import { FallbackProps } from 'react-error-boundary';

import { getErrorConfig } from './errorConfig';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  // 에러 코드에 맞는 설정 가져오기
  const { message, buttonText, buttonAction } = getErrorConfig(error);

  const handleButtonClick = () => {
    // 에러 바운더리 리셋
    resetErrorBoundary();

    // 새로고침 , 뒤로가기 등 액션
    buttonAction();
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <Image src="/icons/error.svg" alt="에러 아이콘" width={100} height={100} className="mb-[6px]" />
        <span className="mb-[12px] text-body-3 font-medium">{message}</span>
        <button
          onClick={handleButtonClick}
          className="rounded-md bg-primary-active px-[24px] py-[10px] text-body-5 text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
