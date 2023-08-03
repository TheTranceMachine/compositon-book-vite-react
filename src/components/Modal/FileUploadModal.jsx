import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

const FileUploadModal = ({
  currentUser,
  updateProfilePic,
  editable,
  setEditable,
  show,
  setShow,
}) => {
  const { photoURL } = currentUser;
  const file = useRef(null);

  const changeFile = (e) => (file.current = e.target.files[0]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Profile picture</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {editable ? (
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload profile picture</Form.Label>
            <Form.Control type="file" onChange={changeFile} />
          </Form.Group>
        ) : (
          <Image
            src={
              photoURL
                ? photoURL
                : "https://randomuser.me/api/portraits/men/62.jpg"
            }
            roundedCircle
            fluid
            width="200"
            height="200"
            border="primary"
          />
        )}
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
            onClick={() => updateProfilePic(file.current)}
          >
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export { FileUploadModal };
