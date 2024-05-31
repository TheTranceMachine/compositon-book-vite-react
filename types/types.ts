export type FunctionArrayType = Function[];

export type Project = {
  projectId: number;
  projectCreationTimestamp: string;
  projectName: string;
  projectDescription: string;
};

export type ModalInitialPropsTypes = {
  show: boolean;
  projectId: number | null;
  projectName: string;
};

export type ProjectsCollectionSnapshotTypes = {
  _document?: { createTime: { timestamp: { seconds: number } } };
  id: string;
  data: Function;
};

export type ProjectStoreTypes = {
  projects: Array<Project>;
  selectedProject: object;
};

export type NewCharacter = {
  name: string;
  description: string;
};
