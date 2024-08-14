import { ButtonGroup, Button, Modal } from "react-bootstrap";

type DeletionConfirmationModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onDelete: () => void;
  item: string;
  type: string;
};

const DeletionConfirmationModal = ({ show, setShow, onDelete, item, type }: DeletionConfirmationModalPropTypes) => (
  <Modal show={show} onHide={setShow} centered>
    <Modal.Header closeButton className="bg-red-400 rounded-t-md border-b border-red-500">
      <Modal.Title>You're deleting a {type}</Modal.Title>
    </Modal.Header>

    <Modal.Body className="bg-red-400 border-t border-t-red-300 border-b border-b-red-500 p-3">
      <p>
        Are you sure you want to delete <b>{item}</b> from {type}s?
      </p>
    </Modal.Body>

    <Modal.Footer className="bg-red-400 p-3 border-t border-t-red-300">
      <ButtonGroup aria-label="Modal buttons" className="w-100">
        <Button variant="dark" onClick={onDelete} className="border-r border-2 border-r-slate-800">
          Yes
        </Button>
        <Button variant="dark" onClick={setShow} className="border-l border-l-slate-600">
          No
        </Button>
      </ButtonGroup>
    </Modal.Footer>
  </Modal>
);

export default DeletionConfirmationModal;
