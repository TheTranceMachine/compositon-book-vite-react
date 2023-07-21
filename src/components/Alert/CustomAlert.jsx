import Alert from "react-bootstrap/Alert";

const CustomAlert = ({
  heading,
  message,
  variant,
  show,
  setShowAlert = () => {},
}) => (
  <>
    {show && (
      <Alert
        variant={variant}
        onClose={setShowAlert}
        dismissible
        style={{ width: "100%" }}
      >
        {heading && <Alert.Heading>{heading}</Alert.Heading>}
        {message}
      </Alert>
    )}
  </>
);

export { CustomAlert };
