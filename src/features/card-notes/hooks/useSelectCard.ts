'use client';

import { useState } from 'react';
export const useSelectCard = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const toggleCardSelection = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      // 이미 선택된 카드라면 선택 해제
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      // 선택되지 않은 카드라면 선택
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  return {
    selectedCards,
    setSelectedCards,
    toggleCardSelection,
  };
};

export default useSelectCard;
