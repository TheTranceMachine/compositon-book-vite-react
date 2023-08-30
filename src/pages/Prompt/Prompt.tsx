import { useRef, useState, useEffect, useCallback } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import Button from "react-bootstrap/Button";
import { FunctionArrayType } from "../../../types/types";
import {
  editorStore,
  storeEnhancedSelection,
} from "../../reducers/editorReducer";
import { useToast } from "../../hooks/useToast";
import { promptAction } from "../../actions/chatGptActions";
import { PromptDropdown } from "../../components/PromptDropdown/PromptDropdown";
import "./Prompt.scss";

export const Prompt = () => {
  const navigate = useNavigate();
  const [editor, setEditor] = useState();
  const [originalModel, setOriginalModel] = useState();
  const [modifiedModel, setModifiedModel] = useState();
  const [diffEditor, setDiffEditor] = useState();
  const editorState = editorStore.getState();
  const { currentSelection } = editorState;

  const [lockView]: FunctionArrayType = useOutletContext();
  const [enhancedText, setEnhancedText] = useState();
  const monacoEl = useRef();
  const toast = useToast();

  const editorConfig = useCallback(
    () => ({
      value: enhancedText ? enhancedText : currentSelection,
      automaticLayout: true,
      language: "plaintext",
      theme: "vs-dark",
      minimap: { enabled: false },
      contextmenu: true,
      lineNumbers: "off",
      readOnly: true,
    }),
    [currentSelection],
  );

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        return editor
          ? editor
          : monaco.editor.create(monacoEl.current, editorConfig);
      });
    }

    return () => editor?.dispose();
  }, [editor, monacoEl]);

  useEffect(() => {
    if (enhancedText) {
      editor.dispose();

      setOriginalModel(
        monaco.editor.createModel(currentSelection, "text/plain"),
      );
      setModifiedModel(monaco.editor.createModel(enhancedText, "text/plain"));

      setDiffEditor(
        monaco.editor.createDiffEditor(monacoEl.current, editorConfig),
      );
    }
  }, [editor, enhancedText]);

  useEffect(() => {
    if (diffEditor) {
      diffEditor.updateOptions({
        contextmenu: false,
        renderSideBySide: false,
        enableSplitViewResizing: false,
        originalEditable: false,
      });

      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel,
      });
    }
  }, [modifiedModel, originalModel, diffEditor]);

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
      }),
    );
    navigate("/");
  };

  return (
    <div className="d-flex flex-column gap-2 container-fluid prompt">
      <PromptDropdown onChange={(selection: Object) => sendPrompt(selection)} />
      <div className="prompt__editor" ref={monacoEl}></div>
      {enhancedText && (
        <Button variant="dark" size="md" onClick={storeEnhancedText}>
          Insert
        </Button>
      )}
    </div>
  );
};
