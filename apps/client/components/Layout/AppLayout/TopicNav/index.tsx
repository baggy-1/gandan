import { useRouter } from 'next/router';
import { css, useTheme } from '@emotion/react';
import { useRef } from 'react';
import { topic as TOPICS } from '~/constants';
import { hasProperty } from '~/utils';
import { ChevronLeft } from '~/assets/svgs/common';
import TopicBadge from './TopicBadge';
import useScrollTopicBox from './TopicNav.hooks';

const topics = Object.values(TOPICS);

const accessPath = ['/news/[id]', '/'];

const TopicNav = () => {
  const {
    query: { topic: topicQuery },
    pathname,
  } = useRouter();
  const topicsContainer = useRef<HTMLDivElement>(null);
  const { scrollPosition, onClickScrollX } = useScrollTopicBox(
    topicsContainer.current
  );

  if (!accessPath.includes(pathname) && !validTopic(topicQuery)) {
    return null;
  }

  const _topicId = accessPath.includes(pathname) ? 'daily' : topicQuery;

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
      `}
    >
      {scrollPosition.isLeftShow && (
        <div css={ArrowBox('left')}>
          <button
            css={css`
              cursor: pointer;
            `}
            type="button"
            onClick={() => onClickScrollX(-100)}
          >
            <ChevronLeft fill="#ffffff" />
          </button>
          <div css={ArrowPadding('right')} />
        </div>
      )}
      <div
        css={css`
          width: 100%;
          overflow-x: auto;
          ::-webkit-scrollbar {
            display: none;
          }
          -ms-overflow-style: none;
          scrollbar-width: none;
        `}
        ref={topicsContainer}
      >
        <div
          css={css`
            width: max-content;
            display: flex;
            justify-content: flex-start;
            gap: 1rem;
            padding: 0.5rem 1rem;
          `}
        >
          {topics.map(topic => {
            return (
              <TopicBadge
                key={topic.id}
                isActive={topic.id === _topicId}
                {...topic}
              />
            );
          })}
        </div>
      </div>
      {scrollPosition.isRightShow && (
        <div css={ArrowBox('right')}>
          <div css={ArrowPadding('left')} />
          <button
            css={css`
              cursor: pointer;
              transform: rotate(180deg);
            `}
            type="button"
            onClick={() => onClickScrollX(100)}
          >
            <ChevronLeft fill="#ffffff" />
          </button>
        </div>
      )}
    </div>
  );
};

const ArrowBox = (position: 'left' | 'right') => {
  const { mediaQuery } = useTheme();

  return css`
    display: none;

    ${mediaQuery.tablet`
    display: flex;
    position: absolute;
    top: 0;
    ${css`
      ${position}: 0;
    `}
    height: 100%;
    z-index: 999;
    justify-content: center;
    align-items: center;
    `}
  `;
};

const ArrowPadding = (position: 'left' | 'right') => {
  return css`
    width: 3.5rem;
    height: 100%;
    background: linear-gradient(
      to ${position},
      rgba(255, 255, 255, 1) 20%,
      rgba(255, 255, 255, 0) 80%
    );
  `;
};

const validTopic = (topic: string | string[] | undefined) => {
  return !(!topic || typeof topic !== 'string' || !hasProperty(TOPICS, topic));
};

export default TopicNav;
