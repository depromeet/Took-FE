import { z } from 'zod';

import { TEXT_AREA_MAX_LENGTH } from '../config';

// 회원 탈퇴 스키마
export const userQuitSchema = z.object({
  reasons: z
    .array(z.string())
    .optional()
    .superRefine((val, ctx) => {
      if (val === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '최소 1개 이상의 이유를 선택해주세요',
        });
      }
    }),
  directMessage: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val !== undefined) {
        if (val.length === 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 2,
            type: 'string',
            inclusive: true,
            message: '최소 2자 이상 입력해주세요',
          });
        }

        if (val.length > TEXT_AREA_MAX_LENGTH) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: TEXT_AREA_MAX_LENGTH,
            type: 'string',
            inclusive: true,
            message: `최대 ${TEXT_AREA_MAX_LENGTH}자까지 입력 가능합니다`,
          });
        }
      }
    }),
});

// 스키마의 타입 유추
export type UserQuitSchemaType = z.infer<typeof userQuitSchema>;
