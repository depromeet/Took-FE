// api/cardQueries.ts
import { useQuery } from '@tanstack/react-query';

import { MyCardDto } from '@/features/home/types';
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { mockReceivedCardDetailData } from '../../mocks/receivedCardDetail';
//import { CardDetailDto } from '../../types/cardDetail';
import { ReceivedCardDetailDto } from '../../types/receivedCardDetail';

// API 호출 함수
const getCardDetail = async (cardId: number): Promise<ReceivedCardDetailDto> => {
  const data = await client.get<ReceivedCardDetailDto>(`${CLIENT_SIDE_URL}/api/card/detail?cardId=${cardId}`);
  return data;
};

// 내 명함 목록 조회
const getMyCard = async (): Promise<MyCardDto> => {
  const data = await client.get<MyCardDto>(`${CLIENT_SIDE_URL}/api/card/my`);
  return data;
};

// 카드 상세 정보를 가져오는 쿼리 훅
export const useCardDetailQuery = (cardId: number) => {
  const { data: _ } = useQuery({
    queryKey: ['cardDetail', cardId],
    queryFn: () => getCardDetail(cardId),
  });

  return { data: mockReceivedCardDetailData };
};

// 내 명함 목록 조회
export const useMyCardQuery = () => {
  const data = useQuery({
    queryKey: ['myCard'],
    queryFn: () => getMyCard(),
  });

  return data;
};
