import { Flex, Text, Button } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Bell, ChevronLeft, Download } from '@svgs/common';
import { useQueryMe } from '~/services/client/user/queries';
import {
  UserAvatar,
  NoticeBottomSheet,
  DownloadBottomSheet,
} from '~/components/common';
import { useBeforeInstallPrompt } from '~/hooks/';

const Nav = () => {
  const { pathname, push, back } = useRouter();
  const { isDetail } = getRouterState(pathname);
  const { typography, colors } = useTheme();
  const { data: me } = useQueryMe();
  const { isPWA, ...rest } = useBeforeInstallPrompt();
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const toggleNoticeModal = () => {
    setIsNoticeModalOpen(prev => !prev);
  };

  const closeNoticeModal = () => {
    setIsNoticeModalOpen(false);
  };

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen(prev => !prev);
  };

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  return (
    <>
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
              gap: 1rem;
            `}
          >
            {isPWA ? (
              <button onClick={toggleNoticeModal} type="button">
                <Bell width="1.5rem" height="1.5rem" />
              </button>
            ) : (
              <button onClick={toggleDownloadModal} type="button">
                <Download width="1.5rem" height="1.5rem" />
              </button>
            )}
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
      {isNoticeModalOpen && <NoticeBottomSheet onClose={closeNoticeModal} />}
      {isDownloadModalOpen && (
        <DownloadBottomSheet onClose={closeDownloadModal} {...rest} />
      )}
    </>
  );
};

const getRouterState = (pathname: string) => {
  const detail = ['/news/[id]', '/user/mynews', '/user/profile'];

  return {
    isDetail: detail.includes(pathname),
  };
};

export default Nav;
