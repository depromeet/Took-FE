import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { MemoInput } from '@/shared/ui/bottomModal/memoInput';

import { useDeleteMyCardMutation, useDeleteReceivedCardMutation } from '../hooks/query/useCardDetailQuery';

type BottomSheetProps = {
  mode: boolean;
  isMyCard: boolean;
  isModalOpen: boolean;
  memo: string;
  closeModal: () => void;
  handleMode: () => void;
  handleCancelMode: () => void;
};

function BottomSheet({
  mode,
  isMyCard,
  isModalOpen,
  memo,
  closeModal,
  handleMode,
  handleCancelMode,
}: BottomSheetProps) {
  const { cardId } = useParams();
  const router = useRouter();
  const deleteReceivedCardMutation = useDeleteReceivedCardMutation();
  const deleteMyCardMutation = useDeleteMyCardMutation();

  const handleDelete = () => {
    if (isMyCard) {
      deleteMyCardMutation.mutate(cardId as string, {
        onSuccess: () => {
          toast.success('내 명함이 삭제되었습니다.');
          setTimeout(() => {
            router.push('/');
          }, 700);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      deleteReceivedCardMutation.mutate(cardId as string, {
        onSuccess: () => {
          toast.success('받은 명함이 삭제되었습니다.');
          setTimeout(() => {
            router.push('/received');
          }, 700);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return !mode ? (
    <BottomModal isModalOpen={isModalOpen} closeModal={closeModal} mode={mode}>
      {isMyCard ? <></> : <BottomMenuItem onClick={handleMode}>한 줄 메모</BottomMenuItem>}
      <BottomMenuItem className="font-bold text-error-medium" onClick={handleDelete}>
        삭제하기
      </BottomMenuItem>
    </BottomModal>
  ) : (
    <BottomModal isModalOpen={isModalOpen} closeModal={handleCancelMode} mode={mode}>
      <BottomModalTitle>한 줄 메모</BottomModalTitle>
      <MemoInput onClose={closeModal} handleCancelMode={handleCancelMode} memo={memo} />
    </BottomModal>
  );
}

export default BottomSheet;
