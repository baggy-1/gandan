import api from '../api';

export const getMe = () => {
  return api.get<null, User>('/api/user/me');
};
