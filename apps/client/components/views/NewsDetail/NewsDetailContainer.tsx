import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useQueryNewsById } from '~/services/client/news/queries';

const NewsDetailContainer = () => {
  const { query } = useRouter();
  const { id: queryId } = query;
  const id = `${queryId}`;
  const { data: news } = useQueryNewsById(id);
  const { colors, typography } = useTheme();

  return (
    <VStack>
      <Box
        css={css`
          width: 100%;
          justify-content: flex-start;
          padding: 0 1rem;
        `}
      >
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
          return (
            <Link key={headline.id} href={headline.link}>
              <Text>{headline.title}</Text>
            </Link>
          );
        })}
      </VStack>
    </VStack>
  );
};

const SuspenseNewsDetailContainer = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <NewsDetailContainer />
    </Suspense>
  );
};

export default SuspenseNewsDetailContainer;
