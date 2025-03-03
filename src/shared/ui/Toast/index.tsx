import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import ErrorIcon from '@/shared/ui/icon/sonnerIcon.svg';

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
          error: <Image src={ErrorIcon} className="h-6 w-6 text-red-500" alt="error-icon" />,
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
