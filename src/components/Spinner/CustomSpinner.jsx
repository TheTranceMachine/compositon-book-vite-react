import Spinner from "react-bootstrap/Spinner";

const CustomSpinner = ({ className, height, width }) => (
  <div
    className={className}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Spinner animation="border" variant="light" style={{ height: height, width: width }} />
  </div>
);

export { CustomSpinner };
