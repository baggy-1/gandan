import { NextApiRequest } from 'next';

export const getUserIdInPayload = (query: NextApiRequest['query']) => {
  const { payload } = query;

  if (!payload || typeof payload !== 'string') {
    return null;
  }

  const { userId } = JSON.parse(payload) as { userId: string };
  return userId;
};
