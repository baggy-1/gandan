import { Box, Center, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import { useQueryNewsById } from '~/services/client/news/queries';
import Headline from '~/components/common/Headline';
import { HeadlineContainerSkeleton } from '~/components/common/Skeleton';
import { Bookmark } from '~/assets/svgs/common';

const NewsDetailContainer = () => {
  const {
    query: { id },
  } = useRouter();

  if (!id || typeof id !== 'string') {
    return null;
  }

  const { data: news } = useQueryNewsById(id);
  const { colors, typography } = useTheme();

  return (
    <VStack>
      <Flex
        css={css`
          width: 100%;
          justify-content: space-between;
          padding: 0 1rem;
        `}
      >
        <Box>
          <Text
            css={css`
              ${typography.headline6}
            `}
          >
            {dayjs(news.createAt).locale('ko-KR').format('MM월 DD일 dddd')}
          </Text>
          <Text
            css={css`
              ${typography.body2}
            `}
          >
            {news.createAt}
          </Text>
        </Box>
        <Center
          css={css`
            cursor: pointer;
          `}
        >
          <Bookmark />
        </Center>
      </Flex>
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

const SuspenseNewsDetailContainer = () => {
  return (
    <Suspense fallback={<HeadlineContainerSkeleton />}>
      <NewsDetailContainer />
    </Suspense>
  );
};

export default SuspenseNewsDetailContainer;
