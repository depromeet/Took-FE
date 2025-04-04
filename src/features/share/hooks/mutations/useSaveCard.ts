import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

interface SaveCardResponse {
  id: number;
}

const saveCard = async (id: string) => {
  const data = await client.post<ApiResponseType<SaveCardResponse>>(`${CLIENT_SIDE_URL}/api/card/receive`, {
    cardId: id,
  });
  return data;
};

export const useSaveCard = () => {
  return useMutation({
    mutationFn: saveCard,
  });
};
