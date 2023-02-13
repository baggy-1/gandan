import { NextApiRequest, NextApiResponse } from 'next';

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.url) {
    return res.status(400).json({ message: 'Invalid path' });
  }

  const query = getParseQuery(req.url);

  if (!query.secret || query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!query.url) {
    return res.status(400).json({ message: 'Invalid path' });
  }

  try {
    await res.revalidate(query.url);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ error, message: 'Error revalidating' });
  }
};

const getParseQuery = (url: string) => {
  const queryUrl = url.split('?').length === 1 ? '' : url.split('?')[1];
  const query = queryUrl.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    return { ...acc, [key]: value };
  }, {} as { secret?: string; url?: string });

  return query;
};

export default revalidateHandler;
