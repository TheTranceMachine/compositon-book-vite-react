import { useEffect, useState } from "react";
import { ButtonGroup, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { BsImageFill } from "react-icons/bs";
import { StorySettingTypes } from "../../../types/types";

type NewStorySettingModalPropTypes = {
  show: boolean;
  setShow: () => void;
  onSave: (val: StorySettingTypes) => void;
  newSettingTitle: string;
};

const NewStorySettingModal = ({ show, setShow, onSave, newSettingTitle }: NewStorySettingModalPropTypes) => {
  const [newSetting, setNewSetting] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (newSettingTitle !== "") {
      setNewSetting({ title: newSettingTitle, description: "" });
    } else {
      setNewSetting({ title: "", description: "" });
    }
  }, [show, newSettingTitle]);

  return (
    <Modal show={show} onHide={setShow} centered>
      <Modal.Header closeButton className="bg-amber-300 rounded-t-md border-b border-amber-400">
        <Modal.Title className="flex gap-2 items-center">
          <BsImageFill />
          New Story Setting
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-amber-300 border-t border-t-amber-200 border-b border-b-amber-400 p-3">
        <InputGroup className="mb-3">
          <InputGroup.Text id="setting-title" className="bg-amber-300 border-1 border-amber-500">
            Title
          </InputGroup.Text>
          <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="setting-title"
            className="border-1 border-amber-500"
            value={newSetting.title}
            onChange={(e) => setNewSetting({ ...newSetting, title: e.target.value })}
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Text className="bg-amber-300 border-1 border-amber-500">Description</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="Description"
            className="border-1 border-amber-500"
            onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer className="bg-amber-300 p-3 border-t border-t-amber-200">
        <ButtonGroup aria-label="Modal buttons" className="w-100">
          <Button variant="dark" onClick={() => onSave(newSetting)} className="border-r border-2 border-r-slate-800">
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
export default NewStorySettingModal;
