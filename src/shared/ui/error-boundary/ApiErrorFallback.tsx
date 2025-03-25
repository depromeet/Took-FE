'use client';

import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

import useApiError from '../../hooks/useApiError';

import { Error400 } from './error-400';
import { Error401 } from './error-401';
import { Error403 } from './error-403';
import { Error500 } from './error-500';
import { ErrorDefault } from './error-detault';

export function ApiErrorFallback(props: FallbackProps) {
  const { error } = props;
  const { handleError } = useApiError();

  // 에러 발생 시 토스트 메시지 표시
  useEffect(() => {
    handleError(error);
  }, [error, handleError]);

  // API 에러 상태 코드 추출
  const statusCode = error.status || (error.response && error.response.status);

  // 상태 코드에 따라 적절한 에러 컴포넌트 렌더링
  switch (statusCode) {
    case 400:
      return <Error400 {...props} />;
    case 401:
      return <Error401 {...props} />;
    case 403:
      return <Error403 {...props} />;
    case 500:
      return <Error500 {...props} />;
    default:
      return <ErrorDefault {...props} />;
  }
}
