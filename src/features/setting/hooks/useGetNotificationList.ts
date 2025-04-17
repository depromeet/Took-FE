import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { ApiResponseType } from '@/shared/types';

import { formatTimeAgo } from '../utils';

export type NotificationType = 'MEMO' | 'INTERESTING' | 'SYSTEM';

export type NotificationListType = {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  link: string;
  sendAt: string;
};

type NotificationListResponse = {
  notifications: NotificationListType[];
};

const _getNotificationList = async () => {
  const data = await client.get<ApiResponseType<NotificationListResponse>>(`${CLIENT_SIDE_URL}/api/notification`);
  return data;
};

const NOTIFICATION_LIST_KEY = '@/setting/notification-list';

export const useGetNotificationList = () => {
  return useQuery({
    queryKey: [NOTIFICATION_LIST_KEY],
    queryFn: () => _getNotificationList(),
    select: (data) => {
      return data.data.notifications.map((notification) => ({
        ...notification,
        sendAt: formatTimeAgo(notification.sendAt),
      }));
    },
  });
};
