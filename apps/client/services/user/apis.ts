import { googleApi, kakaoApi } from '~/services/api';

export const getKaKaoUser = () => {
  return kakaoApi.get<null, Kakao.UserResponse>(
    'https://kapi.kakao.com/v2/user/me'
  );
};

export const getGoogleUser = (token: string) => {
  return googleApi.get<null, Google.UserResponse>(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
