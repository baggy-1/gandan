import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '../querykeys';
import { updateMe } from './apis';

export const useUpdateMe = () => {
  const client = useQueryClient();

  return useMutation(updateMe, {
    onSuccess: () => {
      client.invalidateQueries(queryKeys.me);
    },
  });
};
