import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

//내 명함 삭제 API
const deleteMyCard = async (cardId: string) => {
  const data = await client.delete<any>(`${CLIENT_SIDE_URL}/api/card/${cardId}`);
  return data;
};

export const useDeleteMyCardMutation = () => {
  return useMutation({
    mutationFn: (cardId: string) => deleteMyCard(cardId),
  });
};

// 받은 명함 삭제 API
const deleteReceivedCard = async (cardId: string) => {
  const data = await client.delete<any>(`${CLIENT_SIDE_URL}/api/card/receive`, {
    data: {
      cardIds: [Number(cardId)],
    },
  });
  return data;
};

export const useDeleteReceivedCardMutation = () => {
  return useMutation({
    mutationFn: (cardId: string) => deleteReceivedCard(cardId),
  });
};
