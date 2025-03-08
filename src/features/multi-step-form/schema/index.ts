import { z } from 'zod';

export const cardCreateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .refine((value) => value.length > 1, {
      message: '이름은 2글자 이상이어야 합니다.',
    }),
  detail_career: z
    .string()
    .min(1)
    .max(100)
    .refine((value) => value.length > 1, {
      message: '세부직군은 2글자 이상이어야 합니다.',
    }),
  domain: z
    .string()
    .min(1)
    .max(100)
    .refine((value) => value.length > 1, { message: '도메인은 2글자 이상이어야 합니다.' }),
  description: z
    .string()
    .min(1)
    .max(40)
    .refine((value) => value.length > 1 && value.length < 40, {
      message: '한 줄 소개는 2글자 이상 40글자 이하로 작성해주세요.',
    }),
});

export type CareerFormData = z.infer<typeof cardCreateSchema>;
