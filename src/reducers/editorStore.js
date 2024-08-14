import { atom, injectStore } from "@zedux/react";

const editorStoreAtom = atom("editorStore", () => {
  const editorCurrentSelection = injectStore("");
  const editorSelectionRange = injectStore({});
  const editorEnhancedSelection = injectStore("");
  const editorEnhancementCount = injectStore(0);

  const store = injectStore();
  store.use({ editorCurrentSelection, editorSelectionRange, editorEnhancedSelection, editorEnhancementCount });

  return store;
});

export { editorStoreAtom };
