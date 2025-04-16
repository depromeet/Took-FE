import { AuthDto } from '../types/auth';

// 네이티브 메시지 타입 정의
export type NativeMessageType = 'GOOGLE_LOGIN' | 'IMAGE_PICKER' | 'SHARE_CARD_DEEP_LINK' | 'AUTH_TOKEN';

// 네이티브 메시지 인터페이스 정의
export interface NativeMessage {
  type: NativeMessageType;
  url?: string;
  source?: 'camera' | 'library'; // 카메라 또는 갤러리 선택
  data?: {
    cardId?: string;
    type?: 'receivedcard';
    shouldSave?: boolean;
    accessToken?: string;
    refreshToken?: string;
    userData?: any;
  };
}

// 네이티브 메시지 전송 함수
export const sendMessageToNative = (message: NativeMessage) => {
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }
};

// 로그인 토큰 전송 함수
export const sendAuthTokenMessage = (tokenData: AuthDto) => {
  try {
    sendMessageToNative({
      type: 'AUTH_TOKEN',
      data: {
        accessToken: tokenData.data.data.token.accessToken,
        refreshToken: tokenData.data.data.token.refreshToken,
        userData: tokenData.data.data.user,
      },
    });
  } catch (error) {
    console.error('네이티브 브릿지 메시지 전송 실패:', error);
  }
};

export function sendGoogleLoginMessage() {
  try {
    // 앱으로 메시지 전송
    sendMessageToNative({
      type: 'GOOGLE_LOGIN',
    });
  } catch (error) {
    console.error('네이티브 브릿지 메시지 전송 실패:', error);
  }
}

// 이미지 선택 메시지 전송 헬퍼 함수
export const sendImagePickerMessage = (source: 'camera' | 'library') => {
  sendMessageToNative({
    type: 'IMAGE_PICKER',
    source,
  });
};
