import { Suspense, lazy, useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { projectStore } from "../../reducers/projectReducer.js";
import { storeSelectedCharacter, characterStore, storeCharacters } from "../../reducers/characterReducer.js";
import MonacoEditor from "../../components/Editor/Editor.jsx";
import Characters from "../../components/Characters/Characters.jsx";
import "./Workspace.scss";
import { NewCharacter } from "../../../types/types.js";
import { useToast } from "../../hooks/useToast";

const NewCharacterModal = lazy(() => import("../../components/Modal/NewCharacterModal"));

const initialSizes = [200, 2, "auto", 2];

const Workspace = () => {
  const [sizes, setSizes] = useState(initialSizes);
  const [allowResize, setAllowResize] = useState(false);
  const [newCharacterName, seNewCharacterName] = useState("");
  const [newCharacterModal, setNewCharacterModal] = useState(false);
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

  const unlockView = () => {
    setSizes([200, 2, "auto", 600]);
    setAllowResize(true);
  };

  const handleNewCharacter = (val) => {
    seNewCharacterName(val);
    setNewCharacterModal(true);
  };

  const handleNewCharacterSave = (character: NewCharacter) => {
    const id = Math.random().toString(16).slice(2);
    characterStore.dispatch(storeSelectedCharacter({ selectedCharacter: { ...character, id } }));
    characterStore.dispatch(storeCharacters({ character: { ...character, id } }));
    setNewCharacterModal(false);
    toast.success("New character created successfully");
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
          <Characters closeCharactersPane={() => setSizes([200, 2, "auto", 2])} />
        </Pane>
        <Pane minSize={50} className="px-32 py-3 bg-white">
          <div className="shadow-md shadow-slate-300 border-1 border-slate-300 border-t-slate-200 h-full">
            <MonacoEditor
              resizePanel={unlockView}
              newCharacter={(val: NewCharacter) => handleNewCharacter(val)}
              openCharactersPane={() => setSizes([50, 600, "auto", 2])}
            />
          </div>
        </Pane>
        <Pane
          minSize={50}
          maxSize={600}
          className="flex flex-col flex-wrap justify-start items-center gap-y-3 h-full bg-[rgb(238, 238, 238)]"
        >
          <Outlet context={[lockView]} />
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
    </div>
  );
};

export { Workspace };
