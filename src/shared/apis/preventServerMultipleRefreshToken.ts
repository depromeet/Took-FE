import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, accessToken: null | string = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(accessToken);
    }
  });

  failedQueue = [];
};

const onFulfilled = (response: AxiosResponse<any, any>) => {
  return response;
};

const onRejected = async (error: any, baseUrl: string) => {
  const originalRequest = error.config;

  // TODO: 서버 인증만료 status code 확인
  if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((data) => {
          const { accessToken } = data as { accessToken: string; refreshToken: string };

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = cookies().get('refreshToken')?.value;

    return new Promise(function (resolve, reject) {
      axios
        .post(`${baseUrl}/api/auth/refresh`, { refreshToken })
        .then(({ data }) => {
          const { accessToken, refreshToken } = data as { accessToken: string; refreshToken: string };

          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          cookies().set('accessToken', accessToken);
          cookies().set('refreshToken', refreshToken);

          processQueue(null, accessToken);
          resolve(axios(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }

  return Promise.reject(error);
};

export const preventServerMultipleRefreshToken = (axiosInstance: AxiosInstance, baseUrl: string) => {
  axiosInstance.interceptors.response.use(onFulfilled, async (error: any) => onRejected(error, baseUrl));
};
