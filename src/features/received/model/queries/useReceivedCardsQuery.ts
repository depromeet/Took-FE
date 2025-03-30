import { useQuery } from '@tanstack/react-query';
import { MyCardDto, Card } from '@/features/home/types'; // MyCardDto와 Card 가져오기
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

// 서버에서 데이터를 가져오는 함수
const _getReceivedCards = async (folderId: number | null) => {
  const url =
    folderId !== null
      ? `${CLIENT_SIDE_URL}/api/card/receive?folderId=${folderId}`
      : `${CLIENT_SIDE_URL}/api/card/receive`;

  try {
    const { data } = await client.get<MyCardDto>(url);
    console.log('서버로부터 받은 데이터 : ', data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useReceivedCardsQuery = (folderId: number | null) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: () => _getReceivedCards(folderId),
  });

  return { cards: data?.cards ?? [], isLoading, isError };
};
