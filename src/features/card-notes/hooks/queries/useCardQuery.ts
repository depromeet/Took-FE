import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';

import { MOCK_DATA } from '../../mocks';
import { CardNotesDto } from '../../types/index';

export const MY_CARD_NOTES_QUERY_KEY = 'MY_CARD_QUERY_KEY';

const _getCard = async () => {
  const { data } = await client.get<CardNotesDto>(`/api/card/my`);

  return data;
};

export const useCardQuery = () => {
  const { data: _ } = useQuery({
    queryKey: [MY_CARD_NOTES_QUERY_KEY],
    queryFn: () => _getCard(),
  });

  return { data: MOCK_DATA };
};
