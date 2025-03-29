import { useQuery } from '@tanstack/react-query';

import { MyCardDto } from '@/features/home/types';
import { client } from '@/shared/apis/client';

import { CARD_MOCK } from '../../mocks';

export const MY_CARD_QUERY_KEY = 'MY_CARD_QUERY_KEY';

const _getCard = async () => {
  const data = await client.get<MyCardDto>(`/api/card/my`);

  return data;
};

export const useCardQuery = () => {
  const { data: _ } = useQuery({
    queryKey: [MY_CARD_QUERY_KEY],
    queryFn: () => _getCard(),
  });

  return { data: CARD_MOCK };
};
