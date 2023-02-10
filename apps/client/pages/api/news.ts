import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  getGoogleHeadlineNews,
  getNews,
  createNews,
} from '~/services/server/news/apis';

const newsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const googleNews = await getGoogleHeadlineNews();
    const headlines = getParseHeadlines(googleNews);
    const { date, datetime } = getKoreaDate(new Date());

    const news =
      (await getNews(date)) ||
      (await createNews(date, {
        id: date,
        headlines,
        createAt: datetime,
      }));

    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default newsHandler;

const getKoreaDate = (date: Date) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return {
    date: dayjs.tz(date, 'Asia/Seoul').format('YYYY-MM-DD'),
    datetime: dayjs.tz(date, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
  };
};

const getParseHeadlines = (news: GoogleNews): Headline[] => {
  const { items } = news;

  return items.map(({ id, title, link }) => ({
    id,
    title,
    link,
  }));
};
