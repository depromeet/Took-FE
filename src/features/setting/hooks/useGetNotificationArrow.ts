import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/apis/client';
import { CLIENT_SIDE_URL } from '@/shared/constants';
import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';
import { ApiResponseType } from '@/shared/types';

type PushContent = '한 줄 메모 알림' | '흥미로운 명함 알림' | '서비스 업데이트 알림';

type NotificationArrowResponse = {
  isAllowPush: boolean;
  allowPushContent: PushContent[];
};

const _getNotificationArrow = async () => {
  const data = await client.get<ApiResponseType<NotificationArrowResponse>>(
    `${CLIENT_SIDE_URL}/api/notification/arrow`,
  );
  return data;
};

const NOTIFICATION_ARROW_KEY = '@/setting/notification-arrow';

// 알림 설정을 조회합니다.
const useGetNotificationArrow = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return useQuery({
    queryKey: [NOTIFICATION_ARROW_KEY],
    queryFn: () => _getNotificationArrow(),
    enabled: isLoggedIn,
  });
};

export default useGetNotificationArrow;
