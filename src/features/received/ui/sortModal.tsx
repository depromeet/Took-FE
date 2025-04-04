import React, { useEffect } from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

import { SORTING } from '../config';
import { useReceivedCardsStore } from '../model/store/useReceivedCardsStore';
import { useModal } from '../model/useModal';

type SortModalProps = {
  isSortingModalOpen: boolean;
  sortingCriteria: string;
  setSortingCriteria: React.Dispatch<React.SetStateAction<string>>;
};

export default function SortModal({ isSortingModalOpen, sortingCriteria, setSortingCriteria }: SortModalProps) {
  const { receivedCards, setReceivedCards } = useReceivedCardsStore();
  const { closeSortingModal } = useModal();
  const sorting_criteria = SORTING;

  const handleSorting = (criteria: string) => {
    setSortingCriteria(criteria);
    closeSortingModal();
  };

  useEffect(() => {
    const sorted = [...receivedCards];

    if (sortingCriteria === '오름차순') {
      sorted.sort((a, b) => a.nickname.localeCompare(b.nickname, 'ko-KR'));
    } else if (sortingCriteria === '내림차순') {
      sorted.sort((a, b) => b.nickname.localeCompare(a.nickname, 'ko-KR'));
    } else {
      sorted.sort((a, b) => (b.receivedAt ?? '').localeCompare(a.receivedAt ?? '', 'ko-KR')); // 추후 받은ㅁ ㅕㅇ함 기준으로 만듦
    }

    setReceivedCards(sorted);
    console.log(receivedCards);
  }, [sortingCriteria]);

  if (isSortingModalOpen === false) return null;
  else
    return (
      <div
        className={cn(
          'absolute right-0 top-6 z-bottomSheet h-auto w-full rounded-md bg-gray-600',
          spacingStyles({ padding: 'md' }),
          'flex cursor-pointer flex-col gap-4',
        )}
      >
        {sorting_criteria.map((criteria, index) => {
          return (
            <p key={index} className="text-body-5 text-white" onClick={() => handleSorting(criteria)}>
              {criteria}
            </p>
          );
        })}
      </div>
    );
}
