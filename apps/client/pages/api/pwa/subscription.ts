import { NextApiRequest, NextApiResponse } from 'next';
import { createSubscription } from '~/services/server/pwa/subscription/apis';

const subscriptionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  if (!req.body) {
    return res.status(400).end('Bad request');
  }

  try {
    const subscription = await createSubscription(req.body);

    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export default subscriptionHandler;
