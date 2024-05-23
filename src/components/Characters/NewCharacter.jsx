import { IoCloseCircleSharp } from "react-icons/io5";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BsFileEarmarkPersonFill } from "react-icons/bs";

const NewCharacter = ({ closeCharactersPane }) => {
  return (
    <div className="py-2 px-3 h-full bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="font-medium truncate">Characters</div>
        <IoCloseCircleSharp onClick={() => closeCharactersPane()} />
      </div>
      <div className="bg-amber-300 rounded-md border-1 border-amber-400 shadow-md shadow-slate-400">
        <div className="flex gap-2 items-center border-b border-amber-400 p-3">
          <BsFileEarmarkPersonFill />
          <div className="font-medium">New Character</div>
        </div>
        <div className="border-t border-t-amber-200 border-b border-b-amber-400 p-3">
          <>
            <InputGroup className="mb-3">
              <InputGroup.Text id="character-name" className="bg-amber-300 border-1 border-amber-500">
                Name
              </InputGroup.Text>
              <Form.Control
                placeholder="Name"
                aria-label="Name"
                aria-describedby="character-name"
                className="border-1 border-amber-500"
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Text className="bg-amber-300 border-1 border-amber-500">Description</InputGroup.Text>
              <Form.Control as="textarea" aria-label="Description" className="border-1 border-amber-500 " />
            </InputGroup>
          </>
        </div>
        <div className="p-3 border-t border-t-amber-200">
          <Button variant="dark">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default NewCharacter;
