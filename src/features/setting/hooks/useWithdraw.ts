'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import useCookies from '@/shared/hooks/useCookies';
import { sleep } from '@/shared/utils/sleep';

type WithdrawPayload = {
  refreshToken: string;
  reasons?: string[];
  directMessage?: string;
};

const _withdraw = async (payload: WithdrawPayload) => {
  const data = await client.post('/api/auth/withdraw', payload);
  return data;
};

// 사용자 계정을 비활성화 하고 토크을 무효화 합니다.
const useWithdraw = () => {
  const router = useRouter();
  const { removeValue } = useCookies();

  // 회원탈퇴 시 모든 쿠키 삭제
  const userDeleteData = useCallback(() => {
    removeValue('accessToken');
    removeValue('refreshToken');
    removeValue('userData');
    // 기타 필요한 쿠키 삭제
  }, [removeValue]);

  const { mutate: withdraw } = useMutation({
    mutationFn: (payload: WithdrawPayload) => _withdraw(payload),
    onSuccess: async () => {
      toast.success('회원탈퇴가 완료되었습니다.');
      await sleep(2000); // 2초 대기
      userDeleteData();
      router.push('/login'); // 로그인 페이지로 이동
    },
    onError: (error) => {
      console.error(error);
      toast.error('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return { withdraw };
};

export default useWithdraw;
