import { NextApiRequest, NextApiResponse } from 'next';

import { getNewsById } from '~/services/server/news/apis';

const newsIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id: queryId },
  } = req;

  if (queryId === 'undefined') {
    return res.status(400).json({ error: 'Invalid news id' });
  }

  const newsId = `${queryId}`;

  try {
    const news = await getNewsById(newsId);

    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default newsIdHandler;
