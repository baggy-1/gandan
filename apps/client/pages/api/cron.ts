import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/constants';
import {
  createNewsById,
  getGoogleHeadlineNews,
  getNewsById,
} from '~/services/server/news';
import { getKoreaDate } from '~/utils';
import { getParseHeadlines, getRandomThumbnail } from './news/[id].util';

const cronHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { authorization } = req.headers;

  if (authorization !== env.CRON_NEWS_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { date, dateKorea, datetime } = getKoreaDate(new Date());
  const id = `${date}-@-news`;

  try {
    const news = await getNewsById(id);

    if (news) {
      return res.status(200).json({ success: true, message: 'Already exist' });
    }

    const googleNews = await getGoogleHeadlineNews();
    const headlines = getParseHeadlines(googleNews);
    const thumbnail = getRandomThumbnail(id);

    await createNewsById(id, {
      id,
      title: dateKorea,
      headlines,
      createAt: datetime,
      thumbnail,
    });

    return res
      .status(200)
      .json({ success: true, message: `Created news, ${id}`, id });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default cronHandler;
