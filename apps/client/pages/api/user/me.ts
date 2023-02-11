import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '~/services/server/user';
import { getUserIdInPayload } from '../api.util';

const meHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = getUserIdInPayload(req.query);

  if (!userId) {
    return res.status(401).json({ message: 'check payload' });
  }

  const user = await getUser(userId);

  return res.status(200).json(user);
};

export default meHandler;
