import { PushSubscription } from 'web-push';

declare module Subscription {
  interface createResponse {
    name: string;
  }

  interface getResponse {
    [key: createResponse['name']]: PushSubscription;
  }
}
