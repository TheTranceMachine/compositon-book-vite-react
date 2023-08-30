import Placeholder from "react-bootstrap/Placeholder";
import { FaPlus } from "react-icons/fa";

const placeholder = (
  <>
    <Placeholder xs={6} />
    <Placeholder className="w-75" /> <Placeholder style={{ width: "25%" }} />
  </>
);
const projectsList = [
  {
    placeholder: <FaPlus style={{ width: "3rem", height: "3rem" }} />,
    name: "",
    buttonText: "New Project",
  },
  {
    placeholder,
    name: "test",
    buttonText: "Edit",
  },
  {
    placeholder,
    name: "test",
    buttonText: "Edit",
  },
  {
    placeholder,
    name: "test",
    buttonText: "Edit",
  },
  {
    placeholder,
    name: "test",
    buttonText: "Edit",
  },
  {
    placeholder,
    name: "test",
    buttonText: "Edit",
  },
  {
    placeholder,
    name: "test",
    buttonText: "Edit",
  },
];

export { projectsList };
