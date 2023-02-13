import { Suspense } from 'react';
import { css } from '@emotion/react';
import { Grid, NewsCard, NewsListSkeleton } from '~/components/common';
import { useSuspensedQueryBookmark } from '~/services/client/bookmark';

const BookmarksContainer = () => {
  const { data: bookmarks } = useSuspensedQueryBookmark();

  if (bookmarks.length === 0) {
    return (
      <div
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
        `}
      >
        <div
          css={css`
            font-size: 1.2rem;
            font-weight: 500;
          `}
        >
          저장한 뉴스가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <Grid>
      {bookmarks.map(bookmark => {
        return <NewsCard {...bookmark} />;
      })}
    </Grid>
  );
};

const SuspenseBookmarksContainer = () => {
  return (
    <Suspense fallback={<NewsListSkeleton count={4} />}>
      <BookmarksContainer />
    </Suspense>
  );
};

export default SuspenseBookmarksContainer;
