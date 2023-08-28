import { createContext, useEffect, useState } from "react";
import { CustomToastsContainer } from "../components/Toast/CustomToastsContainer";
import { toastStore, addToast, deleteToast } from "../reducers/toastReducer";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const initialState = toastStore.getState();
  const [toasts, setToasts] = useState(initialState);

  useEffect(() => {
    const subscription = toastStore.subscribe((state) => {
      setToasts(state);
    });
    return () => subscription.unsubscribe();
  });

  const dispatchAddToast = (type, message) => {
    const id = Math.floor(Math.random() * 10000000);
    toastStore.dispatch(addToast({ id, message, type }));
  };

  const dispatchDeleteToast = (id) => {
    toastStore.dispatch(deleteToast({ id }));
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
      <CustomToastsContainer toasts={toasts.toasts} />
      {children}
    </ToastContext.Provider>
  );
};
