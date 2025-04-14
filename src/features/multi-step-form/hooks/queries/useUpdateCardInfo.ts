import { useMutation } from '@tanstack/react-query';

import { OpenCardDto } from '@/features/share/types';
import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';

const updateCardInfo = async (id: string) => {
  const data = await client.get<OpenCardDto>(`${CLIENT_SIDE_URL}/api/card/open`, {
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
