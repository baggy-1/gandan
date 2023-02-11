import { useSuspensedQuery } from '~/hooks';
import queryKeys from '../querykeys';
import { getNews, getNewsById } from './apis';

export const useQueryNews = () => {
  return useSuspensedQuery(queryKeys.news, getNews);
};

export const useQueryNewsById = (id: string) => {
  return useSuspensedQuery(queryKeys.newsById(id), () => getNewsById(id));
};
