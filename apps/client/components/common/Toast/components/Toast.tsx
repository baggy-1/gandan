import { css, useTheme } from '@emotion/react';
import { Checked, Close, Info } from '@svgs/common';
import { ToastProps } from '../toast.types';

const Toast = ({
  id,
  title,
  description,
  isClosed,
  isClosable,
  onClose,
  onRequestRemove,
  status,
}: ToastProps) => {
  const { keyframes } = useTheme();
  const Icon = getIcon(status);

  return (
    <div
      id={id}
      css={css`
        position: relative;
        width: 20rem;
        height: auto;
        background-color: #e2e2e2;
        animation: ${isClosed ? keyframes.scaleOut : keyframes.bottomIn} 0.3s
          ease-in-out;
        background-color: ${statusColors[status]};
        border-radius: 0.5rem;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: ${isClosable ? 'pointer' : 'default'};
      `}
      onAnimationEnd={isClosed ? onRequestRemove : undefined}
      onClick={isClosable ? onClose : undefined}
      onKeyUp={isClosable ? onClose : undefined}
      role="button"
      tabIndex={0}
    >
      <div
        css={css`
          flex-shrink: 0;
          margin-bottom: auto;
        `}
      >
        <Icon />
      </div>
      {isClosable && (
        <button
          css={css`
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
          `}
          type="button"
          onClick={onClose}
        >
          <Close width="1rem" height="1rem" />
        </button>
      )}
      <div
        css={css`
          padding: 0 0.5rem;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        `}
      >
        <div
          css={css`
            font-weight: 600;
          `}
        >
          {title}
        </div>
        {description && <div>{description}</div>}
      </div>
    </div>
  );
};

const statusColors: Record<ToastProps['status'], string> = {
  info: '#90CDF4',
  success: '#9AE6B4',
  warning: '#FBD38D',
  error: '#FEB2B2',
};

const getIcon = (status: ToastProps['status']) => {
  switch (status) {
    case 'success':
      return Checked;
    default:
      return Info;
  }
};

export default Toast;
