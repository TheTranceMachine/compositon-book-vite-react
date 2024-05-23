import { useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { projectStore } from "../../reducers/projectReducer.js";
import MonacoEditor from "../../components/Editor/Editor.jsx";
import NewCharacter from "../../components/Characters/NewCharacter.jsx";
import "./Workspace.scss";

const initialSizes = [200, 2, "auto", 2];

const Workspace = () => {
  const [sizes, setSizes] = useState(initialSizes);
  const [allowResize, setAllowResize] = useState(false);
  const projectState = projectStore.getState();
  const {
    selectedProject: { projectName },
  } = projectState;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const lockView = () => {
    setSizes(initialSizes);
    setAllowResize(false);
  };

  const unlockView = () => {
    setSizes([200, 2, "auto", 600]);
    setAllowResize(true);
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
            <span className="line" />
          </SashContent>
        )}
      >
        <Pane minSize={50} maxSize={600}>
          <div className="flex p-2">
            <div className="font-medium truncate">{projectName}</div>
          </div>
        </Pane>
        <Pane minSize={50} maxSize={600}>
          <NewCharacter closeCharactersPane={() => setSizes([200, 2, "auto", 2])} />
        </Pane>
        <Pane minSize={50} className="px-32 py-3 bg-white">
          <div className="shadow-md shadow-slate-300 border-1 border-slate-300 border-t-slate-200 h-full">
            <MonacoEditor resizePanel={unlockView} openCharactersPane={() => setSizes([200, 600, "auto", 2])} />
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
    </div>
  );
};

export { Workspace };
