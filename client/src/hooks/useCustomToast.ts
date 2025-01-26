import { toast, ToastOptions } from "react-toastify";

const useCustomToast = () => {
  return ({ msg, options }: { msg: string; options?: ToastOptions }) => {
    toast(msg, {
      autoClose: 3000,
      closeButton: false,
      position: "bottom-right",
      theme: "light",
      type: options?.type || "success",
      style: { fontFamily: "Poppins, sans-serif" },
    });
  };
};

export default useCustomToast;
