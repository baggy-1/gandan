import NewsDetailViews from '@views/NewsDetail';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import queryKeys from '~/services/client/querykeys';
import { getNewsById } from '~/services/client/news';

const NewsDetail = () => {
  return <NewsDetailViews />;
};

export default NewsDetail;

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id },
  } = context;
  if (!id || typeof id !== 'string') {
    return {
      props: {
        dehydratedState: null,
      },
    };
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.newsById(id), () =>
    getNewsById(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
