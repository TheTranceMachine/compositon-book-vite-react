import { actionFactory, createReducer, createStore } from "@zedux/react";

const storeProjectData = actionFactory("updateProject");

const initialState = {
  projectId: "",
  projectName: "",
  projectDescription: ""
};

const reducer = createReducer(initialState)
  .reduce(storeProjectData, (state, { projectId, projectName, projectDescription }) => {
    return { ...state, projectId, projectName, projectDescription };
  });

const projectStore = createStore(reducer);

export { projectStore, storeProjectData };
