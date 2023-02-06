import serverApi, { googleApi, kakaoApi } from '~/services/server/api';

export const getKaKaoUser = (token: string) => {
  return kakaoApi.get<null, Kakao.User>('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getGoogleUser = (token: string) => {
  return googleApi.get<null, Google.User>(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUser = (id: string) => {
  return serverApi.get<null, User>(`/users/${id}.json?print=pretty`);
};

export const createUser = (id: string, user: User) => {
  return serverApi.put<null, User>(`/users/${id}.json`, user);
};
