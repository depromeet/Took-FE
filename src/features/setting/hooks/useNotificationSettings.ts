'use client';

import { useState, useCallback, useEffect } from 'react';

import { sendMessageToNative } from '@/shared/utils/nativeBridge';

import useGetNotificationAllow from './useGetNotificationAllow';
import { NotificationType } from './useGetNotificationList';

type NotificationSettings = {
  all: boolean;
  interesting: boolean;
  oneLineMemo: boolean;
  serviceUpdate: boolean;
};

type NotificationToggleType = keyof NotificationSettings;

/**
 * 알림 설정을 관리하는 커스텀 훅
 * @returns 알림 설정 상태와 제어 함수들
 */
export const useNotificationSettings = () => {
  const [isAlarmOn, setIsAlarmOn] = useState<NotificationSettings>({
    all: false,
    interesting: false,
    oneLineMemo: false,
    serviceUpdate: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: notification } = useGetNotificationAllow();

  useEffect(() => {
    if (notification) {
      notification.allowPushContent.forEach((type) => {
        if (type === 'INTERESTING') {
          setIsAlarmOn((prev) => ({ ...prev, interesting: true }));
        }
        if (type === 'MEMO') {
          setIsAlarmOn((prev) => ({ ...prev, oneLineMemo: true }));
        }
        if (type === 'SYSTEM') {
          setIsAlarmOn((prev) => ({ ...prev, serviceUpdate: true }));
        }
      });
    }
  }, [notification]);

  // API 요청을 위한 데이터 변환
  const getApiPayload = useCallback(() => {
    // 체크된 알림 항목만 필터링
    const allowedTypes: NotificationType[] = [];
    if (isAlarmOn.interesting) allowedTypes.push('INTERESTING');
    if (isAlarmOn.oneLineMemo) allowedTypes.push('MEMO');
    if (isAlarmOn.serviceUpdate) allowedTypes.push('SYSTEM');

    const isAllowPush = allowedTypes.length > 0;

    return {
      isAllowPush: isAllowPush,
      allowPushContent: allowedTypes,
    };
  }, [isAlarmOn]);

  // 알림 설정 저장 API 호출
  const saveNotificationSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const payload = getApiPayload();

      // 네이티브 앱에 알림 설정 변경 알리기
      sendMessageToNative({
        type: 'NOTIFICATION_SETTINGS_CHANGED',
        notificationAllow: payload,
      });
    } catch (error) {
      console.error('알림 설정 저장 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [getApiPayload]);

  // 알림 설정 토글
  const handleToggleAlarm = useCallback(
    (type: NotificationToggleType) => {
      let newSettings: NotificationSettings;

      if (type === 'all') {
        // 전체 알림 토글
        newSettings = {
          all: !isAlarmOn.all,
          interesting: !isAlarmOn.all,
          oneLineMemo: !isAlarmOn.all,
          serviceUpdate: !isAlarmOn.all,
        };
      } else {
        // 개별 알림 토글 - 해당 알림만 변경
        const toggledValue = !isAlarmOn[type];
        newSettings = {
          ...isAlarmOn,
          [type]: toggledValue,
        };

        // 모든 개별 알림이 켜진 경우에만 전체 알림도 켜짐
        // 하나라도 꺼진 경우 전체 알림은 꺼짐
        const allEnabled =
          (type === 'interesting' ? toggledValue : isAlarmOn.interesting) &&
          (type === 'oneLineMemo' ? toggledValue : isAlarmOn.oneLineMemo) &&
          (type === 'serviceUpdate' ? toggledValue : isAlarmOn.serviceUpdate);

        newSettings.all = allEnabled;
      }

      setIsAlarmOn(newSettings);

      // 디바운스 처리를 위한 타이머
      const timerId = setTimeout(() => {
        saveNotificationSettings();
      }, 300);

      return () => clearTimeout(timerId);
    },
    [isAlarmOn, saveNotificationSettings],
  );

  return {
    isAlarmOn,
    isLoading,
    handleToggleAlarm,
  };
};
