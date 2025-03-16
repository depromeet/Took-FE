// api/cardQueries.ts
import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { mockCardDetailData } from '../../mocks/sample';
import { CardDetailDto } from '../../types/cardDetail';

// API 호출 함수
const getCardDetail = async (cardId: number): Promise<CardDetailDto> => {
  const data = await client.get<CardDetailDto>(`${CLIENT_SIDE_URL}/api/card/detail?cardId=${cardId}`);
  return data;
};

// 카드 상세 정보를 가져오는 쿼리 훅
export const useCardDetailQuery = (cardId: number) => {
  const { data: _ } = useQuery({
    queryKey: ['cardDetail', cardId],
    queryFn: () => getCardDetail(cardId),
  });

  return { data: mockCardDetailData };
};
