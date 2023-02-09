import axios, { AxiosError, CreateAxiosDefaults } from 'axios';
import Cookies from 'js-cookie';
import { token } from '~/constants';
import { retryRequestRefreshAccessToken } from '../auth';

const createApi = (config?: CreateAxiosDefaults) => {
  const accessToken = Cookies.get(token.accessToken);

  const _api = axios.create({
    ...config,
    headers: {
      ...config?.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  _api.interceptors.response.use(
    response => response.data,
    error => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          const refreshToken = Cookies.get(token.refreshToken);

          if (refreshToken) {
            return retryRequestRefreshAccessToken(_api, error);
          }
        }

        if (error.response?.status === 403) {
          Cookies.remove(token.accessToken);
          Cookies.remove(token.refreshToken);
        }
      }

      return Promise.reject(error);
    }
  );

  return _api;
};

const api = createApi();

export default api;
