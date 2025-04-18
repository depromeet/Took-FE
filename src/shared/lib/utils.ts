import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 웹뷰 로깅 유틸리티
 * 네이티브 앱으로 로그를 전송하는 기능을 제공합니다.
 */

// 웹뷰 환경인지 확인
const isWebView = (): boolean => {
  return typeof window !== 'undefined' && !!window.ReactNativeWebView;
};

// 로그 레벨 타입
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// 네이티브 앱으로 로그 전송
const sendToNative = (level: LogLevel, ...messages: any[]): void => {
  if (!isWebView()) return;

  try {
    // 객체를 문자열로 변환
    const formattedMessages = messages
      .map((msg) => (typeof msg === 'object' ? JSON.stringify(msg) : String(msg)))
      .join(' ');

    // 로그 데이터 구성
    const logData = {
      type: 'LOG',
      level,
      timestamp: new Date().toISOString(),
      message: formattedMessages,
    };

    // 네이티브 앱으로 전송
    window.ReactNativeWebView.postMessage(JSON.stringify(logData));
  } catch (error) {
    // 오류 발생 시 콘솔에 출력
    console.error('네이티브 로그 전송 실패:', error);
  }
};

// 웹뷰 로거
export const webLogger = {
  // 일반 로그 메서드
  log: (...messages: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(...messages);
    }
    sendToNative('info', ...messages);
  },

  token: (message: string, data?: any) => {
    const tokenMsg = data ? `[푸시 토큰] ${message}: ${JSON.stringify(data)}` : `[푸시 토큰] ${message}`;

    if (process.env.NODE_ENV !== 'production') {
      console.info(tokenMsg);
    }

    sendToNative('info', tokenMsg);
  },

  // 에러 로그
  error: (...messages: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(...messages);
    }
    sendToNative('error', ...messages);
  },
};
