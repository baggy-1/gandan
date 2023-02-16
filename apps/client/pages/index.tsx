import { dehydrate, QueryClient } from '@tanstack/react-query';
import HomeViews from '@views/Home/HomeContainer';
import { OpenGraph } from '~/components/common';
import { getNews } from '~/services/client/news';
import queryKeys from '~/services/client/querykeys';

const Home = () => {
  return (
    <>
      <OpenGraph path="/" />
      <HomeViews />
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.news, getNews, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
