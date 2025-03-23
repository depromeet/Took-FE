import { useQuery } from '@tanstack/react-query';

import { MyCardDto } from '@/features/home/types';
import { client } from '@/shared/apis/client';

import { RECEIVED_CARD_MOCK } from '../../config';

const _getReceivedCard = async () => {
  const data = await client.get<MyCardDto>('받은명함가져오기API');

  return data;
};

export const useReceivedCardQuery = () => {
  const { data: _ } = useQuery({
    queryKey: [''],
    queryFn: () => _getReceivedCard(),
  });

  return { data: RECEIVED_CARD_MOCK }; // 추후 API 호출을 통해 받은 데이터로 수정
};
