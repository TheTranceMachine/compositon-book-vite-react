import Spinner from "react-bootstrap/Spinner";

const CustomSpinner = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "rgb(34, 34, 34)",
    }}
  >
    <Spinner
      animation="border"
      variant="light"
      style={{ height: "200px", width: "200px" }}
    />
  </div>
);

export { CustomSpinner };
