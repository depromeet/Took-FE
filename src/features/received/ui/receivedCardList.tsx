import React from 'react';

import { useReceivedCardsQuery } from '../model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '../model/store/useReceivedCardsStore';

import ReceivedCard from './receivedCard';

type ReceivedCardListProps = {
  selectedFolderId: number | null;
};

export default function ReceivedCardList({ selectedFolderId }: ReceivedCardListProps) {
  const { isLoading } = useReceivedCardsQuery(selectedFolderId);
  const { receivedCards } = useReceivedCardsStore();

  if (isLoading) return <p>받은 명함들 로딩중이에요...</p>; // 임시 로딩 구현
  return (
    <div className="flex flex-col gap-4">
      {receivedCards.map((value, index) => (
        <ReceivedCard key={index} cardData={value} />
      ))}
    </div>
  );
}
