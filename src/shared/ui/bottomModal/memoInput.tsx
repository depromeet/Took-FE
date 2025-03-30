// MemoInput.tsx
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { useUpdateCardMutation, CARD_DETAIL_QUERY_KEY } from '@/features/card-detail/hooks/query/useCardDetailQuery';
import { spacingStyles } from '@/shared/spacing';

interface MemoInputProps {
  onClose: () => void;
  handleCancelMode: () => void;
}

// 한줄 메모 최대 글자 수
const MAX_LENGTH = 40;

export const MemoInput = ({ onClose, handleCancelMode }: MemoInputProps) => {
  const [memoText, setMemoText] = useState('');
  const { cardId } = useParams();
  const updateCardMutation = useUpdateCardMutation();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onClose();
      handleCancelMode();

      // 메모 텍스트가 비어있지 않은 경우에만 요청
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
              toast.error('메모 등록에 실패했습니다');
              console.error(error);
            },
          },
        );
      } else {
        toast.error('메모를 입력해주세요');
      }
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        inputMode="text"
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
        placeholder="텍스트..."
        className={`mb-4 w-full bg-transparent p-2 text-body-3 text-white placeholder:text-white focus:outline-none ${spacingStyles({ padding: 'ml' })}`}
        maxLength={MAX_LENGTH}
        autoFocus
        onKeyDown={handleSubmit}
      />

      <div className={`${spacingStyles({ paddingX: 'ml' })} flex items-center justify-end`}>
        <p className="text-caption-1 text-gray-400">
          {memoText.length}/{MAX_LENGTH}
        </p>
      </div>
    </div>
  );
};
