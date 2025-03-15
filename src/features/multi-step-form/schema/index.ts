import { z } from 'zod';

// const linkValidationRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w-]*)*\/?$/;

export const cardCreateSchema = z.object({
  profileImage: z.string().min(1),
  nickname: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(100)
    .refine((value) => value.length > 1, {
      message: '이름은 2글자 이상이어야 합니다.',
    }),
  detailJobId: z
    .string()
    .min(1, {
      message: '세부직군을 입력해주세요.',
    })
    .max(100)
    .refine((value) => value.length > 1, {
      message: '세부직군은 2글자 이상이어야 합니다.',
    }),
  interestDomain: z
    .array(z.string())
    .min(1, {
      message: '관심 도메인을 입력해주세요.',
    })
    .refine((value) => value.length > 0, {
      message: '관심 도메인은 1개 이상이어야 합니다.',
    }),
  summary: z
    .string()
    .min(1, {
      message: '한 줄 소개를 입력해주세요.',
    })
    .max(40, {
      message: '최대 40글자까지 입력 가능해요.',
    })
    .refine((value) => value.length > 1 && value.length < 40, {
      message: '한 줄 소개는 2글자 이상 40글자 이하로 작성해주세요.',
    }),
  organization: z
    .string()
    .min(1, {
      message: '소속 정보를 입력해주세요.',
    })
    .max(40, {
      message: '최대 40글자까지 입력 가능해요.',
    })
    .refine((value) => value.length > 1 && value.length < 40, {
      message: '소속 정보는 2글자 이상 40글자 이하로 작성해주세요.',
    })
    .optional(),
  sns: z
    .array(
      z.object({
        type: z.string(),
        link: z.string().url({
          message: '유효한 링크를 입력해주세요.',
        }),
      }),
    )
    .optional(),
  region: z
    .string()
    .min(1, {
      message: '최소 하나의  지역을 입력해주세요.',
    })
    .optional(),
  hobby: z
    .string()
    .min(1, {
      message: '취미를 입력해주세요.',
    })
    .max(40, {
      message: '최대 40글자까지 입력 가능해요.',
    })
    .optional(),
  news: z
    .string()
    .min(1, {
      message: '최근 소식을 입력해주세요.',
    })
    .max(40, {
      message: '최대 40글자까지 입력 가능해요.',
    })
    .optional(),
  content: z
    .array(
      z.object({
        type: z.enum(['project', 'blog']),
        title: z.string(),
        link: z.string().url({
          message: '유효한 링크를 입력해주세요.',
        }),
        imageUrl: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  project: z
    .array(
      z.object({
        type: z.enum(['project', 'blog']),
        title: z.string(),
        link: z.string().url({
          message: '유효한 링크를 입력해주세요.',
        }),
        imageUrl: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
});

export type CareerFormData = z.infer<typeof cardCreateSchema>;
