import { Box, Center, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import { useQueryNewsById } from '~/services/client/news/queries';
import { useQueryBookmark } from '~/services/client/bookmark/queries';
import Headline from '~/components/common/Headline';
import { HeadlineContainerSkeleton } from '~/components/common/Skeleton';
import { Bookmark } from '~/assets/svgs/common';
import {
  useCreateBookmark,
  useDeleteBookmark,
} from '~/services/client/bookmark';
import { getKoreaDate } from '~/utils';

interface Props {
  id: string;
}

const NewsDetail = ({ id }: Props) => {
  const { data: news } = useQueryNewsById(id);
  const { data: bookmarks } = useQueryBookmark();
  const { mutate: createBookmarkMutate } = useCreateBookmark();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { colors, typography } = useTheme();

  const isCheckedBookmark = bookmarks?.some(
    bookmark => bookmark.id === news.id
  );

  const toggleBookmark = () => {
    if (isCheckedBookmark) {
      deleteBookmarkMutate(news.id);
      return;
    }

    const { id: newsId, title, thumbnail } = news;
    const { datetime } = getKoreaDate(new Date());

    createBookmarkMutate({
      id: newsId,
      title,
      thumbnail,
      createAt: datetime,
    });
  };

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
          onClick={toggleBookmark}
        >
          <Bookmark fill={isCheckedBookmark} />
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
