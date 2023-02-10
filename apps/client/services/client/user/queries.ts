import { useQuery } from '@tanstack/react-query';
import { isExistToken } from '~/utils';
import queryKeys from '../querykeys';
import { getMe } from './apis';

export const useQueryMe = () => {
  return useQuery(queryKeys.me, getMe, {
    enabled: isExistToken(),
  });
};
