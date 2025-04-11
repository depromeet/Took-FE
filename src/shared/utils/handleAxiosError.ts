import axios, { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { toast } from 'sonner';

type StatusHandlersType = Record<number | 'default', (msg?: string) => void>;

// 상태 코드별 처리 핸들러
const statusHandlers: StatusHandlersType = {
  400: (msg?: string) => toast.error(msg ?? '잘못된 요청 형식입니다.'),
  401: (msg?: string) => toast.error(msg ?? '로그인 세션이 만료되었습니다. 다시 로그인 해주세요.'),
  403: (msg?: string) => toast.error(msg ?? '해당 기능에 대한 권한이 없습니다.'),
  404: (msg?: string) => toast.error(msg ?? '요청한 리소스를 찾을 수 없습니다.'),
  500: (msg?: string) => toast.error(msg ?? '서버 오류가 발생했습니다.'),
  default: (msg?: string) => toast.error(msg ?? '서버에서 알 수 없는 오류가 발생했습니다.'),
};

/**
 * Axios 에러를 처리하고 적절한 토스트 메시지를 표시하는 함수
 * @param error 에러 객체
 * @returns 처리된 에러 객체를 그대로 반환 (추가 처리를 위해)
 */
export const handleAxiosError = (error: unknown): unknown => {
  console.error('API 에러 발생:', error);

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const httpStatus = axiosError.response.status;
      const errorResponse = axiosError.response.data as any;
      const httpMessage = errorResponse.message ?? axiosError.message;

      // 상태 코드에 따른 처리
      const handler = statusHandlers[httpStatus] ?? statusHandlers.default;
      handler(httpMessage);
    } else if (axiosError.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      toast.error('서버 연결이 원활하지 않습니다.');
    } else {
      // 요청 설정 중 오류 발생
      toast.error('요청 설정 중 오류가 발생했습니다.');
    }
  } else if (error instanceof Error) {
    // 일반 Error 객체인 경우
    toast.error(`${error.message}`);
  } else {
    // 기타 알 수 없는 오류
    toast.error('네트워크 연결 오류 또는 기타 오류가 발생했습니다.');
  }

  // 에러를 그대로 반환하여 추가 처리할 수 있도록 함
  return error;
};

export default handleAxiosError;
