/* eslint-disable camelcase */
import { env } from '~/constants';

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
