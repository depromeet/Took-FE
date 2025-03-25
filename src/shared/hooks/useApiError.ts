import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'sonner';

type statusHandlersType = Record<number | 'default', (msg?: string) => void>;

const useApiError = () => {
  const handleError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const httpStatus = error.response?.status;
        const errorResponse = error.response?.data;
        const httpMessage = errorResponse.message;

        // 에러 핸들러를 실행하기 전에 httpStatus가 유효한지 확인
        const handler = httpStatus ? statusHandlers[httpStatus] : statusHandlers.default;
        handler(httpMessage);
        return;
      } else {
        toast.error('서버 연결이 원활하지 않습니다.');
        return;
      }
    } else {
      toast.error('네트워크 연결 오류 또는 기타 오류가 발생했습니다.');
      return;
    }
  }, []);

  const statusHandlers: statusHandlersType = {
    400: (msg?: string) => toast.error(msg), // 잘못된 클라이언트의 요청
    401: () => toast.error('로그인 세션이 만료가 되었습니다. 다시 로그인 해주세요.'),
    403: () => toast.error('해당 기능에 대한 권한이 없습니다.'),
    404: () => toast.error('해당 페이지가 없습니다,'),
    500: () => toast.error('서버 오류가 발생했습니다.'),
    default: () => toast.error('서버에서 알 수 없는 오류가 발생했습니다.'),
  };

  return { handleError };
};

export default useApiError;
