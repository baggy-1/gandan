import { useQuery } from '@tanstack/react-query';
import { isExistToken } from '~/utils';
import queryKeys from '../querykeys';
import { getMe } from './apis';
import { useSuspensedQuery } from '~/hooks';

export const useQueryMe = () => {
  return useQuery(queryKeys.me, getMe, {
    enabled: isExistToken(),
    refetchOnWindowFocus: false,
  });
};

export const useSuspensedQueryMe = () => {
  return useSuspensedQuery(queryKeys.me, getMe, {
    enabled: isExistToken(),
    refetchOnWindowFocus: false,
  });
};
