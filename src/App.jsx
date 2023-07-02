import { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';

import OffcanvasExample from './OffCanvas';
import './App.css'

import { Editor } from './Editor';

function style (color) {
  return {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color
  };
}

function App () {
  const [sizes, setSizes] = useState([50, 'auto', 50]);

  return (
    <div className="app">
      <OffcanvasExample />
      <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize={50} maxSize='50%'>
          <div style={style('#ddd')}>
            pane1
          </div>
        </Pane>
        <Pane minSize={50} style={style('#ccc')}>
          <Editor />
        </Pane>
        <Pane minSize={50} style={style('#eee')}>
          pane3
        </Pane>
      </SplitPane>
    </div>
  );
}

export default App
