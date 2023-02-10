import { parse } from 'rss-to-json';
import { env } from '~/constants';
import serverApi from '../api';

export const getNaverNews = () => {
  return serverApi.get('https://openapi.naver.com/v1/search/news.json', {
    headers: {
      'X-Naver-Client-Id': env.NAVER_NEWS_CLIENT_ID,
      'X-Naver-Client-Secret': env.NAVER_NEWS_CLIENT_SECRET,
    },
    params: {
      query: '주요뉴스',
      sort: 'sim',
    },
  });
};

export const getGoogleHeadlineNews = () => {
  return getRssToJson(
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFZxYUdjU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR%3Ako&oc=11'
  );
};

const getRssToJson: Parse = (rss: string) => {
  return parse(rss);
};

export const createNews = (id: string, news: News) => {
  return serverApi.put<null, News>(`/news/${id}.json`, news);
};

export const getNews = (id: string) => {
  return serverApi.get<null, News>(`/news/${id}.json?print=pretty`);
};
