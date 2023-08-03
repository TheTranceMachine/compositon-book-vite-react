import { useState } from "react";
import Toast from "react-bootstrap/Toast";

const CustomToast = ({ type = "light", message }) => {
  const [show, setShow] = useState(true);

  return (
    <Toast
      bg={type}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export { CustomToast };
