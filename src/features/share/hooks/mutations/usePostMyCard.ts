import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';

const _postMyCard = async (userId: number, cardId: number) => {
  await client.post(`/api/card/send`, {
    targetUserId: userId,
    cardId,
  });
};

export const usePostMyCard = () => {
  return useMutation({
    mutationFn: ({ userId, cardId }: { userId: number; cardId: number }) => _postMyCard(userId, cardId),
    onSuccess: () => {
      toast.success('내 명함을 전송했어요.');
    },
  });
};
