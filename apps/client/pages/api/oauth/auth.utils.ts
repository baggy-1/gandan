/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import { env } from '~/constants';

const TOKEN = {
  type: 'bearer',
  expiresIn: 21600, // 6시간
  refreshTokenExpiresIn: 1209600, // 2주
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

interface Payload {
  userId: string;
}

export const createToken = (payload: Payload) => {
  if (!env.ACCESS_TOKEN_SECRET || !env.REFRESH_TOKEN_SECRET) {
    throw new Error('Invalid token secret');
  }

  const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: TOKEN.expiresIn,
  });
  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: TOKEN.refreshTokenExpiresIn,
  });

  return {
    token_type: TOKEN.type,
    access_token: accessToken,
    expires_in: TOKEN.expiresIn,
    refresh_token: refreshToken,
    refresh_token_expires_in: TOKEN.refreshTokenExpiresIn,
  };
};
