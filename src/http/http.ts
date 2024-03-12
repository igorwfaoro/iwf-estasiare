import axios, { AxiosError } from 'axios';

export const http = () => {
  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      if (config.data) {
        config.headers['Content-Type'] =
          config.data instanceof FormData
            ? 'multipart/form-data'
            : 'application/json';
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        return (window.location.href = '/login');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const mapHttpError = (error: AxiosError) => {
  return (error.response?.data as any).message || 'Algo errado...';
};
