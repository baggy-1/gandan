import { css } from '@emotion/react';
import { Suspense } from 'react';
import { UserAvatar } from '~/components/common';
import { useSuspensedQueryMe } from '~/services/client/user';
import Bookmarks from './Bookmarks';

const MyNewsContainer = () => {
  const { data: me } = useSuspensedQueryMe();

  return (
    <div
      css={css`
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      `}
    >
      <div
        css={css`
          display: flex;
          width: 100%;
          height: auto;
          gap: 1rem;
          justify-content: flex-start;
          align-items: center;
        `}
      >
        <UserAvatar profile={me.profile} width={48} height={48} />
        <div
          css={css`
            font-size: 1.3rem;
            font-weight: 500;
          `}
        >
          {me.nickname}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <div
          css={css`
            width: 6rem;
            height: 2rem;
            border-radius: 1.5rem;
            background-color: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 1rem;
            font-size: 0.8rem;
          `}
        >
          저장한 뉴스
        </div>
        <Bookmarks />
      </div>
    </div>
  );
};

const SuspenseMyNewsContainer = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MyNewsContainer />
    </Suspense>
  );
};

export default SuspenseMyNewsContainer;
