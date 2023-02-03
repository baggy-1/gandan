import { Flex, Text } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';

const Nav = () => {
  const { typography } = useTheme();
  return (
    <Flex>
      <Text
        css={css`
          ${typography.headline4}
        `}
      >
        GD News
      </Text>
    </Flex>
  );
};

export default Nav;
