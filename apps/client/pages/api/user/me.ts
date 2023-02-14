import { NextApiRequest, NextApiResponse } from 'next';
import { getUser, updateUser } from '~/services/server/user';
import { getUserIdInPayload } from '../api.util';

const meHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = getUserIdInPayload(req.query);

  if (!userId) {
    return res.status(401).json({ message: 'check payload' });
  }

  if (req.method === 'GET') {
    const user = await getUser(userId);

    return res.status(200).json(user);
  }

  if (req.method === 'PATCH') {
    const user = await updateUser(userId, req.body);

    return res.status(200).json(user);
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).end(`Method Not Allowed`);
};

export default meHandler;
