import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectCardState {
  selectedCardIds: number[];
  setSelectedCardIds: (ids: number[]) => void;
  toggleCardId: (id: number) => void;
}

export const useSelectCardStore = create<SelectCardState>()(
  persist(
    (set) => ({
      selectedCardIds: [],

      // 선택된 ID 전체를 설정
      setSelectedCardIds: (ids) => set({ selectedCardIds: ids }),

      // ID 토글 (있으면 제거, 없으면 추가)
      toggleCardId: (id) =>
        set((state) => ({
          selectedCardIds: state.selectedCardIds.includes(id)
            ? state.selectedCardIds.filter((cardId) => cardId !== id)
            : [...state.selectedCardIds, id],
        })),
    }),

    {
      name: 'card-selection-storage', // 로컬 스토리지 키 이름
    },
  ),
);
