import { useRouter } from 'next/router';
import TopicDetailViews from '@views/TopicDetail';
import { topic as TOPIC } from '~/constants';
import { OpenGraph } from '~/components/common';
import { hasProperty } from '~/utils';

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
