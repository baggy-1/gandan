import { Suspense } from 'react';
import { Flex } from '~/components/common';
import NewsCard from '~/components/common/NewsCard';
import { NewsListSkeleton } from '~/components/common/Skeleton';
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
