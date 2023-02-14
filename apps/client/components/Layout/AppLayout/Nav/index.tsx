import { Flex, Text, Button } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronLeft } from '@svgs/common';
import { useQueryMe } from '~/services/client/user/queries';
import { UserAvatar } from '~/components/common';

const Nav = () => {
  const { pathname, push, back } = useRouter();
  const { isDetail } = getRouterState(pathname);
  const { typography, colors } = useTheme();
  const { data: me } = useQueryMe();

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
        z-index: 999;
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
              <button onClick={back} type="button">
                <ChevronLeft stroke={colors.white} />
              </button>
            </Link>
          )}
        </Flex>
        <Button onClick={() => push('/')}>
          <Text
            css={css`
              ${typography.headline5}
            `}
          >
            GD News
          </Text>
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
          {me ? (
            <UserAvatar
              profile={me.profile}
              onClick={() => push('/user/mynews')}
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
  const detail = ['/news/[id]', '/user/mynews', '/user/profile'];

  return {
    isDetail: detail.includes(pathname),
  };
};

export default Nav;
