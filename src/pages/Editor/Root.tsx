import { useEffect, useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import { Outlet } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { Editor } from "./Editor.jsx";

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

const Root = () => {
  const [sizes, setSizes] = useState(initialSizes);
  const [allowResize, setAllowResize] = useState(false);
  const [project, setProject] = useState<object>();
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const { uid } = currentUser;
      const id = localStorage.getItem("project_id");
      const projects = await getDocs(collection(db, `users/${uid}/projects/`));
      projects.forEach((project) => {
        if (project.id === id) setProject(() => project.data());
      });
    }
    fetchData();
  });

  const lockView = () => {
    setSizes(initialSizes);
    setAllowResize(false);
  };

  const unlockView = () => {
    setSizes([200, "auto", 600]);
    setAllowResize(true);
  };

  return (
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
        <h4>{project && project.projectName}</h4>
      </Pane>
      <Pane minSize={50} style={style("#ccc")}>
        <Editor resizePanel={unlockView} />
      </Pane>
      <Pane minSize={50} maxSize={600} style={outletStyle()}>
        <Outlet context={[lockView]} />
      </Pane>
    </SplitPane>
  );
};

export { Root };
