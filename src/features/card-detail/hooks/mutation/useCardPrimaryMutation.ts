import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

const updatePrimaryCard = async (cardId: number) => {
  const response = await client.post<number, ApiResponseType<object>>(`${CLIENT_SIDE_URL}/api/card/${cardId}/primary`);
  return response.data;
};

// 카드 업데이트를 위한 mutation 훅
export const useCardPrimaryMutation = () => {
  return useMutation({
    mutationFn: ({ cardId }: { cardId: number }) => updatePrimaryCard(cardId),
  });
};
