import serverApi from '../api';

export const getBookmarkByUserId = (userId: string) => {
  return serverApi.get<null, ServerBookmark>(
    `/bookmark/${userId}.json?print=pretty`
  );
};

export const createBookmarkByUserId = (userId: string, bookmark: Bookmark) => {
  return serverApi.patch<null, Bookmark>(
    `/bookmark/${userId}/${bookmark.id}.json`,
    bookmark
  );
};

export const deleteBookmarkByUserId = (userId: string, newsId: string) => {
  return serverApi.delete<null, null>(`/bookmark/${userId}/${newsId}.json`);
};
