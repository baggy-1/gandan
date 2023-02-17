import { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';
import { env } from '~/constants';
import { getSubscriptions } from '~/services/server/pwa/subscription';
import { parseSubscriptions } from './pwa.util';

const notificationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  if (env.NOTIFICATION_SECRET !== req.query.secret) {
    return res.status(401).end('Unauthorized');
  }

  if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY) {
    return res.status(500).end('Internal server error');
  }

  webpush.setVapidDetails(
    'mailto:chigomuh@gmail.com',
    env.VAPID_PUBLIC_KEY,
    env.VAPID_PRIVATE_KEY
  );

  try {
    const originSubscriptions = await getSubscriptions();

    if (!originSubscriptions) {
      return res.status(400).json({ message: 'no subscriptions' });
    }

    const subscriptions = parseSubscriptions(originSubscriptions);

    const payload = {
      title: '간단한 뉴스',
      body: '방금 새로운 뉴스가 도착했습니다!',
      link: 'https://gandan-news.vercel.app',
    };

    const sendNotifications = subscriptions.map(async subscription => {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
    });

    await Promise.allSettled(sendNotifications);

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default notificationHandler;
