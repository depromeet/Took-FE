import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';
import handleAxiosError from '@/shared/utils/handleAxiosError';

interface SaveCardResponse {
  id: number;
}

const saveCardAPI = async (id: string) => {
  const data = await client.post<ApiResponseType<SaveCardResponse>>(`${CLIENT_SIDE_URL}/api/card/receive`, {
    cardId: id,
  });
  return data;
};

export const useSaveCard = () => {
  return useMutation({
    mutationFn: (id?: string) => {
      if (!id) {
        return Promise.reject(new Error('명함 ID가 존재하지 않습니다.'));
      }
      return saveCardAPI(id);
    },
    onSuccess: () => {
      toast.success('명함이 저장되었습니다.');
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });
};
