import axios from 'axios';

import { preventMultipleRefreshToken } from './preventMultipleRefreshToken';

export const baseURL =
  process.env.NEXT_PUBLIC_STAGE === 'production' ? 'https://api.somewhere' : `https://api-dev.somewhere`;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

preventMultipleRefreshToken(axiosInstance);

export const http = {
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
