import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { projectStore, storeSelectedProject, storeAllProjects } from "../../reducers/projectReducer.js";
import {
  Project,
  ModalInitialPropsTypes,
  ProjectsCollectionSnapshotTypes,
  ProjectStoreTypes,
} from "../../../types/types";
import { ProjectDeletionModal } from "../../components/Modal/ProjectDeletionModal";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import "./Projects.scss";

const Projects = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const modalInitialProps: ModalInitialPropsTypes = { show: false, projectId: null, projectName: "" };

  const [projectModal, setProjectModal] = useState(modalInitialProps);
  const [projects, setProjects] = useState<Array<Project>>([]);

  const fetchProjects = async () => {
    const snapshots = await getDocs(collection(db, `users/${uid}/projects/`));

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
    projectStore.dispatch(storeAllProjects(projects));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const subscription = projectStore.subscribe((state: ProjectStoreTypes) => {
      setProjects(state.projects);
    });
    return () => subscription.unsubscribe();
  });

  const chooseProject = (props: Project) => {
    projectStore.dispatch(storeSelectedProject({ ...props }));
    navigate("/");
  };

  const deleteProject = async () => {
    try {
      await deleteDoc(doc(db, `users/${uid}/projects/${projectModal.projectId}`));
      setProjectModal(modalInitialProps);
      fetchProjects();
      toast.success(`Project ${projectModal.projectName} was deleted`);
    } catch (e) {
      toast.error(`Something went wrong while deleting project ${projectModal.projectName}. Please try again.`);
    }
  };

  return (
    <div className="projects flex items-center">
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
                onEdit={() => chooseProject({ projectId, projectCreationTimestamp, projectName, projectDescription })}
                backgroundColor="light"
                textColor="dark"
                onDelete={() => setProjectModal({ show: true, projectId, projectName })}
              />
            ))
          : null}
      </div>
      <ProjectDeletionModal
        show={projectModal.show}
        setShow={() => setProjectModal(modalInitialProps)}
        onDelete={deleteProject}
        onCancel={() => setProjectModal(modalInitialProps)}
        projectName={projectModal.projectName}
      />
    </div>
  );
};

export { Projects };
