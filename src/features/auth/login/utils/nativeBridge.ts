// 네이티브 메시지 타입 정의
export type NativeMessageType = 'GOOGLE_LOGIN';

export interface NativeMessage {
  type: NativeMessageType;
  url?: string;
  data?: any;
}

// 네이티브 메시지 전송 함수
export const sendMessageToNative = (message: NativeMessage) => {
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }
};

// 구글 로그인 메시지 전송 헬퍼 함수
export const sendGoogleLoginMessage = (url: string) => {
  sendMessageToNative({
    type: 'GOOGLE_LOGIN',
    url
  });
};