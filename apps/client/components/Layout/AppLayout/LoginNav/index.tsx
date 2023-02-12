import { Flex, Box, Text, Center, Button } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import { ChevronLeft } from '@svgs/common';
import { useRouter } from 'next/router';

const LoginNav = () => {
  const { back } = useRouter();
  const { colors, typography } = useTheme();

  return (
    <header
      css={css`
        background-color: ${colors.white};
        width: 100%;
        height: 100%;
        position: sticky;
        top: 0;
        padding: 1rem;
        display: flex;
        justify-content: center;
        z-index: 999;
      `}
    >
      <Flex
        css={css`
          width: 100%;
          max-width: 96rem;
        `}
      >
        <Box
          css={css`
            width: 33%;
          `}
        >
          <Button
            css={css`
              width: 2rem;
              height: 2rem;
            `}
            onClick={back}
          >
            <ChevronLeft />
          </Button>
        </Box>
        <Center
          css={css`
            width: 33%;
          `}
        >
          <Text
            css={css`
              ${typography.headline5}
            `}
          >
            로그인
          </Text>
        </Center>
      </Flex>
    </header>
  );
};

export default LoginNav;
