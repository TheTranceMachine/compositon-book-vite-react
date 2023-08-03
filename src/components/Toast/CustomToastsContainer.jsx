import ToastContainer from "react-bootstrap/ToastContainer";
import { CustomToast } from "./CustomToast";
import "./CustomToastsContainer.scss";

const CustomToastsContainer = ({ toasts }) => (
  <ToastContainer className="toast-container" position="top-end">
    {toasts.map((toast) => (
      <CustomToast key={toast.id} {...toast} />
    ))}
  </ToastContainer>
);

export { CustomToastsContainer };
