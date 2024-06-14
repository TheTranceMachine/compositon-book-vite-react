import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { renderToString } from "react-dom/server";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { BsFileEarmarkPersonFill, BsImageFill } from "react-icons/bs";
import { useToast } from "../../hooks/useToast";
import editorActions from "./editor-actions";
import {
  MonacoEditorTypes,
  CharacterTypes,
  NewCharacterDecorationsTypes,
  NewStorySettingDecorationsTypes,
  PopupContentTypes,
  showPopupTypes,
  StorySettingTypes,
} from "../../../types/types";
import "./Editor.scss";

const PopupContent = ({ title, description, type }: PopupContentTypes) => (
  <div className="bg-amber-300 rounded-md border-1 border-amber-400 shadow-md shadow-slate-400 mt-3 w-52">
    <div className="p-2 border-b border-amber-400 flex gap-2 items-center">
      {type === "character" ? <BsFileEarmarkPersonFill /> : <BsImageFill />}
      <div className="font-medium truncate">{title}</div>
    </div>
    <div className="p-2 border-t border-t-amber-200">
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  </div>
);

const MonacoEditor = ({
  resizePanel,
  changeEditorCurrentSelection,
  editorEnhancedSelection,
  editorSelectionRange,
  characters,
  storySettings,
  newCharacter,
  newSetting,
  openCharactersPane,
  openStorySettingsPane,
}: MonacoEditorTypes) => {
  const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor | undefined>(undefined);
  const [decorations, setDecorations] = useState<monaco.editor.IEditorDecorationsCollection[]>([]);

  const currentWidgetIdRef = useRef<string>("");

  const navigate = useNavigate();
  const toast = useToast();

  const createPopupContent = (title: string, description: string, type: string) => {
    const domNode = document.createElement("div");
    domNode.innerHTML = renderToString(<PopupContent title={title} description={description} type={type} />);
    return domNode;
  };

  const showPopup = ({ position, title, description, type }: showPopupTypes) => {
    hidePopup(); // Ensure any existing popup is removed before showing a new one

    const contentWidget = {
      domNode: createPopupContent(title, description, type),
      getId: () => `my.widget.${title}`,
      getDomNode: function () {
        return this.domNode;
      },
      getPosition: function () {
        return {
          position: position,
          preference: [monaco.editor.ContentWidgetPositionPreference.BELOW],
        };
      },
    };

    currentWidgetIdRef.current = contentWidget.getId();
    editorInstance?.addContentWidget(contentWidget);
  };

  const hidePopup = () => {
    if (currentWidgetIdRef.current) {
      const contentWidget: monaco.editor.IContentWidget = {
        getId: () => currentWidgetIdRef.current,
        getDomNode: () => document.createElement("div"),
        getPosition: () => null,
      };
      editorInstance?.removeContentWidget(contentWidget);
      currentWidgetIdRef.current = "";
    }
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorActions.forEach((action) => {
      editor.addAction({
        id: action.id,
        label: action.label,
        keybindings: action.keybindings,
        contextMenuGroupId: action.contextMenuGroupId,
        contextMenuOrder: action.contextMenuOrder,
        run: () => {
          const range = editor.getSelection();
          const model = editor.getModel();
          const currentSelection = range ? model?.getValueInRange(range) : null;
          switch (action.id) {
            case "create-new-character":
              newCharacter(currentSelection ?? "");
              break;
            case "create-new-setting":
              newSetting(currentSelection ?? "");
              break;
            case "ai-enhance":
              if (currentSelection) {
                changeEditorCurrentSelection({ range, currentSelection });
                resizePanel();
                navigate("enhance");
              } else {
                alert('Please select text to enhance and then click "Enhance with AI"');
              }
              break;
            case "view-characters":
              openCharactersPane();
              break;
            case "view-settings":
              openStorySettingsPane();
              break;
            default:
              break;
          }
        },
      });
    });

    setEditorInstance(editor);
  };

  useEffect(() => {
    if (!editorInstance) return;
    editorInstance.onMouseMove((event) => {
      if (!characters.length && !storySettings.length) return;
      const position = event.target.position;
      if (!position) {
        hidePopup();
        return;
      }
      const model = editorInstance.getModel();
      const word = model?.getWordAtPosition(position);
      // check if there's a character with name equal to the word
      if (word) {
        const character = characters.find(({ name }: CharacterTypes) => name === word.word);
        const storySetting = storySettings.find(({ title }: { title: string }) => title === word.word);
        // TODO: What if a character and a story setting have the same name?
        if (character || storySetting) {
          showPopup({
            position,
            title: word.word,
            description: character ? character.description : storySetting.description,
            type: character ? "character" : "story setting",
          });
        } else {
          hidePopup();
        }
      } else {
        hidePopup();
      }
    });
  }, [editorInstance, characters, storySettings]);

  // Decorate the editor with character and story setting names
  useEffect(() => {
    if (!editorInstance) return;
    const model = editorInstance.getModel();
    const newCharacterDecorations: NewCharacterDecorationsTypes = [];

    characters.forEach(({ name }: CharacterTypes) => {
      const matches = model?.findMatches(name, true, true, false, null, true);
      matches?.forEach((match) => {
        newCharacterDecorations.push({
          range: match.range,
          options: {
            inlineClassName: "character-decoration",
          },
        });
      });
    });

    setDecorations((currentDecorations) => {
      const newDecorations = editorInstance?.createDecorationsCollection(newCharacterDecorations);
      return newDecorations ? [newDecorations] : currentDecorations;
    });
  }, [editorInstance, characters]);

  // Decorate the editor with character and story setting names
  // TODO: fix bug when character name is the same as story setting name
  useEffect(() => {
    if (!editorInstance) return;
    const model = editorInstance.getModel();
    const newStorySettingDecorations: NewStorySettingDecorationsTypes = [];

    storySettings.forEach(({ title }: StorySettingTypes) => {
      const matches = model?.findMatches(title, true, true, false, null, true);
      matches?.forEach((match) => {
        newStorySettingDecorations.push({
          range: match.range,
          options: {
            inlineClassName: "story-setting-decoration",
          },
        });
      });
    });

    setDecorations((currentDecorations) => {
      const newDecorations = editorInstance.createDecorationsCollection(newStorySettingDecorations);
      return newDecorations ? [newDecorations] : currentDecorations;
    });
  }, [editorInstance, storySettings]);

  // TODO: test if this works - it's about enhancing the text when changes appear
  useEffect(() => {
    if (editorEnhancedSelection !== "") {
      const options = {
        range: editorSelectionRange,
        text: editorEnhancedSelection,
      };
      editorInstance?.executeEdits("enhance-text", [options]);
      toast.success("Your text was enhanced!");
    }
  }, [editorInstance, editorEnhancedSelection, editorSelectionRange]);

  return (
    <div className="shadow-lg shadow-slate-200 h-full">
      <Editor
        className="editor border"
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
    </div>
  );
};

export default MonacoEditor;
