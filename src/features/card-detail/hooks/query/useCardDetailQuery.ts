// api/cardQueries.ts
import { useSuspenseQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { mockCardDetailData } from '../../mocks/sample';
import { CardDetailDto } from '../../types/cardDetail';

// API 호출 함수

export const CARD_DETAIL_QUERY_KEY = 'cardDetail';

const getCardDetail = async (cardId: number): Promise<CardDetailDto> => {
  if (cardId === 123) {
    // 특정 ID일 때 에러 발생 (원하는 조건으로 변경 가능)
    throw new Error('카드 정보를 불러오는 중 오류가 발생했습니다.');
  }

  const data = await client.get<CardDetailDto>(`${CLIENT_SIDE_URL}/api/card/detail?cardId=${cardId}`);
  return data;
};

// 카드 상세 정보를 가져오는 쿼리 훅
export const useCardDetailQuery = (cardId: number) => {
  const { data: _ } = useSuspenseQuery({
    queryKey: [CARD_DETAIL_QUERY_KEY, cardId],
    queryFn: () => getCardDetail(cardId),
  });

  return { data: mockCardDetailData };
};
