import { dehydrate, QueryClient } from '@tanstack/react-query';
import NewsDetailViews from '@views/NewsDetail';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { OpenGraph } from '~/components/common';
import { getNews, getNewsById } from '~/services/client/news/apis';
import queryKeys from '~/services/client/querykeys';

interface Props {
  id: string;
}

const NewsDetail = ({ id }: Props) => {
  return (
    <>
      <OpenGraph title="오늘의 뉴스" path={`/news/${id}`} />
      <NewsDetailViews />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  if (
    !context.params ||
    !context.params.id ||
    typeof context.params.id !== 'string'
  ) {
    return {
      props: {},
    };
  }

  const {
    params: { id },
  } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.newsById(id),
    () => getNewsById(id),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

export const getStaticPaths = async () => {
  const news = await getNews();
  const paths = news.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default NewsDetail;
