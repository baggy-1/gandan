import { useQuery } from '@tanstack/react-query';
import { isExistToken } from '~/utils';
import queryKeys from '../querykeys';
import { getBookmark } from './apis';

export const useQueryBookmark = () => {
  return useQuery(queryKeys.bookmarkMe, getBookmark, {
    enabled: isExistToken(),
  });
};
