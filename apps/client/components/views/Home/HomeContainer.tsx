import { Suspense } from 'react';
import Grid from '~/components/common/Grid';
import NewsCard from '~/components/common/NewsCard';
import { NewsListSkeleton } from '~/components/common/Skeleton';
import { useQueryNews } from '~/services/client/news';

const HomeContainer = () => {
  const { data: newslist } = useQueryNews();

  return (
    <Grid>
      {newslist.map(news => {
        return <NewsCard key={news.id} {...news} />;
      })}
    </Grid>
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
