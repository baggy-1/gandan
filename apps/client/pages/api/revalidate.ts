import { NextApiRequest, NextApiResponse } from 'next';

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!req.url) {
    return res.status(400).json({ message: 'Invalid path' });
  }

  const {
    query: { secret, url },
  } = req;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({
      message: 'Invalid token secret',
    });
  }

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: 'Invalid path' });
  }

  try {
    await res.revalidate(url);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ error, message: 'Error revalidating' });
  }
};

export default revalidateHandler;
