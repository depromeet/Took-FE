'use client';

import { useRef, useCallback } from 'react';

import { getCookie, setCookie, removeCookie, hasCookie } from '../utils/cookies';

/**
 * 쿠키 관련 기능을 제공하는 훅
 * @returns 쿠키 관련 유틸리티 함수들
 */
const useCookies = () => {
  // useRef를 사용하여 렌더링에 영향을 주지 않는 방식으로 캐시 구현
  const cookieCache = useRef<Record<string, any>>({});

  /**
   * 쿠키 값을 가져오는 함수
   * @param key 가져올 쿠키 키
   * @param options 쿠키 옵션
   * @returns 쿠키 값
   */
  const getValue = useCallback((key: string, options?: any) => {
    const value = getCookie(key, options);
    // 캐시 업데이트 (렌더링에 영향 없음)
    cookieCache.current[key] = value;
    return value;
  }, []);

  /**
   * 쿠키를 설정하는 함수
   * @param key 설정할 쿠키 키
   * @param value 설정할 값
   * @param options 쿠키 옵션
   * @returns 설정 성공 여부
   */
  const setValue = useCallback((key: string, value: string | number | boolean | object, options?: any) => {
    const success = setCookie(key, value, options);
    if (success) {
      // 캐시 업데이트 (렌더링에 영향 없음)
      cookieCache.current[key] = value;
    }
    return success;
  }, []);

  /**
   * 쿠키를 삭제하는 함수
   * @param key 삭제할 쿠키 키
   * @param options 쿠키 옵션
   * @returns 삭제 성공 여부
   */
  const removeValue = useCallback((key: string, options?: any) => {
    const success = removeCookie(key, options);
    if (success) {
      // 캐시에서 제거 (렌더링에 영향 없음)
      delete cookieCache.current[key];
    }
    return success;
  }, []);

  /**
   * 쿠키 존재 여부 확인하는 함수
   * @param key 확인할 쿠키 키
   * @param options 쿠키 옵션
   * @returns 존재 여부
   */
  const hasValue = useCallback((key: string, options?: any) => {
    return hasCookie(key, options);
  }, []);

  /**
   * 현재 캐시된 쿠키 값 가져오기
   * @returns 캐시된 쿠키 값 객체
   */
  const getCookieValues = useCallback(() => {
    return { ...cookieCache.current };
  }, []);

  return {
    getCookieValues,
    getValue,
    setValue,
    removeValue,
    hasValue,
  };
};

export default useCookies;
