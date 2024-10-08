import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAtomState } from "@zedux/react";
import { CustomSpinner } from "../../components/Spinner/CustomSpinner";
import { db } from "../../../config/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { projectStoreAtom } from "../../reducers/projectStore";
import {
  Project,
  ModalInitialPropsTypes,
  ProjectsCollectionSnapshotTypes,
  ProjectStoreTypes,
} from "../../../types/types";
import CustomCard from "../../components/CustomCard/CustomCard";
import "./Projects.scss";

const DeletionConfirmationModal = lazy(() => import("../../components/Modal/DeletionConfirmationModal"));

const Projects = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const modalInitialProps: ModalInitialPropsTypes = { show: false, projectId: null, projectName: "" };

  const [projectState, setProjectState] = useAtomState(projectStoreAtom);
  const [loading, setLoading] = useState(true);
  const [projectModal, setProjectModal] = useState(modalInitialProps);
  const { projects } = projectState;

  const fetchProjects = async () => {
    const snapshots = await getDocs(collection(db, `users/${uid}/projects/`));
    setLoading(false);

    const projects: Array<object> = [];
    snapshots.forEach((project: ProjectsCollectionSnapshotTypes) => {
      let projectCreationTimestamp = "";
      if (project._document) {
        const timestamp = project._document.createTime.timestamp.seconds;
        const date = new Date(timestamp * 1000);
        projectCreationTimestamp = date.toLocaleString("en-US", {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      }

      const projectId = project.id;
      const projectName = project.data().projectName;
      const projectDescription = project.data().projectDescription;

      projects.push({ projectId, projectCreationTimestamp, projectName, projectDescription });
    });
    setProjectState({ ...projectState, projects });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const chooseProject = (project: Project) => {
    setProjectState({ ...projectState, selectedProject: { ...project } });
    navigate("/");
  };

  const deleteProject = async () => {
    try {
      setLoading(true);

      await deleteDoc(doc(db, `users/${uid}/projects/${projectModal.projectId}`));
      setProjectModal(modalInitialProps);

      const updatedProjects = projects.filter((project: Project) => project.projectId !== projectModal.projectId);
      setProjectState({ ...projectState, projects: updatedProjects });

      setLoading(false);

      toast.success(`Project ${projectModal.projectName} was deleted`);
    } catch (e) {
      toast.error(`Something went wrong while deleting project ${projectModal.projectName}. Please try again.`);
    }
  };

  return (
    <div className="projects flex items-center">
      {loading && <CustomSpinner height="100px" width="100px" />}
      {!loading && (
        <>
          <div className="flex flex-wrap gap-2 m-auto lg:w-[43rem] md:w-[31rem] projects__list">
            <CustomCard
              key="New Project"
              title="New Project"
              description="Start a new Writing Project"
              buttonText="New Project"
              onEdit={() => navigate("/projects/new")}
              backgroundColor="light"
              textColor="dark"
              className={projects.length > 0 ? "" : "w-100"}
            />
            {projects.length
              ? projects.map(({ projectId, projectCreationTimestamp, projectName, projectDescription }: Project) => (
                <CustomCard
                  key={projectId}
                  title={projectName}
                  description={projectDescription}
                  timeStamp={projectCreationTimestamp}
                  buttonText="Go to project"
                  onEdit={() =>
                    chooseProject({ projectId, projectCreationTimestamp, projectName, projectDescription })
                  }
                  backgroundColor="light"
                  textColor="dark"
                  onDelete={() => setProjectModal({ show: true, projectId, projectName })}
                />
              ))
              : null}
          </div>
          <Suspense>
            <DeletionConfirmationModal
              show={projectModal.show}
              setShow={() => setProjectModal(modalInitialProps)}
              onDelete={deleteProject}
              item={projectModal.projectName}
              type="project"
            />
          </Suspense>
        </>
      )}
    </div>
  );
};

export { Projects };
