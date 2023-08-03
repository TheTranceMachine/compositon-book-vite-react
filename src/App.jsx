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

const App = () => {
  const [sizes, setSizes] = useState([200, "auto", 50]);
  const [context, setContext] = useState({});

  const editorAction = (currentSelection) => {
    setSizes([200, "auto", 600]);
    setContext({ currentSelection });
  };

  return (
    <div className="app">
      <CustomNavbar />
      <SplitPane
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
        <Pane minSize={200} maxSize="50%">
          <div style={style("#ddd")}>
            <Link to={`enhance`}>Prompt</Link>
          </div>
        </Pane>
        <Pane minSize={50} style={style("#ccc")}>
          <Editor
            setContext={(currentSelection) => editorAction(currentSelection)}
          />
        </Pane>
        <Pane minSize={50} style={outletStyle()}>
          <Outlet context={[context, setContext]} />
        </Pane>
      </SplitPane>
    </div>
  );
};

export default App;
