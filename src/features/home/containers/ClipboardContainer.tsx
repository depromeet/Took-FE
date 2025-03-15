'use client';

import { toast } from 'sonner';

import { Typography } from '@/shared/ui/typography';

import { CopyLinkIcon } from '../components/icons/CopyLinkIcon';
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
        <button
          className="bg flex h-[40px] w-[252px] items-center justify-center gap-1 rounded-full bg-primary"
          onClick={onClickCopyClipboard}
        >
          <CopyLinkIcon />
          <Typography variant="body-4">내 명함 링크 복사하기</Typography>
        </button>
      </div>
    </>
  );
};
