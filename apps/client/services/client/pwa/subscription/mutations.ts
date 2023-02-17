import { useMutation } from '@tanstack/react-query';
import { createSubscription } from './apis';

export const useCreateSubscription = () => {
  return useMutation(createSubscription);
};
