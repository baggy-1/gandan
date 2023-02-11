import { Box, Card, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Link from 'next/link';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import { CursorArrow } from '@svgs/common';
import { useQueryNewsById } from '~/services/client/news/queries';

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
      <Box
        css={css`
          width: 100%;
          padding: 0 1rem;
          justify-content: flex-start;
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
        {news.headlines.map(({ id: headlineId, link, title, press }) => {
          return (
            <Link key={headlineId} href={link}>
              <Card>
                <Flex
                  css={css`
                    gap: 0.5rem;
                    flex-direction: column;
                  `}
                >
                  <Flex>
                    <Box
                      css={css`
                        width: fit-content;
                        padding: 0.25rem;
                        border: 1px solid ${colors.grayE8};
                        border-radius: 0.25rem;
                        background-color: ${colors.grayE8};
                      `}
                    >
                      <span
                        css={css`
                          ${typography.button}
                        `}
                      >
                        {press}
                      </span>
                    </Box>
                    <CursorArrow width="1.5rem" height="1.5rem" />
                  </Flex>
                  <span>{title}</span>
                </Flex>
              </Card>
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
