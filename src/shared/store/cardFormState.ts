import { Dispatch } from 'react';
import { create } from 'zustand';

import { CareerFormData } from '@/features/multi-step-form/schema';
import { FIELD_TAG_MAPPING } from '@/features/multi-step-form/ui/careerForm/config';
import { TagValue } from '@/features/multi-step-form/ui/careerForm/tagFormStep/config/config';
import { CardJobType } from '@/features/new-card/hooks/queries/useRegisterQuery';

interface CardFormState {
  tagArray: TagValue[];
  setTagArray: Dispatch<React.SetStateAction<TagValue[]>>;
  tagCount: number;
  incrementTagCount: Dispatch<React.SetStateAction<number>>;
  handleTagClick: (tagMessage: TagValue, form: any) => void;
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
  handleTagClick: (tagMessage: TagValue, form: any) => {
    const { tagArray, tagCount } = get();

    if (!tagArray.includes(tagMessage)) {
      set({
        tagArray: [...tagArray, tagMessage],
        tagCount: tagCount + 1,
      });
    } else {
      const fieldToReset = Object.entries(FIELD_TAG_MAPPING).find(
        ([_, value]) => value === tagMessage,
      )?.[0] as keyof CareerFormData;

      if (fieldToReset) {
        form.unregister(fieldToReset);
        form.clearErrors(fieldToReset);
      }

      set({
        tagArray: tagArray.filter((t) => t !== tagMessage),
        tagCount: tagCount - 1,
      });
    }
  },
  resetTagCount: () =>
    set({
      tagCount: 0,
      tagArray: [],
    }),
}));
