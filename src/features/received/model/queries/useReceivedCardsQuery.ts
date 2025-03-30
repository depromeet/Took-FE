import { useQuery } from '@tanstack/react-query';

import { MyCardDto } from '@/features/home/types';
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

const _getReceivedCards = async (folderId: number | null) => {
  const url =
    folderId !== null
      ? `${CLIENT_SIDE_URL}/api/card/receive?folderId=${folderId}`
      : `${CLIENT_SIDE_URL}/api/card/receive`;

  try {
    const { data } = await client.get<MyCardDto>(url);
    console.log('서버로부터 받은 데이터 : ', data); // 추후 지우기
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useReceivedCardsQuery = (folderId: number | null) => {
  const { data, isLoading, isError } = useQuery({
    // const { data: _ } = useQuery({
    queryKey: ['cards'],
    queryFn: () => _getReceivedCards(folderId),
  });

  return { cards: data?.cards ?? [], isLoading, isError };
  // return { data: RECEIVED_CARD_MOCK };
};
