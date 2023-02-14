import { useQuery } from '@tanstack/react-query';
import queryKeys from '../querykeys';
import { getMe } from './apis';
import { useSuspensedQuery } from '~/hooks';

export const useQueryMe = () => {
  return useQuery(queryKeys.me, getMe, {
    staleTime: Infinity,
  });
};

export const useSuspensedQueryMe = () => {
  return useSuspensedQuery(queryKeys.me, getMe, {
    staleTime: Infinity,
  });
};
