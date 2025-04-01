import React from 'react';

import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { MemoInput } from '@/shared/ui/bottomModal/memoInput';

type BottomSheetProps = {
  mode: boolean;
  isModalOpen: boolean;
  closeModal: () => void;
  handleMode: () => void;
  handleCancelMode: () => void;
};

function BottomSheet({ mode, isModalOpen, closeModal, handleMode, handleCancelMode }: BottomSheetProps) {
  return !mode ? (
    <BottomModal isModalOpen={isModalOpen} closeModal={closeModal} mode={mode}>
      <BottomMenuItem onClick={handleMode}>한줄 메모</BottomMenuItem>
      <BottomMenuItem className="font-bold text-error-medium">삭제하기</BottomMenuItem>
    </BottomModal>
  ) : (
    <BottomModal isModalOpen={isModalOpen} closeModal={handleCancelMode} mode={mode}>
      <BottomModalTitle>한줄 메모</BottomModalTitle>
      <MemoInput onClose={closeModal} handleCancelMode={handleCancelMode} />
    </BottomModal>
  );
}

export default BottomSheet;
