import clientApi from '../api';

export const getNews = () => {
  return clientApi.get<null, News[]>(`/api/news`);
};

export const getNewsById = (id: string) => {
  return clientApi.get<null, News>(`/api/news/${id}`);
};

export const getNewsByTopic = (topic: Topic) => {
  return clientApi.get<null, Headline[]>(`/api/topics/${topic}`);
};
