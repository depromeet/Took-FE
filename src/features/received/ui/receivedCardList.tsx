import { useRouter } from 'next/navigation';
import React from 'react';

import LottieLoading from '@/shared/ui/lottieLoading';

import { useReceivedCardsQuery } from '../model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '../model/store/useReceivedCardsStore';

import EmptyCard from './emptyCard';
import ReceivedCard from './receivedCard';

type ReceivedCardListProps = {
  selectedFolderId: number | null;
  searchValue?: string;
};

export default function ReceivedCardList({ selectedFolderId, searchValue = '' }: ReceivedCardListProps) {
  const { isLoading, isFetching } = useReceivedCardsQuery(selectedFolderId);
  const { receivedCards } = useReceivedCardsStore();
  const router = useRouter();

  const lowerSearch = searchValue.toLowerCase().trim();
  const filteredCards = receivedCards.filter((card) => {
    // 카드의 주요 문자열 필드를 모두 검사
    const textTargets = [
      card.nickname,
      card.organization,
      card.job,
      card.detailJob,
      card.summary,
      ...card.interestDomain,
      card.previewInfoType,
      card.previewInfo?.project?.title,
      card.previewInfo?.project?.description,
      card.previewInfo?.content?.title,
      card.previewInfo?.content?.description,
      card.previewInfo?.hobby,
      card.previewInfo?.news,
      card.previewInfo?.region,
      card.previewInfo?.sns?.type,
    ];
    // undefined 체크 후 소문자로 바꿔서 비교
    return textTargets.some((field) => field?.toLowerCase().includes(lowerSearch));
  });

  function handleRouting(cardId: number) {
    router.push(`/card-detail/${cardId}?type=receivedcard`);
  }

  if (isLoading || isFetching) return <LottieLoading />;
  if (receivedCards.length == 0) return <EmptyCard />;
  return (
    <div className="flex flex-col gap-4">
      {(searchValue ? filteredCards : receivedCards).map((value, index) => (
        <ReceivedCard
          key={index}
          cardData={value}
          onClick={() => {
            handleRouting(value.id);
          }}
          searchValue={searchValue}
        />
      ))}
    </div>
  );
}
