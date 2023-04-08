import { css, useTheme } from '@emotion/react';
import { ChevronLeft } from '~/assets/svgs/common';

const ScrollTopButton = () => {
  const { colors } = useTheme();

  return (
    <button
      css={css`
        position: fixed;
        bottom: 3rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background-color: ${colors.primary};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 100;
        margin: 1rem;
        transform: rotate(90deg);
      `}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      type="button"
    >
      <ChevronLeft
        fill={colors.primary}
        stroke={colors.white}
        strokeWidth={3}
      />
    </button>
  );
};

export default ScrollTopButton;
