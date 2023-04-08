import { Divider, VStack, Center } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useQueryNewsById } from '~/services/client/news/queries';
import {
  Header,
  Headline,
  HeadlineContainerSkeleton,
  ScrollTopButton,
} from '~/components/common';
import { isValidId } from './NewsDetail.util';
import Bookmark from './Bookmark';
import { useMagnifying } from '~/hooks';

interface Props {
  id: News['id'];
}

const NewsDetail = ({ id }: Props) => {
  const { colors } = useTheme();
  const { data: news } = useQueryNewsById(id);
  const { isFontSizeLarge, toggleFontSize, Icon } = useMagnifying();

  return (
    <VStack>
      <Header
        title={dayjs(news.createAt).locale('ko-KR').format('MM월 DD일 dddd')}
        createAt={news.createAt}
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
            <Bookmark newsId={id} />
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
        {news.headlines.map(headline => {
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

const NewsDetailContainer = () => {
  const {
    query: { id },
  } = useRouter();

  if (!id || typeof id !== 'string' || !isValidId(id)) {
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
