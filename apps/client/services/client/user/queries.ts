import { useQuery } from '@tanstack/react-query';
import queryKeys from '../querykeys';
import { getMe } from './apis';
import { useSuspensedQuery } from '~/hooks';
import { isExistToken } from '~/utils';

export const useQueryMe = () => {
  return useQuery(queryKeys.me, getMe, {
    enabled: isExistToken(),
    staleTime: Infinity,
  });
};

export const useSuspensedQueryMe = () => {
  return useSuspensedQuery(queryKeys.me, getMe, {
    enabled: isExistToken(),
    staleTime: Infinity,
  });
};
