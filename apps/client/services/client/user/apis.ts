import clientApi from '../api';

export const getMe = () => {
  return clientApi.get<null, User>('/api/user/me');
};

// 수정은 닉네임만 가능합니다
export const updateMe = ({ nickname }: Pick<User, 'nickname'>) => {
  return clientApi.patch<null, Pick<User, 'nickname'>>('/api/user/me', {
    nickname,
  });
};
