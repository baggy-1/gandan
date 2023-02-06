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
  config.headers['Authorization'] = `Bearer ${access_token}`;

  return instance.request(config);
};
