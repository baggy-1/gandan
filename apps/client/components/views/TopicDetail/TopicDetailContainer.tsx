import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { Center, Divider, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { css, useTheme } from '@emotion/react';
import { hasProperty } from '~/utils';
import { topic as TOPIC } from '~/constants';
import {
  Header,
  Headline,
  HeadlineContainerSkeleton,
  ScrollTopButton,
} from '~/components/common';
import { useQueryNewsByTopic } from '~/services/client/news';
import { useMagnifying } from '~/hooks';

interface Props {
  topic: Topic;
}

const TopicDetail = ({ topic }: Props) => {
  const { colors } = useTheme();
  const { data: topicHeadlines } = useQueryNewsByTopic(topic);
  const { isFontSizeLarge, toggleFontSize, Icon } = useMagnifying();

  return (
    <VStack>
      <Header
        title={TOPIC[topic].name}
        createAt={dayjs().format('YYYY-MM-DD HH:mm:ss')}
        right={
          <Center
            css={css`
              display: flex;
              gap: 1rem;
            `}
          >
            <button type="button" onClick={toggleFontSize}>
              <Icon />
            </button>
          </Center>
        }
      />
      <Divider
        css={css`
          border: 1px solid ${colors.grayE8};
        `}
      />
      <VStack
        css={css`
          width: 100%;
          padding: 0 1rem;
          align-items: flex-start;
          gap: 1rem;
        `}
      >
        {topicHeadlines.map(headline => {
          return (
            <Headline
              key={headline.id}
              headline={headline}
              titleFontSize={isFontSizeLarge ? 'large' : 'default'}
            />
          );
        })}
      </VStack>
      <ScrollTopButton />
    </VStack>
  );
};

const TopicDetailContainer = () => {
  const {
    query: { topic },
  } = useRouter();

  if (!topic || typeof topic !== 'string' || !hasProperty(TOPIC, topic)) {
    return <div>잘못된 경로입니다.</div>;
  }

  return (
    <Suspense fallback={<HeadlineContainerSkeleton />}>
      <TopicDetail topic={topic} />
    </Suspense>
  );
};

export default TopicDetailContainer;
