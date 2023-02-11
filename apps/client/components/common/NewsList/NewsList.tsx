import { Flex, SimpleGrid } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import NewsCard from '~/components/common/NewsCard';

interface Props {
  newslist: News[];
}

const NewsList = ({ newslist }: Props) => {
  const { mediaQuery } = useTheme();

  return (
    <Flex
      css={css`
        width: 100%;
        height: 100%;
        justify-content: center;
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
        {newslist.map(news => {
          return <NewsCard key={news.id} news={news} />;
        })}
      </SimpleGrid>
    </Flex>
  );
};

export default NewsList;
