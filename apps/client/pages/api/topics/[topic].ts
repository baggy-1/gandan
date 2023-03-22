import { NextApiRequest, NextApiResponse } from 'next';
import { topic as TOPIC } from '~/constants';
import { getNewsByTopic } from '~/services/server/news';
import { getParseHeadlines } from '~/services/server/news/utils';
import { hasProperty } from '~/utils';

const topicHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { topic } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed`,
    });
  }

  if (typeof topic !== 'string' || !hasProperty(TOPIC, topic)) {
    return res.status(400).json({
      error: 'Invalid topic',
    });
  }

  try {
    const googleNews = await getNewsByTopic(topic);
    const headlines = getParseHeadlines(googleNews);

    return res.status(200).json(headlines);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export default topicHandler;
