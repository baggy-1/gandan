import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  direction?: 'row' | 'column';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
}

const Flex = ({
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start',
  wrap = 'nowrap',
  gap = '0',
}: Props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction};
        justify-content: ${justify};
        align-items: ${align};
        flex-wrap: ${wrap};
        gap: ${gap};
      `}
    >
      {children}
    </div>
  );
};

export default Flex;
