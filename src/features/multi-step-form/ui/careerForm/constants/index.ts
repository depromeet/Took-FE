import { CareerFormData } from '@/features/multi-step-form/schema';
import { useCardFormStore } from '@/shared/store/cardFormState';

export const STEP_VALIDATION_FIELDS: Record<number, (keyof CareerFormData)[]> = {
  1: ['profileImage', 'nickname', 'detailJobId', 'interestDomain', 'summary'],
  2: [],
  3: useCardFormStore.getState().tagArray,
  4: [],
};
