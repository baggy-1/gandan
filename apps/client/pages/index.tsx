import { dehydrate, QueryClient } from '@tanstack/react-query';
import HomeViews from '@views/Home/HomeContainer';
import { getNews } from '~/services/client/news';
import queryKeys from '~/services/client/querykeys';

const Home = () => {
  return <HomeViews />;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.news, getNews);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
