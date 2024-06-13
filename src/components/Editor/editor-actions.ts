import * as monaco from "monaco-editor";

export default [
  {
    id: "create-new-character",
    label: "Create New Character",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyC],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 1,
  },
  {
    id: "create-new-setting",
    label: "Create New Story Setting",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 2,
  },
  {
    id: "ai-enhance",
    label: "Enhance with AI",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyE],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 3,
  },
  {
    id: "view-characters",
    label: "View Characters",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyV],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 4,
  },
  {
    id: "view-settings",
    label: "View Story Settings",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyD],
    contextMenuGroupId: "navigation",
    contextMenuOrder: 5,
  },
];
