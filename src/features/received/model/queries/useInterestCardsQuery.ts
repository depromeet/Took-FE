import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

import { InterestCardsDto } from '../../types/interestCards';

export const CARD_QUERY_KEY = 'CARD_QUERY_KEY';

// 서버에서 데이터를 가져오는 함수
const _getInterestCards = async () => {
  const url = `${CLIENT_SIDE_URL}/api/card/receive/interesting`;

  try {
    const response = await client.get<ApiResponseType<InterestCardsDto>>(url);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useInterestCardsQuery = () => {
  return useQuery({
    queryKey: [CARD_QUERY_KEY],
    queryFn: () => _getInterestCards(),
  });
};
