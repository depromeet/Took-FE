// 전역 타입 선언
declare global {
  interface Window {
    pushTokenData?: {
      expoToken?: string | null;
      fcmToken?: string | null;
    };
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

// 이 파일이 모듈로 인식되도록 export {}를 추가
export {};
