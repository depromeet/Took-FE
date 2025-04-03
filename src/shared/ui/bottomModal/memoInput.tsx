// MemoInput.tsx
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useUpdateCardMutation, CARD_DETAIL_QUERY_KEY } from '@/features/card-detail/hooks/query/useCardDetailQuery';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import handleAxiosError from '@/shared/utils/handleAxiosError';

interface MemoInputProps {
  onClose: () => void;
  handleCancelMode: () => void;
  memo: string;
}

// 한줄 메모 최대 글자 수
const MAX_LENGTH = 40;

export const MemoInput = ({ onClose, handleCancelMode, memo }: MemoInputProps) => {
  const [memoText, setMemoText] = useState('');
  const { cardId } = useParams();
  const updateCardMutation = useUpdateCardMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMemoText(memo);
  }, [memo]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      submitMemo();
    }
  };

  const submitMemo = () => {
    onClose();
    handleCancelMode();

    if (memoText.trim()) {
      updateCardMutation.mutate(
        { cardId: cardId as string, memo: memoText },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [CARD_DETAIL_QUERY_KEY, cardId],
            });
            toast.success('한줄 메모를 등록했어요');
            onClose();
            handleCancelMode();
          },
          onError: (error) => {
            handleAxiosError(error);
          },
        },
      );
    } else {
      toast.error('메모를 입력해주세요');
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        inputMode="text"
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
        placeholder="한 줄 메모를 작성해주세요"
        className={`mb-4 w-full bg-transparent p-2 text-body-3 text-white placeholder:text-white focus:outline-none ${spacingStyles({ padding: 'ml' })}`}
        maxLength={MAX_LENGTH}
        autoFocus
        onKeyDown={handleKeyDown}
      />

      <div className={`${spacingStyles({ paddingX: 'ml' })} flex items-center justify-end`}>
        <p className="text-caption-1 text-gray-400">
          {memoText.length}/{MAX_LENGTH}
        </p>
      </div>
      <div className={`${spacingStyles({ paddingX: 'ml', paddingTop: 'ms' })} flex items-center justify-end`}>
        <button
          className={cn(
            'w-full rounded-md text-body-5 text-white',
            spacingStyles({ paddingX: 'xl', paddingY: 'ms' }),
            memoText.trim() ? 'bg-primary-active' : 'bg-gray-500 text-gray-600',
          )}
          onClick={submitMemo}
        >
          완료
        </button>
      </div>
    </div>
  );
};
