import { useSuspensedQuery } from '~/hooks';
import queryKeys from '../querykeys';
import { getNews } from './apis';

export const useQueryNews = () => {
  return useSuspensedQuery(queryKeys.news, getNews);
};
