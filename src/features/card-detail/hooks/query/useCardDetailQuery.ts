// api/cardQueries.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { CardDetailDto } from '../../types/cardDetail';

// API 호출 함수

export const CARD_DETAIL_QUERY_KEY = 'cardDetail';

const getCardDetail = async (cardId: string): Promise<CardDetailDto> => {
  try {
    const baseUrl = `${CLIENT_SIDE_URL}/api/card`;
    const data = await client.get<CardDetailDto>(`${baseUrl}/detail?cardId=${Number(cardId)}`);
    return data;
  } catch (err) {
    // Axios 에러 처리
    if (axios.isAxiosError(err) && err.response) {
      (err as any).status = err.response.status;
    }
    throw err;
  }
};

const updateReceiveCard = async (cardId: string, memo: string) => {
  const response = await client.put<any, CardDetailDto>(`${CLIENT_SIDE_URL}/api/card/receive`, {
    cardId,
    memo,
  });
  return response.data;
};

// 카드 상세 정보를 가져오는 쿼리 훅
export const useCardDetailQuery = (cardId: string) => {
  return useQuery({
    queryKey: [CARD_DETAIL_QUERY_KEY, cardId],
    queryFn: () => getCardDetail(cardId),
  });
};

// 카드 업데이트를 위한 mutation 훅
export const useUpdateCardMutation = () => {
  return useMutation({
    mutationFn: ({ cardId, memo }: { cardId: string; memo: string }) => updateReceiveCard(cardId, memo),
  });
};

// export const receiveCard = async (id: string) => {
//   try {
//     const response = await client.get<any>(`${CLIENT_SIDE_URL}/api/card/receive?folderId=${id}`);
//     return response.data;
//   } catch (err) {
//     // Axios 에러 처리
//     if (axios.isAxiosError(err) && err.response) {
//       (err as any).status = err.response.status;
//     }
//     throw err;
//   }
// };

// export const useReceiveCard = (id: string) => {
//   return useQuery({
//     queryKey: ['receivedCard', id],
//     queryFn: () => receiveCard(id),
//   });
// };
