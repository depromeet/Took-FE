'use client';

import { useEffect } from 'react';

import { useReceivedCardsQuery } from '@/features/received/model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '@/features/received/model/store/useReceivedCardsStore';
import ChooseReceivedCardView from '@/features/received/ui/choose/chooseReceivedCardView';
import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';
import { Navbar } from '@/shared/ui/Navigation';
import Toast from '@/shared/ui/Toast';

function Page() {
  const { cards: serverReceivedCards, isLoading: isCardsLoading } = useReceivedCardsQuery(null);
  const handleBack = useHistoryBack();

  const { setReceivedCards } = useReceivedCardsStore();
  useEffect(() => {
    if (!isCardsLoading) setReceivedCards(serverReceivedCards);
  }, [isCardsLoading, serverReceivedCards, setReceivedCards]);

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="create" onLeftClick={handleBack} />
        <div className="overflow-y-auto px-5 pb-24 scrollbar-hide">
          <ChooseReceivedCardView />
        </div>
        <Navbar />
        <Toast />
      </div>
    </div>
  );
}

export default Page;
