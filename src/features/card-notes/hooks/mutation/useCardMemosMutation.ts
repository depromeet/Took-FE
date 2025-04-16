import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

type CardMemo = {
  cardId: number;
  memo: string;
};

type CardMemosRequest = {
  cardMemos: CardMemo[];
};

const cardMemosCard = async (data: CardMemosRequest) => {
  const response = await client.put<CardMemosRequest, ApiResponseType<object>>(
    `${CLIENT_SIDE_URL}/api/card/receive/memo/batch`,
    data,
  );
  return response.data;
};

// 카드 업데이트를 위한 mutation 훅
export const useCardMemosMutation = () => {
  return useMutation({
    mutationFn: (data: CardMemosRequest) => cardMemosCard(data),
  });
};
