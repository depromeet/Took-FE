import { create } from 'zustand';

interface ShareState {
  isFromSharedCard: boolean;
  setFromSharedCard: (value: boolean) => void;
}

export const useShareStore = create<ShareState>((set) => ({
  isFromSharedCard: false,
  setFromSharedCard: (value) => set({ isFromSharedCard: value }),
}));
