/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { css, useTheme } from '@emotion/react';
import { Close } from '~/assets/svgs/common';
import Portal from '../Portal';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  closeIcon?: React.ReactNode;
}

const BottomSheet = ({ children, onClose, closeIcon }: Props) => {
  const { keyframes } = useTheme();
  return (
    <Portal>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        `}
        onClick={onClose}
      />
      <div
        css={css`
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          max-width: 40rem;
          height: auto;
          background-color: #ffffff;
          border-radius: 1rem 1rem 0 0;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: ${keyframes.bottomUp} 0.2s ease-out;
        `}
      >
        {children}
        <button
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            margin: 1.5rem 1rem;
          `}
          onClick={onClose}
          type="button"
        >
          {closeIcon || <Close width="1.5rem" height="1.5rem" />}
        </button>
      </div>
    </Portal>
  );
};

export default BottomSheet;
