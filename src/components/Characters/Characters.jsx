import { IoCloseCircleSharp } from "react-icons/io5";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { characterStore } from "../../reducers/characterReducer";

const Characters = ({ closeCharactersPane }) => {
  const { characters } = characterStore.getState();
  return (
    <div className="py-2 px-3 h-full bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="font-medium truncate">Characters</div>
        <IoCloseCircleSharp onClick={() => closeCharactersPane()} />
      </div>
      {characters.map(({ id, name, description }) => (
        <div className="bg-amber-300 rounded-md border-1 border-amber-400 shadow-md shadow-slate-400 mt-3" key={id}>
          <div className="p-2 border-b border-amber-400 flex gap-2 items-center">
            <BsFileEarmarkPersonFill />
            <div className="font-medium">{name}</div>
          </div>
          <div className="p-2 border-t border-t-amber-200">
            <div className="text-xs text-gray-500">{description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
