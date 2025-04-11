import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import handleAxiosError from '@/shared/utils/handleAxiosError';

import { CardDetailDto } from '../../types/cardDetail';

const updateReceiveCard = async (cardId: string, memo: string) => {
  try {
    const response = await client.put<any, CardDetailDto>(`${CLIENT_SIDE_URL}/api/card/receive`, {
      cardId,
      memo,
    });
    return response.data;
  } catch (err) {
    handleAxiosError(err);
    throw err;
  }
};

// 카드 업데이트를 위한 mutation 훅
export const useUpdateCardMutation = () => {
  return useMutation({
    mutationFn: ({ cardId, memo }: { cardId: string; memo: string }) => updateReceiveCard(cardId, memo),
  });
};
