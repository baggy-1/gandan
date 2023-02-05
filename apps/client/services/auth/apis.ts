import { kakaoApi } from '~/services/api';
import { env } from '~/constants';

export const requestKakaoToken = (code: string) => {
  return kakaoApi.post<null, Kakao.TokenResponse>(
    'https://kauth.kakao.com/oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: env.KAKAO_REST_API_KEY,
      redirect_uri: env.KAKAO_REDIRECT_URI,
      code,
    }
  );
};
