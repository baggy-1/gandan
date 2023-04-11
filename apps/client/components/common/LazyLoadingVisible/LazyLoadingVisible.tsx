import { type CSSProperties, type PropsWithChildren, useRef } from 'react';
import { css } from '@emotion/react';
import useVisibility from './hooks/useVisibility';

interface Props extends PropsWithChildren {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  threshold?: number;
  once?: boolean;
}

const LazyLoadingVisible = ({
  width = 'auto',
  height = 'auto',
  threshold = 0,
  once = true,
  children,
}: Props) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisibility(observerRef, {
    threshold,
    once,
  });

  return (
    <div
      css={css`
        width: ${width};
        height: ${height};
      `}
      ref={observerRef}
    >
      {isVisible ? children : null}
    </div>
  );
};

export default LazyLoadingVisible;
