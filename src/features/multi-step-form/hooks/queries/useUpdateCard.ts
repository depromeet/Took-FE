import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { useCardFormStore } from '@/shared/store/cardFormState';
import { ApiResponseType } from '@/shared/types';

// 카드 업데이트 API 호출 함수
const updateCard = async ({ cardId, formData }: { cardId: string; formData: FormData }) => {
  const res = await client.put<ApiResponseType<null>>(`${CLIENT_SIDE_URL}/api/card/${cardId}`, formData);
  return res;
};

// 카드 업데이트 API 훅
export const useUpdateCard = (reset: () => void) => {
  const router = useRouter();
  const resetTagCount = useCardFormStore((state) => state.resetTagCount);

  return useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      toast.success('명함 수정 성공');
      router.replace('/');
      reset();
      resetTagCount();
    },
    onError: (error) => {
      toast.error('명함 수정 실패');
      reset();
      resetTagCount();
      console.error('카드 수정 실패', error);
    },
  });
};
