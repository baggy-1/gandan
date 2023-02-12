import { css, useTheme } from '@emotion/react';
import { PropsWithChildren } from 'react';

const Grid = ({ children }: PropsWithChildren) => {
  const { mediaQuery } = useTheme();

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-gap: 1rem;

          ${mediaQuery.tablet`
          grid-template-columns: repeat(3, minmax(0, 1fr));
        `}

          ${mediaQuery.desktop`
          grid-template-columns: repeat(4, minmax(0, 1fr));
        `}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Grid;
