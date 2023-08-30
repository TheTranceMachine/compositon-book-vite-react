import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomNavbar } from "../../components/Navbar/CustomNavbar";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import { NewProjectComponent } from "../../components/NewProject/NewProjectComponent";
import { projectsList } from "./list";
import "./Projects.scss";

const Projects = () => {
  const [showNewProjectComponent, setShowNewProjectComponent] = useState(false);
  const navigate = useNavigate();

  const chooseProject = (name: string) => {
    if (name === "") {
      setShowNewProjectComponent(true);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="projects">
        <div className="projects__list">
          {showNewProjectComponent ? (
            <NewProjectComponent />
          ) : (
            projectsList.map(({ placeholder, name, buttonText }) => (
              <CustomCard
                key={name}
                placeholder={placeholder}
                name={name}
                buttonText={buttonText}
                onClick={(name: string) => chooseProject(name)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export { Projects };
