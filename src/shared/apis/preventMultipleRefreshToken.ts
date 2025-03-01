import axios, { AxiosInstance } from 'axios';

import { baseURL } from '.';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const preventMultipleRefreshToken = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    async (response) => {
      return response;
    },

    async (error) => {
      const originalRequest = error.config;

      // TODO: 서버 인증만료 status code 확인
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = window.localStorage.getItem('refreshToken');
        return new Promise(function (resolve, reject) {
          axios
            .post(`${baseURL}/api/auth/refresh`, { refreshToken })
            .then(({ data }) => {
              // TODO: 필요시 브라우저 Cookie Set 로직 추가
              // axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
              // originalRequest.headers['Authorization'] = 'Bearer ' + data.token;

              processQueue(null, data.token);
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
    },
  );
};
