import { useOutletContext } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { PromptDropdown } from "./components/PromptDropdown";
import "./Prompt.scss";

export const Prompt = () => {
  const [context, setContext] = useOutletContext();
  const { currentSelection } = context;

  return (
    <div className="prompt">
      <PromptDropdown />
      <Form>
        <Form.Group
          controlId="exampleForm.ControlTextarea1"
          data-bs-theme="dark"
          className="prompt__editor"
        >
          <Form.Control as="textarea" rows={3} value={currentSelection} />
        </Form.Group>
      </Form>
    </div>
  );
};
