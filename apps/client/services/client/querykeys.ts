const queryKeys = {
  me: ['me'],
  news: ['news'],
  newsById: (id: string) => ['news', id],
  newsByTopic: (topic: Topic) => ['news', 'topic', topic],
  bookmarkMe: ['bookmarkMe'],
} as const;

export default queryKeys;
