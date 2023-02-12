import {
  ToastState,
  Listener,
  ToastOptions,
  ToastHandleProps,
  ListenerCallback,
  StateCallback,
} from './toast.types';

const createStore = () => {
  let listeners: Listener[] = [];
  let state: ToastState[] = [];

  const setListeners = (callback: ListenerCallback) => {
    listeners = callback(listeners);
  };

  const setState = (callback: StateCallback) => {
    state = callback(state);
  };

  const emitChange = () => {
    listeners.forEach(listener => listener());
  };

  return {
    getSnapshot: () => state,

    subscribe: (listener: Listener) => {
      setListeners(prev => [...prev, listener]);

      return () => {
        setListeners(prev => prev.filter(l => l !== listener));
      };
    },

    notify: (options: ToastOptions) => {
      const toast = createToast(options);

      setState(prev => [...prev, toast]);
      emitChange();
    },

    remove: (id: ToastHandleProps['id']) => {
      setState(prev => prev.filter(toast => toast.id !== id));
      emitChange();
    },

    close: (id: ToastHandleProps['id']) => {
      setState(prev =>
        prev.map(toast =>
          toast.id === id ? { ...toast, isClosed: true } : toast
        )
      );
      emitChange();
    },

    clearAll: () => {
      setState(() => []);
      emitChange();
    },
  };
};

let count = 0;
const createToast = ({
  status = 'info',
  duration = 3000,
  isClosable = true,
  position = 'bottom',
  onClose,
  ...rest
}: ToastOptions): ToastHandleProps => {
  count += 1;
  const id = `toast-${count}` as const;
  const onToastClose = () => {
    toastStore.close(id);
    onClose?.();
  };

  return {
    id,
    status,
    duration,
    isClosable,
    isClosed: false,
    position,
    onRequestRemove: () => toastStore.remove(id),
    onClose: onToastClose,
    ...rest,
  };
};

const toastStore = createStore();

export default toastStore;
