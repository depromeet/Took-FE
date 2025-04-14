import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { MemoInput } from '@/shared/ui/bottomModal/memoInput';
import CommonDialog from '@/shared/ui/dialog/commonDialog';

import { useDeleteReceivedCardMutation, useDeleteMyCardMutation } from '../hooks/mutation/useCardDeleteMutation';
import { useCardPriamaryMutation } from '../hooks/mutation/useCardPrimaryMutation';

type BottomSheetProps = {
  mode: boolean;
  isMyCard: boolean;
  isModalOpen: boolean;
  memo: string;
  isPrimary: boolean;
  myCardCount: number;
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
  myCardCount,
  closeModal,
  handleMode,
  handleCancelMode,
}: BottomSheetProps) {
  const { cardId } = useParams();
  const router = useRouter();
  const deleteReceivedCardMutation = useDeleteReceivedCardMutation();
  const deleteMyCardMutation = useDeleteMyCardMutation();
  const cardPrimaryMutation = useCardPriamaryMutation();

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
          if (isPrimary) {
            if (myCardCount === 1) {
              toast.error('최소 한 개의 대표 명함이 필요합니다');
            } else {
              toast.success('대표 명함 설정이 해제되었습니다');
            }
          } else {
            toast.success('대표 명함으로 설정되었습니다');
          }
          closeModal(); // 모달 닫기
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
              <BottomMenuItem onClick={handlePrimaryCard}>
                {isPrimary ? '대표 명함 해제하기' : '대표 명함 설정하기'}
              </BottomMenuItem>
              <BottomMenuItem onClick={handleMode}>명함 수정하기</BottomMenuItem>
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
