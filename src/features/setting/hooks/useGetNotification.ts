import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

import { NotificationType } from './useGetNotificationList';

type NotificationDto = {
  isAllowPush: boolean;
  allowPushContent: NotificationType[];
};

const NOTIFICATION_KEY = '@/setting/notification';

const _getNotification = async () => {
  const data = await client.get<ApiResponseType<NotificationDto>>(`${CLIENT_SIDE_URL}/api/notification`);
  return data;
};

export const useGetNotification = () => {
  return useQuery({
    queryKey: [NOTIFICATION_KEY],
    queryFn: () => _getNotification(),
    select: (data) => data.data,
  });
};
