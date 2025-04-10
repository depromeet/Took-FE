// api/cardQueries.ts
import { useQuery } from '@tanstack/react-query';
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

// 카드 상세 정보를 가져오는 쿼리 훅
export const useCardDetailQuery = (cardId: string) => {
  const { isLoggedIn } = useIsLoggedIn();

  return useQuery({
    queryKey: [CARD_DETAIL_QUERY_KEY, cardId, isLoggedIn],
    queryFn: () => getCardDetail(cardId, isLoggedIn),
  });
};
