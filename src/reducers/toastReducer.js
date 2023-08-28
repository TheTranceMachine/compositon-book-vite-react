import { actionFactory, createReducer, createStore } from "@zedux/react";

const addToast = actionFactory("addToast");
const deleteToast = actionFactory("deleteToast");

const reducer = createReducer({ toasts: [] })
  .reduce(addToast, (state, toast) => {
    return { ...state, toasts: [...state.toasts, toast] };
  })
  .reduce(deleteToast, (state, id) => {
    const updatedToasts = state.toasts.filter((toast) => toast.id !== id);
    return {
      ...state,
      toasts: updatedToasts,
    };
  });

const toastStore = createStore(reducer);

export { toastStore, addToast, deleteToast };
