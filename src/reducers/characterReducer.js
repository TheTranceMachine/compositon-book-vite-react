import { actionFactory, createReducer, createStore } from "@zedux/react";

const storeSelectedCharacter = actionFactory("selectedCharacter");
const storeCharacters = actionFactory("storeCharacters");
const deleteCharacter = actionFactory("deleteCharacter");

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
  })
  .reduce(deleteCharacter, (state, id) => {
    const characters = state.characters.filter((character) => character.id !== id);
    return { ...state, characters };
  });

const characterStore = createStore(reducer);

export { characterStore, storeSelectedCharacter, storeCharacters, deleteCharacter };
