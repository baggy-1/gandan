import axios, { CreateAxiosDefaults } from 'axios';
import { env } from '~/constants';

const createApi = (config?: CreateAxiosDefaults) => {
  const _api = axios.create({
    ...config,
    headers: {
      ...config?.headers,
    },
  });

  _api.interceptors.response.use(response => response.data);

  return _api;
};

export const kakaoApi = createApi({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

export const googleApi = createApi();

export const api = createApi();

const serverApi = createApi({
  baseURL: env.FIREBASE_DATABASE_URL,
});

export default serverApi;
