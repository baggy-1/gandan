const queryKeys = {
  me: ['me'],
  news: ['news'],
  newsById: (id: string) => ['news', id],
} as const;

export default queryKeys;
