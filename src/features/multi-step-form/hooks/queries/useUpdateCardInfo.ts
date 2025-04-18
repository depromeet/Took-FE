import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

import { CardUpdateDto } from '../../types';

const updateCardInfo = async (id: string) => {
  const data = await client.get<CardUpdateDto>(`${CLIENT_SIDE_URL}/api/card/detail`, {
    params: {
      cardId: id,
    },
  });
  return data;
};

export const useUpdateCardInfo = () => {
  return useMutation({
    mutationFn: updateCardInfo,
  });
};
