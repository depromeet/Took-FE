// src/shared/config/errorConfig.ts
import axios from 'axios';

// 에러 유형에 따른 설정 정의
export type ErrorConfig = {
  message: string;
  buttonText: string;
  buttonAction: () => void;
};

// 기본 에러 설정
export const DEFAULT_ERROR_CONFIG: ErrorConfig = {
  message: '알 수 없는 오류가 발생했습니다',
  buttonText: '다시 시도하기',
  buttonAction: () => window.location.reload(),
};

// 에러 코드별 설정
export const ERROR_CONFIGS: Record<number, ErrorConfig> = {
  400: {
    message: '잘못된 요청입니다',
    buttonText: '이전 페이지로',
    buttonAction: () => window.history.back(),
  },
  401: {
    message: '로그인 세션이 만료 되었습니다',
    buttonText: '다시 로그인하기',
    buttonAction: () => (window.location.href = '/login'),
  },
  403: {
    message: '접근 권한이 없습니다',
    buttonText: '홈으로 이동',
    buttonAction: () => (window.location.href = '/'),
  },
  500: {
    message: '서버 오류가 발생했습니다',
    buttonText: '다시 시도하기',
    buttonAction: () => window.location.reload(),
  },
};

// 에러 객체에서 상태 코드를 추출하는 함수
export const getErrorStatusCode = (error: unknown): number | null => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.status;
  }

  // 커스텀 에러 객체에서 status 필드가 있는 경우
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: unknown }).status;
    if (typeof status === 'number') {
      return status;
    }
  }

  return null;
};

// 에러에 해당하는 설정을 가져오는 함수
export const getErrorConfig = (error: unknown): ErrorConfig => {
  const statusCode = getErrorStatusCode(error);

  if (statusCode && ERROR_CONFIGS[statusCode]) {
    return ERROR_CONFIGS[statusCode];
  }

  return DEFAULT_ERROR_CONFIG;
};
