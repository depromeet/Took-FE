import { create } from 'zustand';

import { Card } from '@/features/home/types';

type ReceivedCardsStore = {
  receivedCards: Card[];
  setReceivedCards: (receivedCards: Card[]) => void;
  deleteCard: (cardIds: number[]) => void;
};

export const useReceivedCardsStore = create<ReceivedCardsStore>((set) => ({
  receivedCards: [],
  setReceivedCards: (receivedCards) => set({ receivedCards }),
  deleteCard: (cardIds) =>
    set((state) => ({
      receivedCards: state.receivedCards.filter(
        (receivedCard) => !cardIds.includes(receivedCard.id), // cardIds에 포함되지 않은 카드들만 남긴다.
      ),
    })),
}));
