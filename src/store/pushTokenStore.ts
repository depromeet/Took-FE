import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { webLogger } from '@/shared/lib/utils';

interface PushTokenState {
  expoToken: string | null;

  // 액션
  setExpoToken: (token: string | null) => void;
  clearToken: () => void;
}

export const usePushTokenStore = create<PushTokenState>()(
  persist(
    (set) => ({
      expoToken: null,

      setExpoToken: (token) => {
        webLogger.token('토큰 설정됨', { token });
        set(() => ({ expoToken: token }));
      },

      clearToken: () => {
        webLogger.token('토큰 초기화됨');
        set(() => ({ expoToken: null }));
      },
    }),
    {
      name: 'push-token-storage', // localStorage의 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    },
  ),
);

/**
 * 웹뷰에 푸시 토큰을 직접 요청하는 함수
 * 컴포넌트에서 직접 호출할 수 있는 유틸리티 함수
 */
export function requestPushTokenFromWebView() {
  if (typeof window === 'undefined' || !window.ReactNativeWebView) {
    webLogger.log('웹뷰 환경이 아니거나 ReactNativeWebView가 없습니다.');
    return false;
  }

  // 웹뷰에 토큰 요청
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: 'REQUEST_PUSH_TOKEN',
    }),
  );

  webLogger.token('푸시 토큰 요청 전송됨');
  return true;
}

// 웹뷰에서 받은 메시지를 통해 토큰 수신 처리
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    try {
      // 데이터가 문자열로 온 경우 파싱
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

      if (data.type === 'PUSH_TOKEN_RESPONSE' && data.data) {
        // Expo 토큰이 있는 경우에만 처리
        if (data.data.expoToken) {
          usePushTokenStore.getState().setExpoToken(data.data.expoToken);
          webLogger.token('웹뷰로부터 푸시 토큰 수신', data.data);
        }
      }
    } catch (error) {
      webLogger.error('메시지 처리 중 오류', error);
    }
  });
}

// 토큰을 초기화하는 함수 (window 객체나 이벤트에서 토큰을 받아왔을 때 호출)
export function initializePushToken() {
  if (typeof window === 'undefined') return;

  webLogger.token('토큰 초기화 시작');

  // 1. window 객체에서 토큰 확인
  if (window.pushTokenData && window.pushTokenData.expoToken) {
    usePushTokenStore.getState().setExpoToken(window.pushTokenData.expoToken);
    webLogger.token('window 객체에서 토큰 발견', window.pushTokenData);
    return;
  }

  // 2. 이벤트 리스너 등록 (앱에서 주입할 경우)
  window.addEventListener('pushTokenReceived', (event: any) => {
    if (event.detail && event.detail.expoToken) {
      usePushTokenStore.getState().setExpoToken(event.detail.expoToken);
      webLogger.token('이벤트를 통해 토큰 수신', event.detail);
    }
  });

  // 3. 앱에 토큰 요청 (ReactNativeWebView가 있는 경우)
  webLogger.token('앱에 토큰 요청 시도');
  requestPushTokenFromWebView();
}
