import { atom, injectStore } from "@zedux/react";

const toastsStoreAtom = atom("toastsStore", () => {
  const toasts = injectStore([]);
  const store = injectStore();

  store.use({ toasts });
  return store;
});

export { toastsStoreAtom };
