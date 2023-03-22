import { env, topic as TOPIC } from '~/constants';
import serverApi from '../api';
import { getRssToJson } from './utils';

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

export const getNewsByTopic = (topic: Topic) => {
  const { url } = TOPIC[topic];

  return getRssToJson(url);
};

export const createNewsById = (id: string, news: News) => {
  return serverApi.put<null, News>(`/news/${id}.json`, news);
};

export const getNewsById = (id: string) => {
  return serverApi.get<null, News>(`/news/${id}.json?print=pretty`);
};

export const getNews = () => {
  return serverApi.get<null, ServerNewslist>(`/news.json?print=pretty`);
};
