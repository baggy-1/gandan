export const parseBookmark = (serverBookmark: ServerBookmark): Bookmark[] => {
  return Object.values(serverBookmark).map(bookmark => ({
    ...bookmark,
  }));
};

export const sortedBookmark = (bookmarks: Bookmark[]): Bookmark[] =>
  bookmarks.sort(
    ({ createAt: a }, { createAt: b }) =>
      new Date(b).getTime() - new Date(a).getTime()
  );
