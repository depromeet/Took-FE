import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import handleAxiosError from '@/shared/utils/handleAxiosError';

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
    onSuccess: () => {
      toast.success('명함 수정 완료');
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });
};
