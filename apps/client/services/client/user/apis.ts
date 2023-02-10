import clientApi from '../api';

export const getMe = () => {
  return clientApi.get<null, User>('/api/user/me');
};
