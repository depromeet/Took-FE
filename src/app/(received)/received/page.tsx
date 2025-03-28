'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useModal } from '@/features/received/model/useModal';
import ChooseReceivedCardView from '@/features/received/ui/chooseReceivedCardView';
import ReceivedCardView from '@/features/received/ui/receivedCardView';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { Navbar } from '@/shared/ui/Navigation';
import Toast from '@/shared/ui/Toast';

function Page() {
  // const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  // const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const [currentView, setCurrentView] = useState<'main' | 'choose'>('main');

  // const OpenChooseModal = () => {
  //   setIsChooseModalOpen(true);
  // };
  // const OpenSettingModal = () => {
  //   setIsSettingModalOpen(true);
  // };
  // const CloseChooseModal = () => {
  //   setIsChooseModalOpen(false);
  // };
  // const CloseSettingModal = () => {
  //   setIsSettingModalOpen(false);
  // };

  const {
    isChooseModalOpen,
    isSettingModalOpen,
    openChooseModal,
    openSettingModal,
    closeChooseModal,
    closeSettingModal,
  } = useModal();

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="received" onLeftClick={() => setCurrentView('main')} onRightClickSecond={openChooseModal} />
        <div className="overflow-y-auto px-5 pb-24 scrollbar-hide">
          {currentView == 'main' ? <ReceivedCardView /> : <ChooseReceivedCardView openModal={openSettingModal} />}
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
        <BottomModal isModalOpen={isSettingModalOpen} closeModal={closeSettingModal}>
          <BottomModalTitle>폴더 설정</BottomModalTitle>
          <BottomMenuItem
            onClick={() => console.log('asdf')}
            update={() => {}}
            delete={() => {
              closeSettingModal();
              toast.success('폴더가 삭제되었어요');
            }}
          >
            디프만
          </BottomMenuItem>
          <BottomMenuItem onClick={() => console.log('asdf')} update={() => {}} delete={() => {}}>
            엘리스랩
          </BottomMenuItem>
          <button className={cn('flex gap-3', spacingStyles({ padding: 'ml' }))}>
            <Image src="/icons/addIcon.svg" alt="추가 아이콘" width={20} height={20} />
            <p className="text-body-3 text-gray-300">추가하기</p>
          </button>
        </BottomModal>
        <Navbar />
        <Toast />
      </div>
    </div>
  );
}

export default Page;
