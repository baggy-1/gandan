import axios from 'axios';
import Cookies from 'js-cookie';
import { token } from '~/constants';

const createAuthApi = () => {
  const accessToken = Cookies.get(token.accessToken);

  const _api = axios.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  _api.interceptors.response.use(response => response.data);

  return _api;
};

export const kakaoApi = createAuthApi();

const createApi = () => {
  const _api = axios.create();

  _api.interceptors.response.use(response => response.data);

  return _api;
};

const api = createApi();

export default api;
