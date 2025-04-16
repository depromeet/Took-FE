import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { ApiResponseType } from '@/shared/types';

import { CardNotesDto } from '../../types/index';

export const MY_CARD_NOTES_QUERY_KEY = 'MY_CARD_QUERY_KEY';

const _getCard = async () => {
  const response = await client.get<ApiResponseType<CardNotesDto>>(`/api/card/receive/memo`);
  return response.data;
};

export const useCardQuery = () => {
  return useQuery({
    queryKey: [MY_CARD_NOTES_QUERY_KEY],
    queryFn: () => _getCard(),
  });
};
