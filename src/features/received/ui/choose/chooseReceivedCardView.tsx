import React, { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/shared/lib/utils';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { ReceivedCheckbox } from '@/shared/ui/Checkbox/receivedCheckbox';
import CommonDialog from '@/shared/ui/dialog/commonDialog';
import Toast from '@/shared/ui/Toast';

import { useFolderStore } from '../../model/store/useFoldersStore';
import { useReceivedCardsStore } from '../../model/store/useReceivedCardsStore';
import { useModal } from '../../model/useModal';
import ReceivedCard from '../receivedCard';

export default function ChooseReceivedCardView() {
  const [selectedCardId, setSelectedCardId] = useState<number[]>([]);

  const { folders } = useFolderStore();
  const { receivedCards, deleteCard } = useReceivedCardsStore();

  const isAnyChecked = selectedCardId.length > 0;
  const toggleChecked = (id: number) => {
    setSelectedCardId((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]));
    console.log(selectedCardId);
  };
  const { isSettingModalOpen, openSettingModal, closeSettingModal } = useModal();

  const handleDelete = () => {
    deleteCard(selectedCardId);
    toast.success('명함을 삭제했어요');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-3 text-body-4 font-bold">
        <button
          className={cn('text-white', { 'font-normal text-gray-400': !isAnyChecked })}
          onClick={openSettingModal}
          disabled={!isAnyChecked}
        >
          폴더 설정
        </button>
        <CommonDialog
          title="명함을 삭제할까요?"
          trigger={
            <button
              className={cn('text-body-4 text-error-medium', { 'font-normal text-gray-400': !isAnyChecked })}
              disabled={!isAnyChecked}
            >
              삭제
            </button>
          }
          onConfirm={handleDelete}
          actionText="삭제"
          cancelText="취소"
        >
          되돌릴 수 없어요
        </CommonDialog>
      </div>
      {receivedCards.map((card, index) => {
        return (
          <div key={index} className="flex max-w-full items-center gap-4">
            <ReceivedCheckbox
              checked={selectedCardId.includes(card.id)}
              onCheckedChange={() => toggleChecked(card.id)}
            />

            <div className="min-w-0 flex-1">
              <ReceivedCard key={index} cardData={card} />
            </div>
          </div>
        );
      })}
      <BottomModal isModalOpen={isSettingModalOpen} closeModal={closeSettingModal}>
        <BottomModalTitle>폴더 설정</BottomModalTitle>
        {folders.map((folder, index) => {
          return (
            <BottomMenuItem
              key={index}
              onClick={() => {
                closeSettingModal();
                toast.success('폴더 설정이 완료되었어요');
              }}
            >
              {folder.name}
            </BottomMenuItem>
          );
        })}
      </BottomModal>
      <Toast />
    </div>
  );
}
