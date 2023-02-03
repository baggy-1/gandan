import { Flex, Box, Text, Center, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { css, useTheme } from '@emotion/react';
import { ChevronLeft } from '~/assets/svgs/common';

const LoginNav = () => {
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
          <Button>
            <Link
              href="/"
              css={css`
                width: 2rem;
                height: 2rem;
              `}
            >
              <ChevronLeft />
            </Link>
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
