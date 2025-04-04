'use client';

import CommonDialog from '@/shared/ui/dialog/commonDialog';

interface WithdrawDialogProps {
  trigger: React.ReactNode;
  onConfirm?: () => void;
}

const WithdrawDialog = ({ trigger, onConfirm }: WithdrawDialogProps) => {
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <CommonDialog
      title="정말 탈퇴하시겠어요?"
      trigger={trigger}
      onConfirm={handleConfirm}
      actionText="탈퇴하기"
      cancelText="취소"
    >
      <div className="text-center">
        <p className="text-gray-200">탈퇴하면 계정을 복구할 수 없어요</p>
      </div>
    </CommonDialog>
  );
};

export default WithdrawDialog;
