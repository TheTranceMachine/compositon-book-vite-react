import { useState } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import { Outlet } from 'react-router-dom';
import { projectStore } from '../../reducers/projectReducer.js';
import { Editor } from '../../components/Editor/Editor.jsx';
import './Workspace.scss';

const initialSizes = [200, 'auto', 2];

const Workspace = () => {
  const [sizes, setSizes] = useState(initialSizes);
  const [allowResize, setAllowResize] = useState(false);
  const projectState = projectStore.getState();
  const {
    selectedProject: { projectName },
  } = projectState;

  const lockView = () => {
    setSizes(initialSizes);
    setAllowResize(false);
  };

  const unlockView = () => {
    setSizes([200, 'auto', 600]);
    setAllowResize(true);
  };

  return (
    <div className="w-full h-full">
      <SplitPane
        allowResize={allowResize}
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        sashRender={(index, active) => (
          <SashContent className={`sash-wrap-line ${active ? 'active' : 'inactive'}`}>
            <span className="line" />
          </SashContent>
        )}
      >
        <Pane minSize={200} maxSize={600}>
          <h4>{projectName}</h4>
        </Pane>
        <Pane minSize={50} className='flex justify-center items-center bg-[#ccc] h-full'>
          <Editor resizePanel={unlockView} />
        </Pane>
        <Pane minSize={50} maxSize={600} className='flex flex-col flex-wrap justify-start items-center gap-y-3 h-full bg-[rgb(238, 238, 238)]'>
          <Outlet context={[lockView]} />
        </Pane>
      </SplitPane>
    </div>
  );
};

export { Workspace };
