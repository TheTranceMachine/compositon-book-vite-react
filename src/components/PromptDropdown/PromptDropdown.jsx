import Dropdown from "react-bootstrap/Dropdown";
import { items } from "./DropdownItems";
import "./PromptDropdown.scss";

const PromptDropdown = ({ onChange }) => (
  <Dropdown
    as={Dropdown.Menu}
    show
    className="prompt__dropdown"
    data-bs-theme="dark"
    onSelect={onChange}
  >
    <Dropdown.Header>Enhance text with ChatGPT</Dropdown.Header>
    {items.map(({ id, text }) => (
      <Dropdown.Item eventKey={text} key={id}>
        {text}
      </Dropdown.Item>
    ))}
  </Dropdown>
);

export { PromptDropdown };
