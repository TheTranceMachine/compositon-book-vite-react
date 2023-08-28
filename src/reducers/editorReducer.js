import { actionFactory, createReducer, createStore } from "@zedux/react";

const storeEnhancedSelection = actionFactory("storeEnhancedSelection");
const storeCurrentSelection = actionFactory("storeCurrentSelection");

const initialState = {
  currentSelection: "",
  range: Object,
  enhancedSelection: "",
  enhancementCount: 0,
};

const reducer = createReducer(initialState)
  .reduce(storeEnhancedSelection, (state, { enhancedSelection }) => {
    return { ...state, enhancedSelection };
  })
  .reduce(storeCurrentSelection, (state, { range, currentSelection }) => {
    return { ...state, range, currentSelection, enhancedSelection: "" };
  });

const editorStore = createStore(reducer);

export { editorStore, storeEnhancedSelection, storeCurrentSelection };
