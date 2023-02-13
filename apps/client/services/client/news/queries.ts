import { useSuspensedQuery } from '~/hooks';
import queryKeys from '../querykeys';
import { getNews, getNewsById } from './apis';

export const useQueryNews = () => {
  return useSuspensedQuery(queryKeys.news, getNews, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useQueryNewsById = (id: string) => {
  return useSuspensedQuery(queryKeys.newsById(id), () => getNewsById(id), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
