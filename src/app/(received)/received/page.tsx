'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useFoldersQuery } from '@/features/received/model/queries/useFoldersQuery';
import { useReceivedCardsQuery } from '@/features/received/model/queries/useReceivedCardsQuery';
import { useFolderStore } from '@/features/received/model/store/useFoldersStore';
import { useReceivedCardsStore } from '@/features/received/model/store/useReceivedCardsStore';
import { useModal } from '@/features/received/model/useModal';
import ReceivedCardView from '@/features/received/ui/receivedCardView';
import Appbar from '@/shared/ui/appbar';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import { Navbar } from '@/shared/ui/Navigation';
import Toast from '@/shared/ui/Toast';

function Page() {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>();
  const { cards: serverReceivedCards, isLoading: isCardsLoading } = useReceivedCardsQuery(selectedFolderId);
  const { folders: serverFolders, isLoading: isFoldersLoading } = useFoldersQuery();

  const { isChooseModalOpen, openChooseModal, closeChooseModal } = useModal();

  const { setFolders } = useFolderStore();
  const { setReceivedCards } = useReceivedCardsStore();

  useEffect(() => {
    if (!isFoldersLoading) setFolders(serverFolders);
  }, [isFoldersLoading, serverFolders, setFolders]);

  useEffect(() => {
    if (!isCardsLoading) setReceivedCards(serverReceivedCards);
  }, [isCardsLoading, serverReceivedCards, setReceivedCards]);

  const router = useRouter();

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col overflow-y-auto bg-gray-black">
        <Appbar page="received" onRightClickSecond={openChooseModal} />
        <div className="h-[calc(100dvh-64px)] overflow-y-auto px-5 pb-24 scrollbar-hide">
          <ReceivedCardView selectedFolderId={selectedFolderId ?? null} setSelectedFolderId={setSelectedFolderId} />
        </div>
        <BottomModal isModalOpen={isChooseModalOpen} closeModal={closeChooseModal}>
          <BottomMenuItem
            onClick={() => {
              closeChooseModal();
              router.push('/received/choose');
            }}
          >
            명함 선택
          </BottomMenuItem>
        </BottomModal>
        <Navbar />
        <Toast bottomMargin="95px" />
      </div>
    </div>
  );
}

export default Page;
