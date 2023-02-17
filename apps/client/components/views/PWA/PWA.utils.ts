import type { PushSubscription } from 'web-push';
import { env } from '~/constants';

export const arrayBufferToString = (buffer: ArrayBuffer) => {
  return btoa(String.fromCharCode(...Array.from(new Uint8Array(buffer))));
};

export interface SubscriptionAction {
  type: 'denied' | 'notSupported' | 'error' | 'success' | 'subscriptioned';
  pushSubscription: PushSubscription | null;
}

export const subscriptionAction = async (): Promise<SubscriptionAction> => {
  if (Notification.permission === 'denied') {
    return {
      type: 'denied',
      pushSubscription: null,
    };
  }

  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return {
      type: 'notSupported',
      pushSubscription: null,
    };
  }

  const registerServiceWorker = async () => {
    const register = await navigator.serviceWorker.register('/sw.js');

    return register;
  };

  registerServiceWorker();

  const registration = await navigator.serviceWorker.ready;
  const userSubscription = await registration.pushManager.getSubscription();

  if (userSubscription) {
    return {
      type: 'subscriptioned',
      pushSubscription: null,
    };
  }

  const applicationServerKey = env.VAPID_PUBLIC_KEY;
  const newSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  const { endpoint } = newSubscription;
  const p256dh = newSubscription.getKey('p256dh');
  const auth = newSubscription.getKey('auth');

  if (!p256dh || !auth) {
    return {
      type: 'error',
      pushSubscription: null,
    };
  }

  return {
    type: 'success',
    pushSubscription: {
      endpoint,
      keys: {
        p256dh: arrayBufferToString(p256dh),
        auth: arrayBufferToString(auth),
      },
    },
  };
};
