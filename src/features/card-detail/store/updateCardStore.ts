import { create } from 'zustand';

// 업데이트 카드 스토어 상태 인터페이스
interface UpdateCardState {
  cardId: string | null;
  isEditMode: boolean;
  setCardId: (id: string) => void;
  setEditMode: (isEdit: boolean) => void;
  resetState: () => void;
}
/**
 * 카드 수정 모드 스토어
 */
export const useUpdateCardStore = create<UpdateCardState>((set) => ({
  cardId: null,
  isEditMode: false,

  // 카드 ID 설정
  setCardId: (id) => set({ cardId: id }),

  // 수정 모드 설정
  setEditMode: (isEdit) => set({ isEditMode: isEdit }),

  // 상태 초기화
  resetState: () => set({ cardId: null, isEditMode: false }),
}));
