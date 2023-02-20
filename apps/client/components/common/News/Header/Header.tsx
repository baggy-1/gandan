import { Box, Flex, Text } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';

interface Props extends Pick<News, 'createAt'> {
  title: string;
  right?: React.ReactNode;
}

const Header = ({ title, createAt, right }: Props) => {
  const { typography } = useTheme();

  return (
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
          {title}
        </Text>
        <Text
          css={css`
            ${typography.body2}
          `}
        >
          {createAt}
        </Text>
      </Box>
      {right}
    </Flex>
  );
};

export default Header;
