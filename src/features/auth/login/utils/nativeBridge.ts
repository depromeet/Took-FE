// 네이티브 메시지 타입 정의
export type NativeMessageType = 'GOOGLE_LOGIN' | 'IMAGE_PICKER';

// 네이티브 메시지 인터페이스 정의
export interface NativeMessage {
  type: NativeMessageType;
  url?: string;
  source?: 'camera' | 'library'; // 카메라 또는 갤러리 선택
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
    url,
  });
};

// 이미지 선택 메시지 전송 헬퍼 함수
export const sendImagePickerMessage = (source: 'camera' | 'library') => {
  sendMessageToNative({
    type: 'IMAGE_PICKER',
    source,
  });
};
