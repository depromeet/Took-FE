import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';
import handleAxiosError from '@/shared/utils/handleAxiosError';

import { NotificationType } from './useGetNotificationList';

type NotificationArrowPayload = {
  isAllowPush: boolean;
  allowPushContent: NotificationType[];
};

const _patchNotificationAllow = async (payload: NotificationArrowPayload) => {
  const data = await client.put<ApiResponseType<any>>(`${CLIENT_SIDE_URL}/api/notification/allow`, payload);
  return data;
};

const usePatchNotificationArrow = () => {
  return useMutation({
    mutationFn: (params: NotificationArrowPayload) => _patchNotificationAllow(params),
    onSuccess: () => {
      toast.success('알림 설정이 변경되었습니다.');
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });
};

export default usePatchNotificationArrow;
