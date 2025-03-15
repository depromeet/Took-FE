import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { CARD_MOCK } from '../../mocks';

export const CARD_QUERY_KEY = 'CARD_QUERY_KEY';

const _getCard = async (params: any) => {
  const data = await client.get<any>(`${CLIENT_SIDE_URL}/api/card/my`, {
    params,
  });

  return data;
};

export const useCardQuery = (params?: any) => {
  const { data: _ } = useQuery({
    queryKey: [CARD_QUERY_KEY, params],
    queryFn: () => _getCard(params),
  });

  return { data: CARD_MOCK };
};
