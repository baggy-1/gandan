import { Flex, SimpleGrid } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import { PropsWithChildren } from 'react';

const Grid = ({ children }: PropsWithChildren) => {
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
        {children}
      </SimpleGrid>
    </Flex>
  );
};

export default Grid;
