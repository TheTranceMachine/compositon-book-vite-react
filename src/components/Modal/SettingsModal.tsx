import { FormEvent, Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

interface SettingsModalPropTypes {
  currentUser: {
    displayName: string;
    email: string;
  };
  updateUser: (name: string, email: string) => void;
  editable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const SettingsModal = ({ currentUser, updateUser, editable, setEditable, show, setShow }: SettingsModalPropTypes) => {
  let { displayName, email } = currentUser;

  const displayNameRef = useRef(displayName);
  const setDisplayName = (e: FormEvent<HTMLInputElement>) => {
    displayNameRef.current = e.target.value;
  };

  const emailRef = useRef(email);
  const setEmail = (e: FormEvent<HTMLInputElement>) => {
    emailRef.current = e.target.value;
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
                defaultValue={displayNameRef.current}
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
                defaultValue={emailRef.current}
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
          <Button variant="warning" onClick={() => setEditable((editable) => !editable)}>
            Edit
          </Button>
        ) : (
          <Button variant="primary" onClick={() => updateUser(displayNameRef.current, emailRef.current)}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export { SettingsModal };
