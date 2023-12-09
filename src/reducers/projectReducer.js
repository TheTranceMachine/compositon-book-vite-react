import { actionFactory, createReducer, createStore } from '@zedux/react';

const storeSelectedProject = actionFactory('selectedProject');
const storeAllProjects = actionFactory('allProjects');

const initialState = {
  selectedProject: {},
  projects: {},
};

const reducer = createReducer(initialState)
  .reduce(
    storeSelectedProject,
    (state, selectedProject) => {
      return { ...state, selectedProject };
    },
  )
  .reduce(storeAllProjects, (state, projects) => {
    return { ...state, projects };
  });

const projectStore = createStore(reducer);

export { projectStore, storeSelectedProject, storeAllProjects };
