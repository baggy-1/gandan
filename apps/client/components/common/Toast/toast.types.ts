export interface ToastHandleProps {
  id: `toast-${number}`;
  title: string;
  description?: string;
  status: 'info' | 'warning' | 'success' | 'error';
  duration: number;
  isClosable: boolean;
  isClosed: boolean;
  position: 'bottom';
  onClose: VoidFunction;
  onRequestRemove: VoidFunction;
}

export type ToastProps = Omit<ToastHandleProps, 'duration'>;

export type ToastOptions = Pick<ToastHandleProps, 'title' | 'description'> &
  Partial<
    Pick<
      ToastHandleProps,
      'onClose' | 'duration' | 'isClosable' | 'position' | 'status'
    >
  >;

export type ToastState = ToastHandleProps;

export type Listener = VoidFunction;

export type ListenerCallback = (prev: Listener[]) => Listener[];

export type StateCallback = (prev: ToastState[]) => ToastState[];
