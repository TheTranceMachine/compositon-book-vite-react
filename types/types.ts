import * as monaco from "monaco-editor";

export type PromptTypes = {
  lockView: () => void;
  closePane: () => void;
  editorCurrentSelection: string;
  changeEditorEnhancedSelection: (val: string) => void
};

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

export type CharacterTypes = {
  name: string;
  description: string;
};

export type StorySettingTypes = {
  title: string;
  description: string;
};

export type DeletionItemType = {
  id: number,
  title: string;
  type: string;
}

export type showPopupTypes = {
  position: monaco.Position
  title: string
  description: string
  type: string
};

export type PopupContentTypes = {
  title: string
  description: string
  type: string
};

export type MonacoEditorCurrentSelectionTypes = {
  range: monaco.Selection | null
  currentSelection: string
};

export type MonacoEditorTypes = {
  resizePanel: () => void
  changeEditorCurrentSelection: (selection: MonacoEditorCurrentSelectionTypes) => void
  editorEnhancedSelection: string
  editorSelectionRange: monaco.Range
  characters: Array<CharacterTypes>
  storySettings: Array<StorySettingTypes>
  newCharacter: (name: string) => void
  newSetting: (title: string) => void
  openCharactersPane: () => void
  openStorySettingsPane: () => void
};

export type NewCharacterDecorationsTypes = monaco.editor.IModelDeltaDecoration[] | { range: monaco.Range; options: { inlineClassName: string; }; }[];
export type NewStorySettingDecorationsTypes = monaco.editor.IModelDeltaDecoration[] | { range: monaco.Range; options: { inlineClassName: string; }; }[];