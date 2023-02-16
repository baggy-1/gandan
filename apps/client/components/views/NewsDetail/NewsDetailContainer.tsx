import { Divider, VStack } from '@chakra-ui/react';
import { useTheme, css } from '@emotion/react';
import { createContext, Suspense, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryNewsById } from '~/services/client/news/queries';
import { HeadlineContainerSkeleton } from '~/components/common';
import Header from './Header';
import Headline from './Headline';

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

// TODO : 추후에 분리
interface NewsDetailValue {
  isFontSizeLarge: boolean;
  setIsFontSizeLarge: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsDetailContext = createContext<NewsDetailValue | null>(null);

const NewsDetailProvider = () => {
  const [isFontSizeLarge, setIsFontSizeLarge] = useState(false);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { isFontSizeLarge, setIsFontSizeLarge };

  return (
    <NewsDetailContext.Provider value={value}>
      <NewsDetailContainer />
    </NewsDetailContext.Provider>
  );
};

export const useNewsDetail = () => {
  const context = useContext(NewsDetailContext);

  if (!context) {
    throw new Error('must be used within a NewsDetailProvider');
  }

  return context;
};

const SuspenseNewsDetailContainer = () => {
  return (
    <Suspense fallback={<HeadlineContainerSkeleton />}>
      <NewsDetailProvider />
    </Suspense>
  );
};

export default SuspenseNewsDetailContainer;
