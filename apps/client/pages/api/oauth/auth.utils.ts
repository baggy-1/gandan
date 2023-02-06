/* eslint-disable camelcase */
import { env } from '~/constants';

const TOKEN = {
  type: 'bearer',
  expiresIn: 21600, // 6시간
  refreshTokenExpiresIn: 5184000, // 60일
};

export const createToken = () => {
  return {
    token_type: TOKEN.type,
    access_token: 'a',
    expires_in: TOKEN.expiresIn,
    refresh_token: 'r',
    refresh_token_expires_in: TOKEN.refreshTokenExpiresIn,
  };
};

export const getParseKakaoUser = (user: Kakao.User) => {
  const {
    id,
    kakao_account: {
      profile: { nickname, profile_image_url },
      email,
    },
  } = user;

  return {
    id: `${id}-@-${env.KAKAO_ID_FLAG}`,
    nickname,
    profile: profile_image_url,
    email,
  };
};

export const getParseGoogleUser = (user: Google.User) => {
  const { id, email, name, picture } = user;

  return {
    id: `${id}-@-${env.GOOGLE_ID_FLAG}`,
    nickname: name,
    profile: picture,
    email,
  };
};
