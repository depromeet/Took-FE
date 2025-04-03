import { useQuery } from '@tanstack/react-query';

import { MyCardDto } from '@/features/home/types';
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

export const CARD_QUERY_KEY = 'CARD_QUERY_KEY';

// 서버에서 데이터를 가져오는 함수
const _getReceivedCards = async (folderId?: number | null) => {
  const url =
    folderId !== null
      ? `${CLIENT_SIDE_URL}/api/card/receive?folderId=${folderId}`
      : `${CLIENT_SIDE_URL}/api/card/receive`;

  try {
    const { data } = await client.get<MyCardDto>(url);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useReceivedCardsQuery = (folderId?: number | null) => {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [CARD_QUERY_KEY, folderId],
    queryFn: () => _getReceivedCards(folderId ?? null),
  });

  return { cards: data?.cards ?? [], isLoading, isFetching, isError, refetch };
};
