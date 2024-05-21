import { useRef, useState, useEffect, useCallback } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import Button from "react-bootstrap/Button";
import { FunctionArrayType } from "../../../types/types";
import { editorStore, storeEnhancedSelection } from "../../reducers/editorReducer";
import { useToast } from "../../hooks/useToast";
import { promptAction } from "../../actions/chatGptActions";
import { PromptDropdown } from "../../components/PromptDropdown/PromptDropdown";

export const Prompt = () => {
  const navigate = useNavigate();
  const [editor, setEditor] = useState();
  // const [originalModel, setOriginalModel] = useState();
  // const [modifiedModel, setModifiedModel] = useState();
  // const [diffEditor, setDiffEditor] = useState();
  const editorState = editorStore.getState();
  const { currentSelection } = editorState;

  console.log("currentSelection", currentSelection);

  const [lockView]: FunctionArrayType = useOutletContext();
  const [enhancedText, setEnhancedText] = useState();
  // const monacoEl = useRef();
  const toast = useToast();

  console.log("enhancedText", enhancedText);
  // TODO: Check if Diff Editor is needed
  // const editorConfig = useCallback(
  //   () => ({
  //     value: enhancedText ? enhancedText : currentSelection,
  //     automaticLayout: true,
  //     language: "plaintext",
  //     theme: "vs-dark",
  //     minimap: { enabled: false },
  //     contextmenu: false,
  //     lineNumbers: "off",
  //     readOnly: true,
  //   }),
  //   [currentSelection]
  // );

  // useEffect(() => {
  //   if (enhancedText) {
  //     editor?.dispose();

  //     setOriginalModel(editor?.createModel(currentSelection, "text/plain"));
  //     setModifiedModel(editor?.createModel(enhancedText, "text/plain"));

  //     setDiffEditor(editor?.createDiffEditor(monacoEl.current, editorConfig));
  //   }
  // }, [editor, enhancedText]);

  // useEffect(() => {
  //   if (diffEditor) {
  //     diffEditor.updateOptions({
  //       contextmenu: false,
  //       renderSideBySide: false,
  //       enableSplitViewResizing: false,
  //       originalEditable: false,
  //     });

  //     diffEditor.setModel({
  //       original: originalModel,
  //       modified: modifiedModel,
  //     });
  //   }
  // }, [modifiedModel, originalModel, diffEditor]);

  const sendPrompt = async (selection: Object) => {
    // TODO: check what happens when backend returns error instead of text
    const { text, error } = await promptAction({ selection, currentSelection });
    if (text) {
      setEnhancedText(text);
      toast.success("ChatGPT responded with a new proposition");
    }
    if (error) toast.error(error);
  };

  const storeEnhancedText = () => {
    lockView();
    editorStore.dispatch(
      storeEnhancedSelection({
        enhancedSelection: enhancedText,
      })
    );
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-2 p-3 w-full">
      <PromptDropdown onChange={(selection: Object) => sendPrompt(selection)} />
      {currentSelection && (
        <Editor
          className="border-2 border-slate-950 rounded-md"
          height="50vh"
          value={enhancedText ? enhancedText : currentSelection}
          options={{
            automaticLayout: true,
            language: "plaintext",
            theme: "vs-dark",
            minimap: { enabled: false },
            contextmenu: false,
            lineNumbers: "off",
            readOnly: true,
          }}
          onMount={(editor) => setEditor(editor)}
        />
      )}
      {enhancedText && (
        <Button variant="dark" size="md" onClick={storeEnhancedText}>
          Insert
        </Button>
      )}
    </div>
  );
};
