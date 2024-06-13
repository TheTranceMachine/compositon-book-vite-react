import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { renderToString } from "react-dom/server";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useAtomState } from "@zedux/react";
import { BsFileEarmarkPersonFill, BsImageFill } from "react-icons/bs";
import { editorStore, storeCurrentSelection } from "../../reducers/editorReducer";
import { projectStoreAtom } from "../../reducers/projectStore";
import { useToast } from "../../hooks/useToast";
import { MonacoEditorTypes, PopupContentTypes, showPopupTypes } from "../../../types/types";
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

// TODO: Use these actions in the editor
const editorActions = [
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

const MonacoEditor = ({
  resizePanel,
  newCharacter,
  newSetting,
  openCharactersPane,
  openStorySettingsPane,
}: MonacoEditorTypes) => {
  const [projectState, setProjectState] = useAtomState(projectStoreAtom);
  const [decorations, setDecorations] = useState<monaco.editor.IModelDeltaDecoration[]>([]);
  const { characters, storySettings } = projectState;

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
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
    editorRef.current?.addContentWidget(contentWidget);
  };

  const hidePopup = () => {
    if (currentWidgetIdRef.current) {
      const contentWidget: monaco.editor.IContentWidget = {
        getId: () => currentWidgetIdRef.current,
        getDomNode: () => null,
        getPosition: () => null,
      };
      editorRef.current?.removeContentWidget(contentWidget);
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
          const currentSelection = editor.getModel().getValueInRange(editor.getSelection());
          switch (action.id) {
            case "create-new-character":
              newCharacter(currentSelection);
              break;
            case "create-new-setting":
              newSetting(currentSelection);
              break;
            case "ai-enhance":
              if (currentSelection) {
                editorStore.dispatch(storeCurrentSelection({ range, currentSelection }));
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

    editorRef.current = editor;
  };

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.onMouseMove((event) => {
      if (!characters.length && !storySettings.length) return;
      const position = event.target.position;
      if (!position) {
        hidePopup();
        return;
      }
      const word = editorRef.current.getModel().getWordAtPosition(position);
      // check if there's a character with name equal to the word
      if (word) {
        const character = characters.find(({ name }) => name === word.word);
        const storySetting = storySettings.find(({ title }) => title === word.word);
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
  }, [editorRef.current, characters, storySettings]);

  // Decorate the editor with character and story setting names
  useEffect(() => {
    if (!editorRef.current) return;
    const model = editorRef.current.getModel();
    const newCharacterDecorations = [];

    characters.forEach(({ name }) => {
      const matches = model.findMatches(name, true, true, false, null, true);
      matches.forEach((match) => {
        newCharacterDecorations.push({
          range: match.range,
          options: {
            inlineClassName: "character-decoration",
          },
        });
      });
    });

    setDecorations((currentDecorations) =>
      editorRef.current.deltaDecorations(currentDecorations, newCharacterDecorations)
    );
  }, [editorRef.current, characters]);

  // Decorate the editor with character and story setting names
  // TODO: fix bug when character name is the same as story setting name
  useEffect(() => {
    if (!editorRef.current) return;
    const model = editorRef.current.getModel();
    const newStorySettingDecorations = [];

    storySettings.forEach(({ title }) => {
      const matches = model.findMatches(title, true, true, false, null, true);
      matches.forEach((match) => {
        newStorySettingDecorations.push({
          range: match.range,
          options: {
            inlineClassName: "story-setting-decoration",
          },
        });
      });
    });

    setDecorations((currentDecorations) =>
      editorRef.current.deltaDecorations(currentDecorations, newStorySettingDecorations)
    );
  }, [editorRef.current, storySettings]);

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
