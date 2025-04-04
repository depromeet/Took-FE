'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import useCookies from '@/shared/hooks/useCookies';
import { sleep } from '@/shared/utils/sleep';

type LogoutPayload = {
  refreshToken: string;
};

const _logout = async (payload: LogoutPayload) => {
  const data = await client.post('/api/auth/logout', payload);

  return data;
};

const useLogout = () => {
  const router = useRouter();
  const { removeValue } = useCookies();

  const userDeleteData = useCallback(() => {
    removeValue('accessToken');
    removeValue('refreshToken');
    removeValue('userData');
  }, [removeValue]);

  const { mutate: logout } = useMutation({
    mutationFn: (payload: LogoutPayload) => _logout(payload),
    onSuccess: async () => {
      toast.success('로그아웃에 성공했습니다.');
      await sleep(1000);
      userDeleteData();
      router.push('/login');
    },
    onError: (error) => {
      console.error(error);
      toast.error('로그아웃에 실패했습니다.');
    },
  });

  return { logout };
};

export default useLogout;
