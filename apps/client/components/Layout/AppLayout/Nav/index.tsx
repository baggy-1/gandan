import { Flex, Text, Button, Avatar } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronLeft } from '~/assets/svgs/common';

const Nav = () => {
  const { pathname, push } = useRouter();
  const { isDetail, isAuthorized } = getRouterState(pathname);
  const { typography, colors } = useTheme();

  return (
    <header
      css={css`
        width: 100%;
        height: 100%;
        padding: 1rem;
        color: ${colors.white};
        background-color: ${colors.primary};
        position: sticky;
        top: 0;
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
        <Flex
          css={css`
            width: 33%;
            height: 2rem;
            margin-right: auto;
            justify-content: flex-start;
            align-items: center;
          `}
        >
          {isDetail && (
            <Link href="/">
              <ChevronLeft stroke={colors.white} />
            </Link>
          )}
        </Flex>
        <Button>
          <Link href="/">
            <Text
              css={css`
                ${typography.headline5}
              `}
            >
              GD News
            </Text>
          </Link>
        </Button>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          css={css`
            width: 33%;
            height: 2rem;
            margin-left: auto;
            justify-content: flex-end;
            align-items: center;
          `}
        >
          {isAuthorized ? (
            <Avatar
              css={css`
                width: 2rem;
                height: 2rem;
              `}
            />
          ) : (
            <Button
              css={css`
                ${typography.subtitle1}
              `}
              onClick={() => push('/login')}
            >
              로그인
            </Button>
          )}
        </Flex>
      </Flex>
    </header>
  );
};

const getRouterState = (pathname: string) => {
  // TODO: 뒤로 가야할 페이지들 변수명 생각해보기
  const detail = ['/news/[id]'];

  return {
    isDetail: detail.includes(pathname),
    // TODO: 로그인 여부 확인
    isAuthorized: false,
  };
};

export default Nav;
