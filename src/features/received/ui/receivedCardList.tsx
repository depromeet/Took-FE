import { useRouter } from 'next/navigation';
import React from 'react';

import LottieLoading from '@/shared/ui/lottieLoading';

import { useReceivedCardsQuery } from '../model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '../model/store/useReceivedCardsStore';

import EmptyCard from './emptyCard';
import ReceivedCard from './receivedCard';

type ReceivedCardListProps = {
  selectedFolderId: number | null;
};

export default function ReceivedCardList({ selectedFolderId }: ReceivedCardListProps) {
  const { isLoading, isFetching } = useReceivedCardsQuery(selectedFolderId);
  const { receivedCards } = useReceivedCardsStore();
  const router = useRouter();

  function handleRouting(cardId: number) {
    router.push(`/card-detail/${cardId}?type=receivedcard`);
  }

  if (isLoading || isFetching) return <LottieLoading />;
  if (receivedCards.length == 0) return <EmptyCard />;
  return (
    <div className="flex flex-col gap-4">
      {receivedCards.map((value, index) => (
        <ReceivedCard
          key={index}
          cardData={value}
          onClick={() => {
            handleRouting(value.id);
          }}
        />
      ))}
    </div>
  );
}
