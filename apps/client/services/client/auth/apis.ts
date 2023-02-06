import api from '~/services/client/api';

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
