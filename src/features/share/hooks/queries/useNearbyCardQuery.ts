import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';

import { NearbyUserResponseDto } from '../../types';

export const RECEIVED_NEAR_BY_CARDS_QUERY_KEY = 'RECEIVED_NEAR_BY_CARDS_QUERY_KEY';

const _getNearbyCards = async (latitude: number, longitude: number) => {
  const { data } = await client.get<NearbyUserResponseDto>(`/api/user/nearby`, {
    headers: {
      'x-redis-geo': `${latitude}, ${longitude}`,
    },
  });

  return data;
};

export const useNearbyCardsQuery = (latitude: number | undefined, longitude: number | undefined) => {
  return useQuery({
    queryKey: [RECEIVED_NEAR_BY_CARDS_QUERY_KEY, latitude, longitude],
    queryFn: () => _getNearbyCards(latitude ?? 0, longitude ?? 0),
    enabled: !!latitude && !!longitude,
  });
};
