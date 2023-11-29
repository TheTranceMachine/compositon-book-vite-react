export type FunctionArrayType = Function[];

export interface Project {
  projectId: string;
  project: {
    projectName: FormDataEntryValue;
    projectDescription: FormDataEntryValue;
  };
}
