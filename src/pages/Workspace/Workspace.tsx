import { Suspense, lazy, useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { projectStore } from "../../reducers/projectReducer.js";
import {
  storeSelectedCharacter,
  characterStore,
  storeCharacters,
  deleteCharacter,
} from "../../reducers/characterReducer.js";
import {
  storeSelectedStorySetting,
  storySettingsStore,
  storeStorySettings,
  deleteStorySetting,
} from "../../reducers/storySettingReducer.js";
import MonacoEditor from "../../components/Editor/Editor.jsx";
import Characters from "../../components/Characters/Characters.jsx";
import StorySettings from "../../components/StorySettings/StorySettings.jsx";
import "./Workspace.scss";
import { NewCharacter, NewStorySetting, DeletionItemType } from "../../../types/types.js";
import { useToast } from "../../hooks/useToast";

const NewCharacterModal = lazy(() => import("../../components/Modal/NewCharacterModal"));
const NewStorySettingModal = lazy(() => import("../../components/Modal/NewStorySettingModal"));
const DeletionConfirmationModal = lazy(() => import("../../components/Modal/DeletionConfirmationModal"));

const initialSizes = [200, 2, 2, "auto", 2];

const Workspace = () => {
  const [sizes, setSizes] = useState(initialSizes);
  const [allowResize, setAllowResize] = useState(false);
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
  const projectState = projectStore.getState();
  const {
    selectedProject: { projectName },
  } = projectState;
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
    setSizes([200, 2, 2, "auto", 600]);
    setAllowResize(true);
  };

  const handleNewCharacter = (name: string) => {
    setNewCharacterName(name);
    setNewCharacterModal(true);
  };

  const handleNewSetting = (title: string) => {
    setNewStorySettingTitle(title);
    setNewStorySettingModal(true);
  };

  const handleNewCharacterSave = (character: NewCharacter) => {
    const id = Math.random().toString(16).slice(2);
    characterStore.dispatch(storeSelectedCharacter({ selectedCharacter: { ...character, id } }));
    characterStore.dispatch(storeCharacters({ character: { ...character, id } }));
    setNewCharacterModal(false);
    toast.success("New character created successfully");
  };

  const handleNewStorySettingSave = (storySetting: NewStorySetting) => {
    const id = Math.random().toString(16).slice(2);
    storySettingsStore.dispatch(storeSelectedStorySetting({ selectedStorySetting: { ...storySetting, id } }));
    storySettingsStore.dispatch(storeStorySettings({ storySetting: { ...storySetting, id } }));
    setNewStorySettingModal(false);
    toast.success("New story setting created successfully");
  };

  const handleDeletionRequest = (deletionItem: DeletionItemType) => {
    setDeletionItem(deletionItem);
    setDeletionConfirmationModal(true);
  };

  const handleDeleteItem = (id: number, type: string) => {
    if (type === "story setting") {
      storySettingsStore.dispatch(storeSelectedStorySetting({ selectedStorySetting: {} }));
      storySettingsStore.dispatch(deleteStorySetting(id));
    } else {
      characterStore.dispatch(storeSelectedCharacter({ selectedCharacter: {} }));
      characterStore.dispatch(deleteCharacter(id));
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
        <Pane minSize={50} maxSize={600}>
          <div className="flex p-2">
            <div className="font-medium truncate">{projectName}</div>
          </div>
        </Pane>
        <Pane minSize={50} maxSize={600}>
          <Characters
            closeCharactersPane={() => setSizes([200, 2, 2, "auto", 2])}
            deleteCharacter={(id: number, name: string) =>
              handleDeletionRequest({ id, title: name, type: "character" })
            }
          />
        </Pane>
        <Pane minSize={50} maxSize={600}>
          <StorySettings
            closeStorySettingsPane={() => setSizes([200, 2, 2, "auto", 2])}
            deleteStorySetting={(id: number, title: string) =>
              handleDeletionRequest({ id, title, type: "story setting" })
            }
          />
        </Pane>
        <Pane minSize={50} className="px-32 py-3 bg-white">
          <MonacoEditor
            resizePanel={unlockView}
            newCharacter={(val: string) => handleNewCharacter(val)}
            newSetting={(val: string) => handleNewSetting(val)}
            openCharactersPane={() => setSizes([50, 600, 2, "auto", 2])}
            openStorySettingsPane={() => setSizes([50, 2, 600, "auto", 2])}
          />
        </Pane>
        <Pane
          minSize={50}
          maxSize={600}
          className="flex flex-col flex-wrap justify-start items-center gap-y-3 h-full bg-[rgb(238, 238, 238)]"
        >
          <Outlet context={[lockView, closePane]} />
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
          onSave={(storySetting: NewStorySetting) => handleNewStorySettingSave(storySetting)}
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
