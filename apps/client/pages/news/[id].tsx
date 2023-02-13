import { dehydrate, QueryClient } from '@tanstack/react-query';
import NewsDetailViews from '@views/NewsDetail';
import { getNews } from '~/services/client/news/apis';
import queryKeys from '~/services/client/querykeys';

const NewsDetail = () => {
  return <NewsDetailViews />;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.news, getNews, {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths = async () => {
  const news = await getNews();
  const paths = news.map(item => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default NewsDetail;
