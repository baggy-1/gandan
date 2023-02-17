import { Subscription } from '~/@types/pwa';

export const parseSubscriptions = (
  originSubscriptions: Subscription.getResponse
) => {
  return Object.values(originSubscriptions);
};
