import { NextApiRequest, NextApiResponse } from 'next';

import {
  getGoogleHeadlineNews,
  getNewsById,
  createNewsById,
} from '~/services/server/news/apis';
import getKoreaDate from '~/utils/getKoreaDate';

const newsIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id: queryId },
  } = req;
  const newsId = `${queryId}`;

  try {
    const news = await getNewsById(newsId);

    if (news) {
      return res.status(200).json(news);
    }

    const googleNews = await getGoogleHeadlineNews();
    const headlines = getParseHeadlines(googleNews);
    const { date: id, datetime, dateKorea } = getKoreaDate(new Date());
    const thumbnail = getRandomThumbnail(id);

    const newNews = await createNewsById(id, {
      id: `${id}-@-news`,
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

const getParseHeadlines = (news: GoogleNews): Headline[] => {
  const { items } = news;

  return items.map(({ id, title, link }) => ({
    id,
    title,
    link,
  }));
};

const sizes = {
  sm: '240/320',
  md: '480/640',
  lg: '720/960',
} as const;

const getRandomThumbnail = (seed: string) => {
  const sm = `https://picsum.photos/seed/${seed}/${sizes.sm}.webp`;
  const md = `https://picsum.photos/seed/${seed}/${sizes.md}.webp`;
  const lg = `https://picsum.photos/seed/${seed}/${sizes.lg}.webp`;

  return {
    sm,
    md,
    lg,
  };
};
