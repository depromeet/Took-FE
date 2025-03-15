import { Dispatch } from 'react';
import { create } from 'zustand';

interface CardFormState {
  tagArray: string[];
  setTagArray: Dispatch<React.SetStateAction<string[]>>;
}

export const useCardFormStore = create<CardFormState>((set) => ({
  tagArray: [],
  setTagArray: (tags) => set((state) => ({ ...state, tags })),
}));
