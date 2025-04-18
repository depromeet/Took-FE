'use client';

import Image from 'next/image';

import { Toaster } from './sonner';
import { MarginValue } from './types';

/**
 * 공통 컴포넌트 - sonner(toast)
 *
 * 사용 방법 :
 * @example
 * 토스트 띄울 함수에 toast.success(message) || toast.error(message)
 * <Toast />
 *
 * @returns {JSX.Element} - Toaster 컴포넌트
 *
 */

type ToastProps = {
  bottomMargin?: MarginValue;
};

function Toast({ bottomMargin = 'detail' }: ToastProps) {
  return (
    <>
      <Toaster
        icons={{
          success: (
            <Image
              src="/icons/toast-icon/checkIcon.svg"
              className="text-secondary"
              alt="error-icon"
              width={24}
              height={24}
            />
          ),
          error: (
            <Image
              src="/icons/toast-icon/sonnerIcon.svg"
              className="text-error-medium"
              alt="error-icon"
              width={24}
              height={24}
            />
          ),
        }}
        position="bottom-center"
        bottomMargin={bottomMargin}
      />
    </>
  );
}

export default Toast;
