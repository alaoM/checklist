// toastUtils.ts
import { toast, ToastOptions } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: "top-right"
};

export const showSuccessToast = (message: string) => {
  toast.success(message, toastOptions);
};

export const showErrorToast = (message: string) => {
  toast.error(message, toastOptions);
};

export const showInfoToast = (message: string) => {
  toast.info(message, toastOptions);
};
