import { NextApiRequest, NextApiResponse } from 'next';
import { getNews } from '~/services/server/news/apis';

const newsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const serverNews = await getNews();

    if (!serverNews) {
      return res.status(200).json([]);
    }

    const serverNewslist = Object.values(serverNews) as News[];
    const clientNews: ClientNewslist = serverNewslist.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ headlines, ...news }) => ({
        ...news,
      })
    );
    const clientNewsSortedByCreateAt = clientNews.sort(
      ({ createAt: a }, { createAt: b }) =>
        new Date(b).getTime() - new Date(a).getTime()
    );

    return res.status(200).json(clientNewsSortedByCreateAt);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default newsHandler;
