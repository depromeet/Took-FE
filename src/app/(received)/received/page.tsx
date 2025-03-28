'use client';

import React, { useEffect, useState } from 'react';

import { useFoldersQuery } from '@/features/received/model/queries/useFoldersQuery';
import { useReceivedCardsQuery } from '@/features/received/model/queries/useReceivedCardsQuery';
import { useFolderStore } from '@/features/received/model/store/useFoldersStore';
import { useReceivedCardsStore } from '@/features/received/model/store/useReceivedCardsStore';
import { useModal } from '@/features/received/model/useModal';
import ChooseReceivedCardView from '@/features/received/ui/chooseReceivedCardView';
import ReceivedCardView from '@/features/received/ui/receivedCardView';
import Appbar from '@/shared/ui/appbar';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import { Navbar } from '@/shared/ui/Navigation';
import Toast from '@/shared/ui/Toast';

function Page() {
  const [currentView, setCurrentView] = useState<'main' | 'choose'>('main');

  const { data: serverReceivedCards } = useReceivedCardsQuery();
  const { data: serverFolders } = useFoldersQuery();

  const { isChooseModalOpen, openChooseModal, closeChooseModal } = useModal();

  const { setFolders } = useFolderStore();
  const { setReceivedCards } = useReceivedCardsStore();

  useEffect(() => {
    if (serverFolders) setFolders(serverFolders);
    if (serverReceivedCards) setReceivedCards(serverReceivedCards);
  }, []);

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="received" onLeftClick={() => setCurrentView('main')} onRightClickSecond={openChooseModal} />
        <div className="overflow-y-auto px-5 pb-24 scrollbar-hide">
          {currentView == 'main' ? <ReceivedCardView /> : <ChooseReceivedCardView />}
        </div>
        <BottomModal isModalOpen={isChooseModalOpen} closeModal={closeChooseModal}>
          <BottomMenuItem
            onClick={() => {
              setCurrentView('choose');
              closeChooseModal();
            }}
          >
            명함 선택
          </BottomMenuItem>
        </BottomModal>
        <Navbar />
        <Toast />
      </div>
    </div>
  );
}

export default Page;
