'use client';

import React, { useEffect } from 'react';

import { useReceivedCardsQuery } from '@/features/received/model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '@/features/received/model/store/useReceivedCardsStore';
import ReceivedCard from '@/features/received/ui/receivedCard';
import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';
import { Navbar } from '@/shared/ui/Navigation';

function Page() {
  const handleBack = useHistoryBack();

  const { cards: serverReceivedCards } = useReceivedCardsQuery(null);
  const { setReceivedCards } = useReceivedCardsStore();

  useEffect(() => {
    setReceivedCards(serverReceivedCards);
  }, []);

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="mypage" title="흥미로운 명함" onLeftClick={handleBack} onRightClick={() => console.log('hi')} />
        <div className="flex flex-col gap-4 overflow-y-auto px-5 pb-24 scrollbar-hide">
          {serverReceivedCards.map((value, index) => (
            <ReceivedCard key={index} cardData={value} />
          ))}
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default Page;
