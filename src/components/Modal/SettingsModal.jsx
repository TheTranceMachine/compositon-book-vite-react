import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

const SettingsModal = ({
  currentUser,
  updateUser,
  editable,
  setEditable,
  show,
  setShow,
}) => {
  let { displayName, email } = currentUser;

  displayName = useRef(displayName);
  const setDisplayName = (e) => {
    displayName.current = e.target.value;
  };

  email = useRef(email);
  const setEmail = (e) => {
    email.current = e.target.value;
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            <InputGroup>
              <InputGroup.Text id="modal-input-name">Name</InputGroup.Text>
              <Form.Control
                aria-label="Name"
                aria-describedby="modal-input-name"
                readOnly={!editable}
                disabled={!editable}
                defaultValue={displayName.current}
                onChange={setDisplayName}
              />
            </InputGroup>
          </ListGroup.Item>
          <ListGroup.Item>
            <InputGroup>
              <InputGroup.Text id="modal-input-email">Email</InputGroup.Text>
              <Form.Control
                aria-label="Email"
                aria-describedby="modal-input-email"
                readOnly={!editable}
                disabled={!editable}
                defaultValue={email.current}
                onChange={setEmail}
              />
            </InputGroup>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        {!editable ? (
          <Button
            variant="warning"
            onClick={() => setEditable((editable) => !editable)}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => updateUser(displayName.current, email.current)}
          >
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export { SettingsModal };
