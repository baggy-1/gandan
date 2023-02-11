import { Suspense } from 'react';
import NewsList from '~/components/common/NewsList';
import { useQueryNews } from '~/services/client/news/queries';
import { NewsListSkeleton } from '~/components/common/Skeleton';

const HomeContainer = () => {
  const { data: newslist } = useQueryNews();

  return <NewsList newslist={newslist} />;
};

const SuspenseHomeContainer = () => {
  return (
    <Suspense fallback={<NewsListSkeleton />}>
      <HomeContainer />
    </Suspense>
  );
};

export default SuspenseHomeContainer;
