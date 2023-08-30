import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../../types/types";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Form, FormGroup, Button } from "react-bootstrap";
import { ImageGenerator } from "../ImageGenerator/ImageGenerator";

const setProjectInLocalStorage = ({
  projectId,
  projectName,
  projectDescription,
}: Project) => {
  localStorage.setItem("project_id", projectId);
  localStorage.setItem("project_name", projectName);
  localStorage.setItem("project_description", projectDescription);
};

const NewProjectComponent = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const projectName = useRef("");
  const projectDescription = useRef("");
  const image = useRef();

  const descriptionUpdate = (event: React.ChangeEvent<HTMLInputElement>) =>
    (projectDescription.current = event.target.value);

  const nameUpdate = (event: React.ChangeEvent<HTMLInputElement>) =>
    (projectName.current = event.target.value);

  const createNewProject = async (): Promise<void> => {
    if (projectName.current && projectDescription.current) {
      const project = {
        projectName: projectName.current,
        projectDescription: projectDescription.current,
      };
      const { uid } = currentUser;
      try {
        const { id: projectId } = await addDoc(
          collection(db, `users/${uid}/projects/`),
          project,
        );
        setProjectInLocalStorage({ projectId, ...project });
        navigate("/");
        console.log("Document written with ID: ", projectId);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert.error("Please provide the name and description of the project");
    }
  };

  return (
    <div className="newProjectComponent">
      <FormGroup controlId="form-group-id">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Placeholder text"
          ref={projectName}
          onChange={nameUpdate}
        />
      </FormGroup>
      <Form.Group controlId="form-group-id">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Placeholder"
          rows={3}
          ref={projectDescription}
          onChange={descriptionUpdate}
        />
      </Form.Group>
      <Form.Group controlId="form-group-id">
        <ImageGenerator input={projectDescription.current} ref={image} />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={createNewProject}>
          Primary
        </Button>
      </div>
    </div>
  );
};

export { NewProjectComponent };
