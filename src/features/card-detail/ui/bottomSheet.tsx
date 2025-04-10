import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { MemoInput } from '@/shared/ui/bottomModal/memoInput';
import CommonDialog from '@/shared/ui/dialog/commonDialog';

import { useDeleteReceivedCardMutation, useDeleteMyCardMutation } from '../hooks/mutation/useCardDeleteMutation';

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
          toast.success('명함을 삭제했어요');
          closeModal(); // 모달 먼저 닫기
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
          toast.success('명함을 삭제했어요');
          closeModal(); // 모달 먼저 닫기
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

  return (
    <>
      {!mode ? (
        <BottomModal isModalOpen={isModalOpen} closeModal={closeModal} mode={mode}>
          {isMyCard ? <></> : <BottomMenuItem onClick={handleMode}>한 줄 메모</BottomMenuItem>}

          {/* 삭제 다이얼로그와 트리거 함께 사용 */}
          <CommonDialog
            title="명함을 삭제할까요?"
            trigger={<BottomMenuItem className="font-bold text-error-medium">삭제하기</BottomMenuItem>}
            onConfirm={handleDelete}
            actionText="삭제"
            cancelText="취소"
          >
            되돌릴 수 없어요
          </CommonDialog>
        </BottomModal>
      ) : (
        <BottomModal isModalOpen={isModalOpen} closeModal={handleCancelMode} mode={mode}>
          <BottomModalTitle>한 줄 메모</BottomModalTitle>
          <MemoInput onClose={closeModal} handleCancelMode={handleCancelMode} memo={memo} />
        </BottomModal>
      )}
    </>
  );
}

export default BottomSheet;
