import { useQuery } from '@tanstack/react-query';

import { MyCardDto } from '@/features/home/types';
import { client } from '@/shared/apis/client';

export const FOLDER_QUERY_KEY = 'FOLDER_QUERY_KEY';

const _getFolders = async () => {
  const { data } = await client.get<MyCardDto>(`/api/card/folders`);

  return data;
};

export const useReceivedCardQuery = () => {
  const { data } = useQuery({
    queryKey: [FOLDER_QUERY_KEY], // 추후 수정
    queryFn: _getFolders,
  });

  return { data };
};
