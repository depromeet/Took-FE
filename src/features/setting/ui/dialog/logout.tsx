'use client';

import CommonDialog from '@/shared/ui/dialog/commonDialog';

interface LogoutDialogProps {
  trigger: React.ReactNode;
  onConfirm?: () => void;
}

const LogoutDialog = ({ trigger, onConfirm }: LogoutDialogProps) => {
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <CommonDialog title="로그아웃" trigger={trigger} onConfirm={handleConfirm} actionText="확인" cancelText="취소">
      <div>지금 로그아웃 하시겠어요?</div>
    </CommonDialog>
  );
};

export default LogoutDialog;
