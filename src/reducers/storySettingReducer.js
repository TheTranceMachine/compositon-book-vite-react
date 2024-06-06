import { actionFactory, createReducer, createStore } from "@zedux/react";

const storeSelectedStorySetting = actionFactory("selectedStorySetting");
const storeStorySettings = actionFactory("storeStorySettings");
const deleteStorySetting = actionFactory("deleteStorySetting");

const initialState = {
  selectedStorySetting: {},
  storySettings: [],
};

const reducer = createReducer(initialState)
  .reduce(storeSelectedStorySetting, (state, { selectedStorySetting }) => {
    return { ...state, selectedStorySetting };
  })
  .reduce(storeStorySettings, (state, { storySetting }) => {
    return { ...state, storySettings: [...state.storySettings, storySetting] };
  })
  .reduce(deleteStorySetting, (state, id) => {
    const storySettings = state.storySettings.filter((setting) => setting.id !== id);
    return { ...state, storySettings };
  });

const storySettingsStore = createStore(reducer);

export { storySettingsStore, storeSelectedStorySetting, storeStorySettings, deleteStorySetting };
