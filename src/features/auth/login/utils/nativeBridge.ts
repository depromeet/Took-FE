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

export function sendGoogleLoginMessage() {
  try {
    // 앱으로 메시지 전송
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'GOOGLE_LOGIN',
      }),
    );
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
