import { GetServerSideProps } from 'next';
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

export default Topic;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || !params.topic || typeof params.topic !== 'string') {
    return {
      props: {},
    };
  }

  const { topic } = params;

  if (!isTopicKeyword(topic)) {
    return {
      props: {},
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.newsByTopic(topic),
    () => getNewsByTopic(topic),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const isTopicKeyword = (topic: string): topic is Topic => {
  return Object.keys(TOPIC).includes(topic);
};
