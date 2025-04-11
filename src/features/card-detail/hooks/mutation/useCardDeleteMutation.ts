import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import handleAxiosError from '@/shared/utils/handleAxiosError';

//내 명함 삭제 API
const deleteMyCard = async (cardId: string) => {
  try {
    const data = await client.delete<any>(`${CLIENT_SIDE_URL}/api/card/${cardId}`);
    return data;
  } catch (err) {
    handleAxiosError(err);
    throw err;
  }
};

export const useDeleteMyCardMutation = () => {
  return useMutation({
    mutationFn: (cardId: string) => deleteMyCard(cardId),
  });
};

// 받은 명함 삭제 API
const deleteReceivedCard = async (cardId: string) => {
  try {
    const data = await client.delete<any>(`${CLIENT_SIDE_URL}/api/car/receive`, {
      data: {
        cardIds: [Number(cardId)],
      },
    });
    return data;
  } catch (err) {
    handleAxiosError(err);
    throw err;
  }
};

export const useDeleteReceivedCardMutation = () => {
  return useMutation({
    mutationFn: (cardId: string) => deleteReceivedCard(cardId),
  });
};
