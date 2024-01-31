import axios, { AxiosError, AxiosHeaders } from 'axios';

export const http = ({ ignoreConfigs }: { ignoreConfigs?: boolean } = {}) => {

    const headers: AxiosHeaders | {} = !ignoreConfigs
        ? {
              'Content-Type': 'application/json',
          }
        : {};

    const instance = axios.create({
        headers
    });

    if (!ignoreConfigs)
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
