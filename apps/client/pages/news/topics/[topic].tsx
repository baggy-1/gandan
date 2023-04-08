import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import TopicDetailViews from '@views/TopicDetail';
import { topic as TOPIC } from '~/constants';
import { OpenGraph } from '~/components/common';
import { hasProperty } from '~/utils';
import queryKeys from '~/services/client/querykeys';
import { getNewsByTopic } from '~/services/client/news/apis';

const Topic = () => {
  const router = useRouter();
  const { topic } = router.query;

  if (!topic || typeof topic !== 'string' || !hasProperty(TOPIC, topic)) {
    return null;
  }

  return (
    <>
      <OpenGraph
        title={`${TOPIC[topic].name}`}
        path={`/news/topics/${topic}`}
      />
      <TopicDetailViews />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  if (
    !context.params ||
    !context.params.topic ||
    typeof context.params.topic !== 'string' ||
    !hasProperty(TOPIC, context.params.topic)
  ) {
    return {
      props: {},
    };
  }

  const {
    params: { topic },
  } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.newsByTopic(topic),
    () => getNewsByTopic(topic),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      topic,
    },
    revalidate: 60 * 30, // 30분
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Object.values(TOPIC)
    .filter(({ id }) => id !== 'daily')
    .map(({ id }) => ({
      params: { topic: id },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Topic;
