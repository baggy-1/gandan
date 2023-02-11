import { Center, SimpleGrid } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import NewsCardSkeleton from './NewsCardSkeleton';

const NewsListSkeleton = () => {
  const { mediaQuery } = useTheme();

  return (
    <Center
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <SimpleGrid
        columns={2}
        spacing={10}
        css={css`
          ${mediaQuery.tablet`
          grid-template-columns: repeat(3, minmax(0, 1fr));
          `}

          ${mediaQuery.desktop`
          grid-template-columns: repeat(4, minmax(0, 1fr));
          `}
        `}
      >
        {Array(8)
          .fill(0)
          .map((_, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <NewsCardSkeleton key={index} />;
          })}
      </SimpleGrid>
    </Center>
  );
};

export default NewsListSkeleton;
