import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { editorStore, storeCurrentSelection } from "../../reducers/editorReducer";
import { useToast } from "../../hooks/useToast";
import "./Editor.scss";

const MonacoEditor = ({ resizePanel, newCharacter, newSetting, openCharactersPane, openStorySettingsPane }) => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleEditorDidMount = (editor, monaco) => {
    editor.addAction({
      id: "create-new-character",
      label: "Create New Character",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyC],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1,
      run: () => {
        const currentSelection = editor.getModel().getValueInRange(editor.getSelection());
        newCharacter(currentSelection);
      },
    });

    editor.addAction({
      id: "create-new-setting",
      label: "Create New Story Setting",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 2,
      run: () => {
        const currentSelection = editor.getModel().getValueInRange(editor.getSelection());
        newSetting(currentSelection);
      },
    });

    editor.addAction({
      id: "ai-enhance",
      label: "Enhance with AI",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyE],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 3,
      run: () => {
        const range = editor.getSelection();
        const currentSelection = editor.getModel().getValueInRange(range);
        if (currentSelection) {
          editorStore.dispatch(storeCurrentSelection({ range, currentSelection }));
          resizePanel();
          navigate("enhance");
        } else {
          alert('Please select text to enhance and then click "Enhance with AI"');
        }
      },
    });

    editor.addAction({
      id: "view-characters",
      label: "View Characters",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyV],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 4,
      run: () => {
        openCharactersPane();
      },
    });

    editor.addAction({
      id: "view-settings",
      label: "View Story Settings",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyD],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 5,
      run: () => {
        openStorySettingsPane();
      },
    });

    editorRef.current = editor;
  };

  // TODO: test if this works - it's about enhancing the text when changes appear
  useEffect(() => {
    const subscription = editorStore.subscribe(({ range, enhancedSelection }) => {
      if (enhancedSelection !== "") {
        const options = {
          range,
          text: enhancedSelection,
        };
        editorRef.current.executeEdits("enhance-text", [options]);
        toast.success("Your text was enhanced!");
      }
    });

    return () => subscription.unsubscribe();
  }, [editorRef.current]);

  return (
    <Editor
      className="editor"
      defaultLanguage="plaintext"
      theme="light"
      defaultValue="Welcome! Please replace this text with your own."
      value="Welcome! Please replace this text with your own."
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        contextmenu: true,
        wordWrap: "on",
      }}
      onMount={handleEditorDidMount}
    />
  );
};

export default MonacoEditor;
