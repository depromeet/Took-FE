import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

type ScrapType = 'BLOG' | 'PROJECT';

type ScrapPayload = {
  link: string;
};

type ScrapResponse = {
  title: string;
  link: string;
  imageUrl: string;
  description: string;
};

const postScapLink = async ({ payload, type }: { payload: ScrapPayload; type: ScrapType }) => {
  const res = (await client.post<ApiResponseType<ScrapResponse>>(`${CLIENT_SIDE_URL}/api/card/scrap`, payload, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
      type,
    },
  })) as AxiosResponse<ApiResponseType<ScrapResponse>>;

  return res.data;
};

export const useScrap = () => {
  return useMutation<ApiResponseType<ScrapResponse>, unknown, { payload: ScrapPayload; type: ScrapType }>({
    mutationFn: postScapLink,
    onSuccess: () => {},
    onError: () => {},
  });
};
