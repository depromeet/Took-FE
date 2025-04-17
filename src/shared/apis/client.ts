import axios from 'axios';
import { getCookie } from 'cookies-next';

import { CLIENT_SIDE_URL } from '../constants';

import { preventClientMultipleRefreshToken } from './preventClientMultipleRefreshToken';

const axiosInstance = axios.create({
  baseURL: CLIENT_SIDE_URL,
  withCredentials: true,
});

// 요청 인터셉터를 추가하여 모든 요청에 Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

preventClientMultipleRefreshToken(axiosInstance, CLIENT_SIDE_URL);

export const client = {
  get: async <Response = unknown>(...args: Parameters<typeof axiosInstance.get>) => {
    const response = await axiosInstance.get<Response>(...args);
    return response.data;
  },
  post: async <Request = unknown, Response = unknown>(...args: Parameters<typeof axiosInstance.post>) => {
    const response = await axiosInstance.post<Request, Response>(...args);
    return response;
  },
  put: async <Request = unknown, Response = unknown>(...args: Parameters<typeof axiosInstance.put>) => {
    const response = await axiosInstance.put<Request, Response>(...args);
    return response;
  },
  patch: async <Request = unknown, Response = unknown>(...args: Parameters<typeof axiosInstance.patch>) => {
    const response = await axiosInstance.patch<Request, Response>(...args);
    return response;
  },
  delete: async <Response = unknown>(...args: Parameters<typeof axiosInstance.delete>) => {
    const response = await axiosInstance.delete<Response>(...args);
    return response.data;
  },
};
