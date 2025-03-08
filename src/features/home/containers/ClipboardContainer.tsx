'use client';

import { toast, Toaster } from 'sonner';

import { Button } from '@/shared/ui/button';

import { useClipboard } from '../hooks/useClipboard';

export const ClipboardContainer = () => {
  const { handleCopy } = useClipboard();

  const onClickCopyClipboard = () => {
    handleCopy();
    toast.success('명함 링크를 클립보드에 복사했어요.');
  };

  return (
    <>
      <div className="mt-6 flex w-full items-center justify-center">
        <Button onClick={onClickCopyClipboard}>내 명함 링크 복사하기</Button>
      </div>
      <Toaster position="top-center" />
    </>
  );
};
