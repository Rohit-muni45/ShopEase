import { toast } from "react-toastify";

export const showSuccessToast = (message = "Saved successfully!") => {
  toast.success(message,{ autoClose: 1000 });
};

export const showErrorToast = (message = "Something went wrong!") => {
  toast.error(message,{ autoClose: 1500 });
};

export const showInfoToast = (message) => {
  toast.info(message,{ autoClose: 1500 });
};

export const showWarningToast = (message) => {
  toast.warning(message);
};


