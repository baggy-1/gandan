/* eslint-disable camelcase */
import { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { token } from '~/constants';
import api from '~/services/client/api';
import getExpriesDate from '~/utils/getExpriesDate';

export const loginOAuthKakao = (code: string) => {
  return api.post<null, OAuth.Token>('/api/oauth/auth', {
    provider: 'kakao',
    data: {
      code,
    },
  });
};

export const loginOAuthGoogle = (accessToken: string) => {
  return api.post<null, OAuth.Token>('/api/oauth/auth', {
    provider: 'google',
    data: {
      accessToken,
    },
  });
};

export const getAccessToken = (refreshToken: string) => {
  return api.post<null, OAuth.AccessToken>('/api/oauth/token', {
    refreshToken,
  });
};

export const retryRequestRefreshAccessToken = async (
  instance: AxiosInstance,
  error: AxiosError
) => {
  const refreshToken = Cookies.get(token.refreshToken);

  if (!refreshToken) {
    return;
  }

  const { access_token, expires_in } = await getAccessToken(refreshToken);
  Cookies.set(token.accessToken, access_token, {
    expires: getExpriesDate(expires_in),
  });

  const config = error.config ?? {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  // eslint-disable-next-line dot-notation
  config.headers['Authorization'] = `Bearer ${access_token}`;

  // eslint-disable-next-line consistent-return
  return instance.request(config);
};

export const removeTokens = () => {
  Cookies.remove(token.accessToken);
  Cookies.remove(token.refreshToken);

  // eslint-disable-next-line dot-notation
  api.defaults.headers['Authorization'] = '';
};
