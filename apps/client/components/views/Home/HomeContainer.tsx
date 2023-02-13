import { Suspense } from 'react';
import { Flex, NewsCard, NewsListSkeleton } from '~/components/common';
import { useQueryNews } from '~/services/client/news';

const HomeContainer = () => {
  const { data: newslist } = useQueryNews();

  return (
    <Flex wrap="wrap" justify="center" gap="1rem">
      {newslist.map(news => {
        return <NewsCard key={news.id} {...news} />;
      })}
    </Flex>
  );
};

const SuspenseHomeContainer = () => {
  return (
    <Suspense fallback={<NewsListSkeleton />}>
      <HomeContainer />
    </Suspense>
  );
};

export default SuspenseHomeContainer;
