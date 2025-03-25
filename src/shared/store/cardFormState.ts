import { Dispatch } from 'react';
import { create } from 'zustand';

import { TagValue } from '@/features/multi-step-form/ui/careerForm/tagFormStep/config/config';
import { CardJobType } from '@/features/new-card/hooks/queries/useRegisterQuery';

interface CardFormState {
  tagArray: TagValue[];
  setTagArray: Dispatch<React.SetStateAction<TagValue[]>>;
  tagCount: number;
  incrementTagCount: Dispatch<React.SetStateAction<number>>;
  handleTagClick: (tagMessage: TagValue) => void;
  job: CardJobType;
  setJob: Dispatch<React.SetStateAction<CardJobType>>;
  resetTagCount: () => void;
}

export const useCardFormStore = create<CardFormState>((set, get) => ({
  tagArray: [],
  tagCount: 0,
  job: 'DESIGNER',
  setJob: (job) =>
    set((state) => ({
      job: typeof job === 'function' ? job(state.job) : job,
    })),
  incrementTagCount: () => {
    set((state) => ({
      tagCount: state.tagCount + 1,
    }));
  },
  setTagArray: (tags) =>
    set((state) => ({
      ...state,
      tagArray: typeof tags === 'function' ? tags(state.tagArray) : tags,
    })),
  // 태그 클릭 핸들러
  handleTagClick: (tagMessage: TagValue) => {
    const { tagArray, tagCount } = get();
    if (!tagArray.includes(tagMessage)) {
      set({
        tagArray: [...tagArray, tagMessage],
        tagCount: tagCount + 1,
      });
    } else {
      set({
        tagArray: tagArray.filter((t) => t !== tagMessage),
        tagCount: tagCount - 1,
      });
    }
  },
  // 태그 카운트와 태그 배열 초기화
  resetTagArray: () =>
    set({
      tagArray: [],
      tagCount: 0,
    }),
  resetTagCount: () =>
    set({
      tagCount: 0,
    }),
}));
