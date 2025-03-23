import { z } from 'zod';

export const userQuitSchema = z.object({
  reasons: z.array(z.string()).min(1, { message: '최소 1개 이상 선택해주세요' }),
});

export type UserQuitSchema = z.infer<typeof userQuitSchema>;
