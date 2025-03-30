import { create } from 'zustand';

import { Card } from '@/features/home/types';

type ReceivedCardsStore = {
  receivedCards: Card[];
  setReceivedCards: (receivedCards: Card[]) => void;
  deleteCards: (cardIds: number[]) => void;
};

export const useReceivedCardsStore = create<ReceivedCardsStore>((set) => ({
  receivedCards: [],
  setReceivedCards: (receivedCards) => set({ receivedCards }),
  deleteCards: (cardIds) =>
    set((state) => ({
      receivedCards: state.receivedCards.filter((receivedCard) => !cardIds.includes(receivedCard.id)),
    })),
}));
