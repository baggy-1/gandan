import clientApi from '../api';

export const getNews = () => {
  return clientApi.get<null, News[]>(`/api/news`);
};

export const getNewsById = (id: string) => {
  return clientApi.get<null, News>(`/api/news/${id}`);
};
