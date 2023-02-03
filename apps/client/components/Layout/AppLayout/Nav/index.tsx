import { Center, Flex, Spacer, Text, Box } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import icons from '~/assets/svgs';

const Nav = () => {
  const { pathname } = useRouter();
  const { isDetail } = getRouterState(pathname);
  const { typography, colors } = useTheme();

  return (
    <header
      css={css`
        width: 100%;
        height: 100%;
        padding: 1rem;
        color: ${colors.white};
        background-color: ${colors.primary};
      `}
    >
      <nav>
        <Flex>
          {isDetail ? (
            <Center>
              <Image
                src={icons.chevronLeft}
                alt="chevron-left"
                width={32}
                height={32}
              />
            </Center>
          ) : (
            <Box
              css={css`
                width: 2rem;
                height: 2rem;
              `}
            />
          )}
          <Spacer />
          <Text
            css={css`
              ${typography.headline5}
            `}
          >
            GD News
          </Text>
          <Spacer />
          <Center>
            <Text
              css={css`
                ${typography.subtitle1}
              `}
            >
              로그인
            </Text>
          </Center>
        </Flex>
      </nav>
    </header>
  );
};

const getRouterState = (pathname: string) => {
  const detail = ['/news/[id]'];

  return {
    isDetail: detail.includes(pathname),
  };
};

export default Nav;
