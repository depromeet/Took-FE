import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';


const createCard = async (payload: FormData) => {
  const res = await client.post<ApiResponseType<null>>(`${CLIENT_SIDE_URL}/api/card`, payload);
  return res;
};

// 카드 생성 API 호출
export const useCreateCard = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      toast.success('명함 생성 성공');
      router.push('/home');
    },
    onError: (error) => {
      toast.error('명함 생성 실패');
      console.error('카드 생성 실패', error);
    },
  });
};
