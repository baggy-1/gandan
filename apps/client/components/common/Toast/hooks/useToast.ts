import toastStore from '../toast.store';
import { ToastOptions } from '../toast.types';

const useToast = () => {
  const { notify } = toastStore;

  const toast = (props: ToastOptions) => {
    notify(props);
  };

  return toast;
};

export default useToast;
