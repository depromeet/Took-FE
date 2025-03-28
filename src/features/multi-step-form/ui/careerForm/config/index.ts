import { CareerFormData } from '@/features/multi-step-form/schema';

import { TagValue } from '../tagFormStep/config/config';

export const FIELD_TAG_MAPPING: Record<keyof Pick<CareerFormData, TagValue>, TagValue> = {
  organization: 'organization',
  sns: 'sns',
  region: 'region',
  hobby: 'hobby',
  news: 'news',
  content: 'content',
  project: 'project',
};
