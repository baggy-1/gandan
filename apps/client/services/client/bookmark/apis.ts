import clientApi from '../api';

export const getBookmark = () => {
  return clientApi.get<null, Bookmark[]>('/api/user/bookmark');
};

export const createBookmark = (bookmark: Bookmark) => {
  return clientApi.post<null, Bookmark>('/api/user/bookmark', bookmark);
};

export const deleteBookmark = (newsId: string) => {
  return clientApi.delete<null, null>(`/api/user/bookmark`, {
    data: { newsId },
  });
};
