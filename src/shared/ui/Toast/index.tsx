'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import { Toaster } from './sonner';

type toastProps = {
  buttonText: string;
  message: string;
};

/**
 * 공통 컴포넌트 - sonner(toast)
 *
 * 사용 방법 :
 * @example <Toast buttonText={buttonText} message={message} />
 *
 * @returns {JSX.Element} - Toaster 컴포넌트
 *
 */
function Toast({ buttonText, message }: toastProps) {
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
              src="/icons/toast-icon/warningIcon.svg"
              className="text-error-medium"
              alt="error-icon"
              width={24}
              height={24}
            />
          ),
        }}
        position="bottom-right"
      />
      <button className="text-white" onClick={() => toast.error(message)}>
        {buttonText}
      </button>
    </>
  );
}

export default Toast;
