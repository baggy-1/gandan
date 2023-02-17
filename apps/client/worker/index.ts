/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('install', event => {
  event?.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event?.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  const payload = JSON.parse(event?.data.text() || '{}');

  event?.waitUntil(
    self.clients.matchAll().then(clientList => {
      const focuesd = clientList.some(client => client.focused);

      // 이미 앱이 열린 경우
      if (focuesd) {
        return;
      }

      if (!payload.title || !payload.body || !payload.link) {
        return;
      }

      return self.registration.showNotification(payload.title, {
        body: payload.body,
        data: { link: payload.link },
        icon: 'https://gandan-news.vercel.app/icons/maskable/maskable_icon_x192.png',
        badge:
          'https://gandan-news.vercel.app/icons/maskable/maskable_icon_x96.png',
      });
    })
  );
});

self.addEventListener('notificationclick', event => {
  event?.waitUntil(
    self.clients.matchAll().then(clientList => {
      // 앱이 열렸지만 활성화되지 않은 경우
      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      if (!event.notification.data.link) {
        return;
      }

      return self.clients.openWindow(event.notification.data.link);
    })
  );
});

export {};
