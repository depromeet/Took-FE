// api/cardQueries.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';

import { CardDetailDto } from '../../types/cardDetail';

// API 호출 함수

export const CARD_DETAIL_QUERY_KEY = 'cardDetail';

const getCardDetail = async (cardId: string, isLoggedIn: boolean): Promise<CardDetailDto> => {
  try {
    const baseUrl = `${CLIENT_SIDE_URL}/api/card`;
    const endpoint = isLoggedIn ? `${baseUrl}/detail` : `${baseUrl}/open/detail`;
    const data = await client.get<CardDetailDto>(`${endpoint}?cardId=${Number(cardId)}`);
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

// 받은 명함 삭제 API
const deleteReceivedCard = async (cardId: string) => {
  const data = await client.delete<any>(`${CLIENT_SIDE_URL}/api/card/receive`, {
    data: {
      cardIds: [Number(cardId)],
    },
  });
  return data;
};

// 카드 상세 정보를 가져오는 쿼리 훅
export const useCardDetailQuery = (cardId: string) => {
  const { isLoggedIn } = useIsLoggedIn();

  return useQuery({
    queryKey: [CARD_DETAIL_QUERY_KEY, cardId, isLoggedIn],
    queryFn: () => getCardDetail(cardId, isLoggedIn),
  });
};

// 카드 업데이트를 위한 mutation 훅
export const useUpdateCardMutation = () => {
  return useMutation({
    mutationFn: ({ cardId, memo }: { cardId: string; memo: string }) => updateReceiveCard(cardId, memo),
  });
};

// 받은 명함 삭제를 위한 mutation 훅
export const useDeleteReceivedCardMutation = () => {
  return useMutation({
    mutationFn: (cardId: string) => deleteReceivedCard(cardId),
  });
};

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
