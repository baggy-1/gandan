import { css } from '@emotion/react';
import { useSyncExternalStore, useEffect } from 'react';
import Portal from '~/components/common/Portal';
import toastStore from '../toast.store';
import { ToastHandleProps } from '../toast.types';
import Toast from './Toast';

const ToastContainer = () => {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getSnapshot
  );

  return (
    <Portal>
      <div
        id="toast-container"
        css={css`
          position: fixed;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 20rem;
          gap: 0.5rem;
          display: flex;
          flex-direction: column;
        `}
      >
        {toasts.map(toastProps => {
          return <ToastHandleComponent key={toastProps.id} {...toastProps} />;
        })}
      </div>
    </Portal>
  );
};

const ToastHandleComponent = ({ duration, ...rest }: ToastHandleProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      rest.onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <Toast {...rest} />;
};

export default ToastContainer;
