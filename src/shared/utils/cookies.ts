'use client';

import {
  setCookie as setNextCookie,
  getCookie as getNextCookie,
  deleteCookie as deleteNextCookie,
  hasCookie as hasNextCookie,
} from 'cookies-next';
import { type CookieValueTypes } from 'cookies-next/src/types';

/**
 * 쿠키를 가져오는 함수
 * @param key 가져올 쿠키의 키
 * @param options 쿠키 옵션 (선택적)
 * @returns 쿠키 값 또는 undefined
 */
export const getCookie = (key: string, options?: any): CookieValueTypes => {
  try {
    return getNextCookie(key, options);
  } catch (error) {
    console.error(`쿠키 가져오기 오류 (${key}):`, error);
    return undefined;
  }
};

/**
 * 쿠키를 설정하는 함수
 * @param key 설정할 쿠키의 키
 * @param value 설정할 쿠키의 값
 * @param options 쿠키 옵션 (만료 시간, 경로 등)
 * @returns 성공 여부
 */
export const setCookie = (key: string, value: string | number | boolean | object, options?: any) => {
  try {
    setNextCookie(key, value, options);
    return true;
  } catch (error) {
    console.error(`쿠키 설정 오류 (${key}):`, error);
    return false;
  }
};

/**
 * 쿠키를 삭제하는 함수
 * @param key 삭제할 쿠키의 키
 * @param options 쿠키 옵션 (선택적)
 * @returns 성공 여부
 */
export const removeCookie = (key: string, options?: any) => {
  try {
    deleteNextCookie(key, options);
    return true;
  } catch (error) {
    console.error(`쿠키 삭제 오류 (${key}):`, error);
    return false;
  }
};

/**
 * 쿠키 존재 여부를 확인하는 함수
 * @param key 확인할 쿠키의 키
 * @param options 쿠키 옵션 (선택적)
 * @returns 쿠키 존재 여부
 */
export const hasCookie = (key: string, options?: any) => {
  try {
    return hasNextCookie(key, options);
  } catch (error) {
    console.error(`쿠키 확인 오류 (${key}):`, error);
    return false;
  }
};
