import { useState } from 'react';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import { Outlet } from 'react-router-dom';
import { projectStore } from '../../reducers/projectReducer.js';
import { Editor } from '../../components/Editor/Editor.jsx';
import './Workspace.scss';

const style = (color: string) => {
  return {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color,
  };
};

const outletStyle = () => ({
  height: '100%',
  display: 'flex',
  alignItems: 'stretch',
  backgroundColor: 'rgb(238, 238, 238)',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  justifyContent: 'flex-start',
  rowGap: '20px',
});

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
    <div className="workspace">
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
        <Pane minSize={50} style={style('#ccc')}>
          <Editor resizePanel={unlockView} />
        </Pane>
        <Pane minSize={50} maxSize={600} style={outletStyle()}>
          <Outlet context={[lockView]} />
        </Pane>
      </SplitPane>
    </div>
  );
};

export { Workspace };
