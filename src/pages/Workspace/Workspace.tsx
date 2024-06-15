import { Suspense, lazy, useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { useMediaQuery } from "usehooks-ts";
import { useAtomState } from "@zedux/react";
import { projectStoreAtom } from "../../reducers/projectStore";
import { editorStoreAtom } from "../../reducers/editorStore";
import MonacoEditor from "../../components/Editor/Editor.jsx";
import Characters from "../../components/Characters/Characters.jsx";
import StorySettings from "../../components/StorySettings/StorySettings.jsx";
import "./Workspace.scss";
import {
  CharacterTypes,
  StorySettingTypes,
  DeletionItemType,
  MonacoEditorCurrentSelectionTypes,
} from "../../../types/types.js";
import { useToast } from "../../hooks/useToast";
import { Prompt } from "../Prompt/Prompt";

const NewCharacterModal = lazy(() => import("../../components/Modal/NewCharacterModal"));
const NewStorySettingModal = lazy(() => import("../../components/Modal/NewStorySettingModal"));
const DeletionConfirmationModal = lazy(() => import("../../components/Modal/DeletionConfirmationModal"));

const initialSizes = [150, 50, 50, "auto", 2];

const Workspace = () => {
  // TODO: Think where to use separate atoms for characters and story settings
  const [projectStore, setProjectStore] = useAtomState(projectStoreAtom);
  const { characters, storySettings } = projectStore;

  const [editorStore, setEditorStore] = useAtomState(editorStoreAtom);
  const { editorSelectionRange, editorCurrentSelection, editorEnhancedSelection } = editorStore;

  const [sizes, setSizes] = useState(initialSizes);
  const [allowResize, setAllowResize] = useState(true);
  const [newCharacterName, setNewCharacterName] = useState("");
  const [newStorySettingTitle, setNewStorySettingTitle] = useState("");
  const [newCharacterModal, setNewCharacterModal] = useState(false);
  const [newStorySettingModal, setNewStorySettingModal] = useState(false);
  const [deletionConfirmationModal, setDeletionConfirmationModal] = useState(false);
  const [deletionItem, setDeletionItem] = useState({
    id: 0,
    title: "",
    type: "",
  });

  const {
    selectedProject: { projectName },
  } = projectStore;
  const toast = useToast();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const lockView = () => {
    setSizes(initialSizes);
    setAllowResize(false);
  };

  const closePane = () => {
    setSizes(initialSizes);
  };

  const unlockView = () => {
    setSizes([150, 2, 2, "auto", 400]);
    setAllowResize(true);
  };

  const handleEditorCurrentSelection = ({ range, currentSelection }: MonacoEditorCurrentSelectionTypes) => {
    setEditorStore({
      ...editorStore,
      editorSelectionRange: range,
      editorCurrentSelection: currentSelection,
      editorEnhancedSelection: "",
    });
  };

  const handleEditorEnhancedSelection = (enhancedText: string) => {
    setEditorStore({
      ...editorStore,
      editorEnhancedSelection: enhancedText,
    });
  };

  const handleNewCharacter = (name: string) => {
    setNewCharacterName(name);
    setNewCharacterModal(true);
  };

  const handleNewSetting = (title: string) => {
    setNewStorySettingTitle(title);
    setNewStorySettingModal(true);
  };

  const handleNewCharacterSave = (character: CharacterTypes) => {
    const id = Math.random().toString(16).slice(2);
    setProjectStore({
      ...projectStore,
      characters: [...projectStore.characters, { ...character, id }],
      selectedCharacter: { ...character, id },
    });
    setNewCharacterModal(false);
    toast.success("New character created successfully");
  };

  const handleNewStorySettingSave = (storySetting: StorySettingTypes) => {
    const id = Math.random().toString(16).slice(2);
    setProjectStore({
      ...projectStore,
      storySettings: [...projectStore.storySettings, { ...storySetting, id }],
      selectedStorySetting: { ...storySetting, id },
    });
    setNewStorySettingModal(false);
    toast.success("New story setting created successfully");
  };

  const handleDeletionRequest = (deletionItem: DeletionItemType) => {
    setDeletionItem(deletionItem);
    setDeletionConfirmationModal(true);
  };

  const handleDeleteItem = (id: number, type: string) => {
    if (type === "story setting") {
      setProjectStore({
        ...projectStore,
        storySettings: projectStore.storySettings.filter((setting) => setting.id !== id),
        selectedStorySetting: {},
      });
    } else {
      setProjectStore({
        ...projectStore,
        characters: projectStore.characters.filter((character) => character.id !== id),
        selectedCharacter: {},
      });
    }
    setDeletionConfirmationModal(false);
    toast.success(`${type} deleted successfully`);
  };

  return (
    <div className="w-full h-full">
      <SplitPane
        allowResize={allowResize}
        split={isMobile ? "horizontal" : "vertical"}
        sizes={sizes}
        onChange={setSizes}
        sashRender={(index, active) => (
          <SashContent className={`sash-wrap-line ${active ? "active" : "inactive"}`}>
            {[<span className="bg-red-600 h-100 w-[1px]" />]}
          </SashContent>
        )}
      >
        <Pane minSize={50} maxSize={150} className="flex p-2 bg-neutral-50 h-full">
          <div className="font-medium truncate ">{projectName}</div>
        </Pane>
        <Pane minSize={50} maxSize={400} className="bg-neutral-50 h-full">
          <Characters
            characters={characters}
            toggleCharactersPane={(val) =>
              val ? setSizes([50, 400, 50, "auto", 2]) : setSizes([150, 50, 50, "auto", 2])
            }
            paneFullView={sizes.at(1) === 400}
            deleteCharacter={(id: number, name: string) =>
              handleDeletionRequest({ id, title: name, type: "character" })
            }
          />
        </Pane>
        <Pane minSize={50} maxSize={400} className="h-full bg-neutral-50">
          <StorySettings
            storySettings={storySettings}
            toggleStorySettingsPane={(val) =>
              val ? setSizes([50, 50, 400, "auto", 2]) : setSizes([150, 50, 50, "auto", 2])
            }
            paneFullView={sizes.at(2) === 400}
            deleteStorySetting={(id: number, title: string) =>
              handleDeletionRequest({ id, title, type: "story setting" })
            }
          />
        </Pane>
        <Pane minSize={50} className="px-32 pt-3">
          <MonacoEditor
            resizePanel={unlockView}
            changeEditorCurrentSelection={(val) => handleEditorCurrentSelection(val)}
            editorEnhancedSelection={editorEnhancedSelection}
            editorSelectionRange={editorSelectionRange}
            characters={characters}
            storySettings={storySettings}
            newCharacter={(val: string) => handleNewCharacter(val)}
            newSetting={(val: string) => handleNewSetting(val)}
            openCharactersPane={() => setSizes([50, 400, 2, "auto", 2])}
            openStorySettingsPane={() => setSizes([50, 2, 400, "auto", 2])}
          />
        </Pane>
        <Pane
          minSize={50}
          maxSize={400}
          className="flex flex-col flex-wrap justify-start items-center gap-y-3 h-full bg-[rgb(238, 238, 238)]"
        >
          <Prompt
            lockView={lockView}
            closePane={closePane}
            editorCurrentSelection={editorCurrentSelection}
            changeEditorEnhancedSelection={(val) => handleEditorEnhancedSelection(val)}
          />
        </Pane>
      </SplitPane>
      <Suspense>
        <NewCharacterModal
          show={newCharacterModal}
          setShow={() => setNewCharacterModal(false)}
          onSave={(val) => handleNewCharacterSave(val)}
          newCharacterName={newCharacterName}
        />
      </Suspense>
      <Suspense>
        <NewStorySettingModal
          show={newStorySettingModal}
          setShow={() => setNewStorySettingModal(false)}
          onSave={(storySetting: StorySettingTypes) => handleNewStorySettingSave(storySetting)}
          newSettingTitle={newStorySettingTitle}
        />
      </Suspense>
      <Suspense>
        <DeletionConfirmationModal
          show={deletionConfirmationModal}
          setShow={() => setDeletionConfirmationModal(false)}
          onDelete={() => handleDeleteItem(deletionItem.id, deletionItem.type)}
          item={deletionItem.title}
          type={deletionItem.type}
        />
      </Suspense>
    </div>
  );
};

export { Workspace };
