import { useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "react-bootstrap/Button";
import { PromptTypes } from "../../../types/types";
import { useToast } from "../../hooks/useToast";
import { promptAction } from "../../actions/chatGptActions";
import { PromptDropdown } from "../../components/PromptDropdown/PromptDropdown";
import { IoCloseCircleSharp } from "react-icons/io5";

export const Prompt = ({ lockView, closePane, editorCurrentSelection, changeEditorEnhancedSelection }: PromptTypes) => {
  const [enhancedText, setEnhancedText] = useState<string>("");
  const toast = useToast();

  const sendPrompt = async (selection: Object) => {
    // TODO: check what happens when backend returns error instead of text
    const { text, error } = await promptAction({ selection, editorCurrentSelection });
    if (text) {
      setEnhancedText(text);
      toast.success("ChatGPT responded with a new proposition");
    }
    if (error) toast.error(error);
  };

  const storeEnhancedText = () => {
    lockView();
    changeEditorEnhancedSelection(enhancedText);
  };

  return (
    <div className="flex flex-col gap-2 p-3 w-full bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="font-medium truncate">Enhance text with AI</div>
        <IoCloseCircleSharp onClick={() => closePane()} className="cursor-pointer" />
      </div>
      <PromptDropdown onChange={(selection: Object) => sendPrompt(selection)} />
      {editorCurrentSelection && (
        <div className="shadow-md shadow-slate-300 border-1 border-slate-300 border-t-slate-200 h-full rounded-md">
          <Editor
            className="border-2 border-white rounded-md"
            height="50vh"
            value={enhancedText ? enhancedText : editorCurrentSelection}
            options={{
              automaticLayout: true,
              language: "plaintext",
              theme: "light",
              minimap: { enabled: false },
              contextmenu: false,
              lineNumbers: "off",
              readOnly: true,
            }}
          />
        </div>
      )}
      {enhancedText && (
        <Button variant="dark" size="lg" onClick={storeEnhancedText}>
          Insert
        </Button>
      )}
    </div>
  );
};
