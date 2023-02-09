import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '~/services/server/user';

const meHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = getUserId(req.query);

  if (!userId) {
    return res.status(401).json({ message: 'check payload' });
  }

  const user = await getUser(userId);

  return res.status(200).json(user);
};

export default meHandler;

const getUserId = (query: NextApiRequest['query']) => {
  const { payload } = query;

  if (!payload || typeof payload !== 'string') {
    return null;
  }

  const { userId } = JSON.parse(payload) as { userId: string };
  return userId;
};
