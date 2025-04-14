import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { MemoInput } from '@/shared/ui/bottomModal/memoInput';
import CommonDialog from '@/shared/ui/dialog/commonDialog';

import { useDeleteReceivedCardMutation, useDeleteMyCardMutation } from '../hooks/mutation/useCardDeleteMutation';
import { useCardPrimaryMutation } from '../hooks/mutation/useCardPrimaryMutation';
import { CARD_DETAIL_QUERY_KEY } from '../hooks/query/useCardDetailQuery';
import { MY_CARD_QUERY_KEY } from '../hooks/query/useCardQuery';

type BottomSheetProps = {
  mode: boolean;
  isMyCard: boolean;
  isModalOpen: boolean;
  memo: string;
  isPrimary: boolean;
  closeModal: () => void;
  handleMode: () => void;
  handleCancelMode: () => void;
};

function BottomSheet({
  mode,
  isMyCard,
  isModalOpen,
  memo,
  isPrimary,
  closeModal,
  handleMode,
  handleCancelMode,
}: BottomSheetProps) {
  const { cardId } = useParams();
  const router = useRouter();
  const deleteReceivedCardMutation = useDeleteReceivedCardMutation();
  const deleteMyCardMutation = useDeleteMyCardMutation();
  const cardPrimaryMutation = useCardPrimaryMutation();
  const queryClient = useQueryClient();

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
        onError(err) {
          throw err;
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
        onError(err) {
          throw err;
        },
      });
    }
  };

  // 대표 명함 설정/해제 처리 함수
  const handlePrimaryCard = () => {
    cardPrimaryMutation.mutate(
      { cardId: Number(cardId) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [CARD_DETAIL_QUERY_KEY, cardId] });
          queryClient.invalidateQueries({ queryKey: [MY_CARD_QUERY_KEY] });
          toast.success('대표 명함으로 설정되었습니다');
          closeModal();
        },
        onError: (error) => {
          toast.error(error?.message || '대표 명함 설정 중 오류가 발생했습니다');
        },
      },
    );
  };

  return (
    <>
      {!mode ? (
        <BottomModal isModalOpen={isModalOpen} closeModal={closeModal} mode={mode}>
          {isMyCard ? (
            <>
              {!isPrimary && <BottomMenuItem onClick={handlePrimaryCard}>대표 명함 설정하기</BottomMenuItem>}

              <BottomMenuItem>명함 수정하기</BottomMenuItem>
            </>
          ) : (
            <BottomMenuItem onClick={handleMode}>한 줄 메모</BottomMenuItem>
          )}

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
