import { useMutation } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

type ScrapType = 'blog' | 'project';

type ScrapPayload = {
  link: string;
};

const postScapLink = async ({ payload, type }: { payload: ScrapPayload; type: ScrapType }) => {
  const res = await client.post<ApiResponseType<any>>(`${CLIENT_SIDE_URL}/api/card`, payload, {
    params: {
      type,
    },
  });
  return res;
};

export const useScrap = () => {
  return useMutation({
    mutationFn: postScapLink,
    onSuccess: (data) => {
      console.log('스크랩 성공', data);
    },
    onError: (error) => {
      console.log('스크랩 실패', error);
    },
  });
};
