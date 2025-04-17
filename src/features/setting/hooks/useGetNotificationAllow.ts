import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';
import { ApiResponseType } from '@/shared/types';

import { NotificationType } from './useGetNotificationList';

type NotificationArrowResponse = {
  isAllowPush: boolean;
  allowPushContent: NotificationType[];
};

const _getNotificationAllow = async () => {
  const data = await client.get<ApiResponseType<NotificationArrowResponse>>(
    `${CLIENT_SIDE_URL}/api/user/notification-allow`,
  );
  return data;
};

const NOTIFICATION_ARROW_KEY = '@/setting/notification-arrow';

// 알림 설정을 조회합니다.
const useGetNotificationAllow = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return useQuery({
    queryKey: [NOTIFICATION_ARROW_KEY],
    queryFn: () => _getNotificationAllow(),
    enabled: isLoggedIn,
    select: (data) => data.data,
  });
};

export default useGetNotificationAllow;
