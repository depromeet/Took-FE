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
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const { cards: serverReceivedCards, isLoading: isCardsLoading, refetch } = useReceivedCardsQuery(selectedFolderId);
  const { folders: serverFolders, isLoading: isFoldersLoading } = useFoldersQuery();

  const { isChooseModalOpen, openChooseModal, closeChooseModal } = useModal();

  const { setFolders } = useFolderStore();
  const { setReceivedCards } = useReceivedCardsStore();

  useEffect(() => {
    if (!isFoldersLoading) setFolders(serverFolders);
    console.log('선택한 폴더 : ', selectedFolderId);
  }, [isFoldersLoading]);

  useEffect(() => {
    if (!isCardsLoading) setReceivedCards(serverReceivedCards);
  }, [isCardsLoading]);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await refetch();
      if (data) {
        setReceivedCards(data.cards);
      }
    };

    fetchCards();
  }, [selectedFolderId, refetch]);

  const router = useRouter();

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="received" onRightClickSecond={openChooseModal} />
        <div className="overflow-y-auto px-5 pb-24 scrollbar-hide">
          <ReceivedCardView selectedFolderId={selectedFolderId} setSelectedFolderId={setSelectedFolderId} />
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
        <Toast />
      </div>
    </div>
  );
}

export default Page;
