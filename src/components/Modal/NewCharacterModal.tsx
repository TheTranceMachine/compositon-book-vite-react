import { useEffect, useState } from "react";
import { ButtonGroup, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { NewCharacter } from "../../../types/types";

type NewCharacterModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onSave: (val: NewCharacter) => void;
  newCharacterName: string;
};

const NewCharacterModal = ({ show, setShow, onSave, newCharacterName }: NewCharacterModalPropTypes) => {
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (newCharacterName !== "") {
      setNewCharacter({ name: newCharacterName, description: "" });
    } else {
      setNewCharacter({ name: "", description: "" });
    }
  }, [show, newCharacterName]);

  return (
    <Modal show={show} onHide={setShow} centered className="new-character-modal">
      <Modal.Header closeButton className="bg-amber-300 rounded-t-md border-b border-amber-400">
        <Modal.Title className="flex gap-2 items-center">
          <BsFileEarmarkPersonFill />
          New Character
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-amber-300 border-t border-t-amber-200 border-b border-b-amber-400 p-3">
        <InputGroup className="mb-3">
          <InputGroup.Text id="character-name" className="bg-amber-300 border-1 border-amber-500">
            Name
          </InputGroup.Text>
          <Form.Control
            placeholder="Name"
            aria-label="Name"
            aria-describedby="character-name"
            className="border-1 border-amber-500"
            value={newCharacter.name}
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Text className="bg-amber-300 border-1 border-amber-500">Description</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="Description"
            className="border-1 border-amber-500"
            onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer className="bg-amber-300 p-3 border-t border-t-amber-200">
        <ButtonGroup aria-label="Modal buttons" className="w-100">
          <Button variant="dark" onClick={() => onSave(newCharacter)} className="border-r border-2 border-r-slate-800">
            Save
          </Button>
          <Button variant="dark" onClick={setShow} className="border-l border-l-slate-600">
            Cancel
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};
export default NewCharacterModal;
