import type { PushSubscription } from 'web-push';
import clientApi from '../../api';
import { Subscription } from '~/@types/pwa';

export const createSubscription = (subscription: PushSubscription) => {
  return clientApi.post<null, Subscription.createResponse>(
    '/api/pwa/subscription',
    subscription
  );
};
