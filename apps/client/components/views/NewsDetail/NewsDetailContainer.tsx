import { Divider, VStack } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import { useQueryNewsById } from '~/services/client/news/queries';
import Headline from '~/components/common/Headline';
import { HeadlineContainerSkeleton } from '~/components/common/Skeleton';
import Header from './Header';

interface Props {
  id: string;
}

const NewsDetail = ({ id }: Props) => {
  const { colors } = useTheme();
  const { data: news } = useQueryNewsById(id);

  return (
    <VStack>
      <Header {...news} />
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
        {news.headlines.map(headline => {
          return <Headline key={headline.id} headline={headline} />;
        })}
      </VStack>
    </VStack>
  );
};

const NewsDetailContainer = () => {
  const {
    query: { id },
  } = useRouter();

  if (!id || typeof id !== 'string') {
    return null;
  }

  return <NewsDetail id={id} />;
};

const SuspenseNewsDetailContainer = () => {
  return (
    <Suspense fallback={<HeadlineContainerSkeleton />}>
      <NewsDetailContainer />
    </Suspense>
  );
};

export default SuspenseNewsDetailContainer;
