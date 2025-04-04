import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';

import { OpenCardDto } from '../../types';

export const RECEVIED_CARD_SHARE_QUERY_KEY = 'RECEVIED_CARD_SHARE_QUERY_KEY';

const _getCard = async (id: string) => {
  const data = await client.get<OpenCardDto>(`/api/card/open`, {
    params: {
      cardId: id,
    },
  });
  return data;
};

export const useCardQuery = (id: string) => {
  return useQuery({
    queryKey: [RECEVIED_CARD_SHARE_QUERY_KEY],
    queryFn: () => _getCard(id),
  });
};
