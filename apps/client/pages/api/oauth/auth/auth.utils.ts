/* eslint-disable camelcase */

export const getParseKakaoUser = (user: Kakao.User) => {
  const {
    id,
    kakao_account: {
      profile: { nickname, profile_image_url },
      email,
    },
  } = user;

  return {
    id: `${id}-@-kakao`,
    nickname,
    profile: profile_image_url,
    email,
    name: nickname,
  } as const;
};

export const getParseGoogleUser = (user: Google.User) => {
  const { id, email, name, picture } = user;

  return {
    id: `${id}-@-google`,
    nickname: name,
    profile: picture,
    email,
    name,
  } as const;
};
