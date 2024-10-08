import { atom, injectStore } from "@zedux/react";

const projectStoreAtom = atom("projectStore", () => {
  const selectedCharacter = injectStore({});
  const characters = injectStore([]);

  const selectedStorySetting = injectStore({});
  const storySettings = injectStore([]);

  const selectedProject = injectStore({});
  const projects = injectStore([]);

  const store = injectStore();
  // .use() configures the store after creation:
  store.use({ selectedCharacter, characters, selectedStorySetting, storySettings, selectedProject, projects });

  return store;
});

export { projectStoreAtom };
