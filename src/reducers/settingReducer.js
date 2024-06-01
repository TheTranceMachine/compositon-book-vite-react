import { actionFactory, createReducer, createStore } from "@zedux/react";

const storeSelectedSetting = actionFactory("selectedSetting");
const storeSettings = actionFactory("storeSettings");

const initialState = {
  selectedSetting: {},
  settings: [],
};

const reducer = createReducer(initialState)
  .reduce(storeSelectedSetting, (state, { selectedSetting }) => {
    return { ...state, selectedSetting };
  })
  .reduce(storeSettings, (state, { setting }) => {
    return { ...state, settings: [...state.settings, setting] };
  });

const settingsStore = createStore(reducer);

export { settingsStore, storeSelectedSetting, storeSettings };
