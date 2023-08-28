import { useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { Outlet, Link } from "react-router-dom";
import { CustomNavbar } from "./components/Navbar/CustomNavbar";
import "./App.scss";

import { Editor } from "./Editor";

const style = (color) => {
  return {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color,
  };
};

const outletStyle = () => ({
  height: "100%",
  display: "flex",
  alignItems: "stretch",
  backgroundColor: "rgb(238, 238, 238)",
  flexDirection: "column",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "flex-start",
  rowGap: "20px",
});

const initialSizes = [200, "auto", 2];

const App = () => {
  const [sizes, setSizes] = useState(initialSizes);
  const [allowResize, setAllowResize] = useState(false);

  const lockView = () => {
    setSizes(initialSizes);
    setAllowResize(false);
  };

  const unlockView = () => {
    setSizes([200, "auto", 600]);
    setAllowResize(true);
  };

  return (
    <div className="app">
      <CustomNavbar />
      <SplitPane
        allowResize={allowResize}
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        sashRender={(index, active) => (
          <SashContent
            className={`sash-wrap-line ${active ? "active" : "inactive"}`}
          >
            <span className="line" />
          </SashContent>
        )}
      >
        <Pane minSize={200} maxSize={600}>
          <div style={style("#ddd")}>
            <Link to={`enhance`}>Prompt</Link>
          </div>
        </Pane>
        <Pane minSize={50} style={style("#ccc")}>
          <Editor resizePanel={unlockView} />
        </Pane>
        <Pane minSize={50} maxSize={600} style={outletStyle()}>
          <Outlet context={[lockView]} />
        </Pane>
      </SplitPane>
    </div>
  );
};

export default App;
