import { useQuery } from '@tanstack/react-query';
import queryKeys from '~/services/querykeys';
import { getKaKaoUser } from './apis';

export const useFetchKakaoUser = () => {
  return useQuery(queryKeys.me, getKaKaoUser);
};
