import { useQuery } from '@tanstack/react-query';
import { isExistToken } from '~/utils';
import queryKeys from '../querykeys';
import { getBookmark } from './apis';
import { useSuspensedQuery } from '~/hooks';

export const useQueryBookmark = () => {
  return useQuery(queryKeys.bookmarkMe, getBookmark, {
    enabled: isExistToken(),
  });
};

export const useSuspensedQueryBookmark = () => {
  return useSuspensedQuery(queryKeys.bookmarkMe, getBookmark, {
    enabled: isExistToken(),
  });
};
