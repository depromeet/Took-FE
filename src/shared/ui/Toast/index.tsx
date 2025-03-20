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
          error: <Image src="/icons/sonnerIcon.svg" className="text-red-500" alt="error-icon" width={24} height={24} />,
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
