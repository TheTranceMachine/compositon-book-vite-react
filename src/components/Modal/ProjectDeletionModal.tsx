import { ButtonGroup, Button, Modal } from "react-bootstrap";

type ProjectDeletionModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onDelete: () => void;
  onCancel: () => void;
  projectName: string;
};

const ProjectDeletionModal = ({ show, setShow, onDelete, onCancel, projectName }: ProjectDeletionModalPropTypes) => (
  <Modal show={show} onHide={setShow} centered>
    <Modal.Header closeButton>
      <Modal.Title>Project Deletion</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>
        Are you sure you want to delete <b>{projectName}</b> project?
      </p>
    </Modal.Body>

    <Modal.Footer>
      <ButtonGroup aria-label="Modal buttons" className="w-100">
        <Button variant="dark" onClick={onDelete}>
          Yes
        </Button>
        <Button variant="dark" onClick={onCancel}>
          No
        </Button>
      </ButtonGroup>
    </Modal.Footer>
  </Modal>
);

export default ProjectDeletionModal;
