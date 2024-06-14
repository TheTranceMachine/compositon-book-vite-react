import { createContext } from "react";
import { useAtomState } from "@zedux/react";
import { CustomToastsContainer } from "../components/Toast/CustomToastsContainer";
import { toastsStoreAtom } from "../reducers/toastStore";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toastStore, setToastStore] = useAtomState(toastsStoreAtom);
  const { toasts } = toastStore;

  const dispatchAddToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000000);
    setToastStore({
      ...toastStore,
      ...{ id, message, type },
    });
  };

  const dispatchDeleteToast = (id) => {
    const updatedToasts = toasts.filter((toast) => toast.id !== id);
    setToastStore({ ...updatedToasts });
  };

  const success = (message) => {
    dispatchAddToast("success", message);
  };

  const warning = (message) => {
    dispatchAddToast("warning", message);
  };

  const info = (message) => {
    dispatchAddToast("info", message);
  };

  const error = (message) => {
    dispatchAddToast("danger", message);
  };

  const value = { success, warning, info, error, dispatchDeleteToast };

  return (
    <ToastContext.Provider value={value}>
      <CustomToastsContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};
