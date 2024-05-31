import { actionFactory, createReducer, createStore } from "@zedux/react";

const storeSelectedCharacter = actionFactory("selectedCharacter");
const storeCharacters = actionFactory("storeCharacters");

const initialState = {
  selectedCharacter: {},
  characters: [],
};

const reducer = createReducer(initialState)
  .reduce(storeSelectedCharacter, (state, { selectedCharacter }) => {
    return { ...state, selectedCharacter };
  })
  .reduce(storeCharacters, (state, { character }) => {
    return { ...state, characters: [...state.characters, character] };
  });

const characterStore = createStore(reducer);

export { characterStore, storeSelectedCharacter, storeCharacters };
