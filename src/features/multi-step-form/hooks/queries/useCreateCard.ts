import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

const createCard = async (payload: FormData) => {
  const res = await client.post<ApiResponseType<null>>(`${CLIENT_SIDE_URL}/api/card`, payload);
  return res;
};

// 카드 생성 API 호출
export const useCreateCard = () => {
  return useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      console.log('카드 생성 성공', data);
    },
    onError: (error) => {
      console.error('카드 생성 실패', error);
    },
  });
};
