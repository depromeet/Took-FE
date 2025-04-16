import { useEffect } from 'react';

import { usePushTokenStore, initializePushToken, requestPushTokenFromWebView } from '@/store/pushTokenStore';

import useDevice from './useDevice';

/**
 * 푸시 토큰 관리를 위한 커스텀 훅
 *
 * - 웹뷰 환경에서 자동으로 토큰 요청 (필요시)
 * - 소셜 로그인 API 요청 시 사용할 토큰 제공
 */
export default function usePushToken() {
  const { isWebView } = useDevice();
  const { expoToken } = usePushTokenStore();

  // 웹뷰 환경에서 마운트 시 토큰 초기화
  useEffect(() => {
    if (isWebView) {
      initializePushToken();
    }
  }, [isWebView]);

  /**
   * 웹뷰에 직접 푸시 토큰을 요청하는 함수
   * (명시적으로 토큰 요청이 필요한 경우 사용)
   */
  const requestToken = () => {
    if (isWebView) {
      return requestPushTokenFromWebView();
    }
    return false;
  };

  /**
   * 서버 API에 전달할 expoToken을 포함한 객체 반환
   * 소셜 로그인 API 요청 등에서 사용
   */
  const getTokenForAPI = () => {
    // 웹뷰 환경이고 토큰이 있는 경우에만 반환
    if (isWebView && expoToken) {
      return { expoToken };
    }

    // 그 외의 경우 null 반환
    return { expoToken: null };
  };

  return {
    expoToken,
    isWebView,
    hasToken: !!expoToken,
    requestToken,
    getTokenForAPI,
  };
}
