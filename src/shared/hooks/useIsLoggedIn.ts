'use client';

import { getCookie } from 'cookies-next';

export const useIsLoggedIn = () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  return {
    isLoggedIn: Boolean(accessToken && refreshToken),
  };
};
