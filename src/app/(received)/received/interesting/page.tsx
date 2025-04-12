'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useReceivedCardsQuery } from '@/features/received/model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '@/features/received/model/store/useReceivedCardsStore';
import ReceivedCard from '@/features/received/ui/receivedCard';
import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';
import { Navbar } from '@/shared/ui/Navigation';

function Page() {
  const handleBack = useHistoryBack();
  const router = useRouter();

  const { cards: serverReceivedCards, isLoading } = useReceivedCardsQuery();
  const { setReceivedCards } = useReceivedCardsStore();

  useEffect(() => {
    if (!isLoading) {
      setReceivedCards(serverReceivedCards);
    }
  }, [isLoading, serverReceivedCards, setReceivedCards]);

  function handleRouting(cardId: number) {
    router.push(`/card-detail/${cardId}?type=receivedcard`);
  }

  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar page="interest" title="흥미로운 명함" onLeftClick={handleBack} hasBackground={false} />
        <div className="mt-[16px] flex flex-col gap-4 overflow-y-auto px-5 pb-24 scrollbar-hide">
          {serverReceivedCards.map((value, index) => (
            <ReceivedCard
              key={index}
              cardData={value}
              onClick={() => {
                handleRouting(value.id);
              }}
            />
          ))}
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default Page;
