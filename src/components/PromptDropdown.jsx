import Dropdown from 'react-bootstrap/Dropdown';
import './PromptDropdown.scss';

const PromptDropdown = () => (
  <Dropdown.Menu show className="prompt__dropdown" data-bs-theme="dark">
    <Dropdown.Header>Enhance text with ChatGPT</Dropdown.Header>
    <Dropdown.Item eventKey="2">Make it more professional</Dropdown.Item>
    <Dropdown.Item eventKey="3">Make it more fantastic</Dropdown.Item>
    <Dropdown.Item eventKey="4">Change style</Dropdown.Item>
  </Dropdown.Menu>
);

export { PromptDropdown };