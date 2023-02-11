const queryKeys = {
  me: ['me'],
  news: ['news'],
  newsById: (id: string) => ['news', id],
  bookmarkMe: ['bookmarkMe'],
} as const;

export default queryKeys;
