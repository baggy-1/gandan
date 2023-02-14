import { NextApiRequest, NextApiResponse } from 'next';

import {
  getGoogleHeadlineNews,
  getNewsById,
  createNewsById,
} from '~/services/server/news/apis';
import getKoreaDate from '~/utils/getKoreaDate';
import { getParseHeadlines, getRandomThumbnail } from './[id].util';

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

    if (news) {
      return res.status(200).json(news);
    }

    const googleNews = await getGoogleHeadlineNews();
    const headlines = getParseHeadlines(googleNews);
    const { date, datetime, dateKorea } = getKoreaDate(new Date());
    const id = `${date}-@-news` as const;
    const thumbnail = getRandomThumbnail(id);

    const newNews = await createNewsById(id, {
      id,
      title: dateKorea,
      headlines,
      createAt: datetime,
      thumbnail,
    });

    return res.status(200).json(newNews);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default newsIdHandler;
