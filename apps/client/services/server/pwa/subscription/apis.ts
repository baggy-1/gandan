import type { PushSubscription } from 'web-push';
import { Subscription } from '~/@types/pwa';

import serverApi from '../../api';

export const createSubscription = (subscription: PushSubscription) => {
  return serverApi.post<null, PushSubscription>(
    `/pwa/subscription.json`,
    subscription
  );
};

export const getSubscriptions = () => {
  return serverApi.get<null, Subscription.getResponse>(
    '/pwa/subscription.json?print=pretty'
  );
};
