import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

import { CareerFormData } from '../../schema';

const createCard = async (payload: CareerFormData) => {
  const res = await client.post<ApiResponseType<any>>(`${CLIENT_SIDE_URL}/api/card`, payload);
  return res;
};

// 카드 생성 API 호출
export const useCreateCard = () => {
  return useMutation({
    mutationFn: createCard,
  });
};
