import { kakaoApi } from '~/services/api';

export const getKaKaoUser = () => {
  return kakaoApi.get<null, Kakao.UserResponse>(
    'https://kapi.kakao.com/v2/user/me'
  );
};
