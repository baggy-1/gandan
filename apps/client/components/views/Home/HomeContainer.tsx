import { Suspense } from 'react';
import {
  Badge,
  NewsCard,
  NewsListSkeleton,
  Grid,
  LazyLoadingVisible,
} from '~/components/common';
import { useQueryNews } from '~/services/client/news';
import { getKoreaDate } from '~/utils';

const HomeContainer = () => {
  const { data: newslist } = useQueryNews();

  return (
    <Grid>
      {newslist.map(news => {
        const today = getKoreaDate(new Date(Date.now())).date;
        const createDay = getKoreaDate(new Date(news.createAt)).date;
        const badge =
          today === createDay ? <Badge colorScheme="green">NEW</Badge> : null;

        return (
          <LazyLoadingVisible width="10rem" height="12rem">
            <NewsCard key={news.id} {...news} badge={badge} />
          </LazyLoadingVisible>
        );
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
