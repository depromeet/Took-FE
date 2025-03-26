import axios from 'axios';

import { SERVER_SIDE_URL } from '../constants';

// TODO: 서버 인스턴스 옵션 추가 논의 필요
const axiosInstance = axios.create({
  baseURL: SERVER_SIDE_URL,
});

// preventServerMultipleRefreshToken(axiosInstance, SERVER_SIDE_URL);

export const server = {
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
