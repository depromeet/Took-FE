import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';

import { MyCardDto } from '../../types';

export const MY_CARD_QUERY_KEY = 'MY_CARD_QUERY_KEY';

const _getCard = async () => {
  const { data } = await client.get<MyCardDto>(`/api/card/my`);

  return data;
};

export const useCardQuery = () => {
  return useQuery({
    queryKey: [MY_CARD_QUERY_KEY],
    queryFn: () => _getCard(),
  });
};
