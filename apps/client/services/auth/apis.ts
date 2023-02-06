import api, { kakaoApi } from '~/services/api';
import { env } from '~/constants';

export const requestKakaoToken = (code: string) => {
  return kakaoApi.post<null, Kakao.Token>(
    'https://kauth.kakao.com/oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: env.KAKAO_REST_API_KEY,
      redirect_uri: env.KAKAO_REDIRECT_URI,
      code,
    }
  );
};

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
