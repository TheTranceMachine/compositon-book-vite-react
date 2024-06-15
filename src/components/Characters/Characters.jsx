import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { FullCard, CollapsedCard } from "../CustomCardWithPopover/CustomCardWithPopover";

const Characters = ({ characters, toggleCharactersPane, paneFullView, deleteCharacter }) => (
  <div className={`${paneFullView ? "px-3 py-2" : "px-1 py-2.5"}`}>
    <div className={`flex ${paneFullView ? "justify-between" : "justify-center"} items-center mb-3`}>
      {paneFullView && <div className="font-medium truncate">Characters</div>}
      {paneFullView ? (
        <TbLayoutSidebarRightExpandFilled
          onClick={() => toggleCharactersPane(!paneFullView)}
          className="cursor-pointer"
        />
      ) : (
        <TbLayoutSidebarLeftExpandFilled
          onClick={() => toggleCharactersPane(!paneFullView)}
          className="cursor-pointer"
        />
      )}
    </div>
    {characters.map(({ id, name, description }) =>
      paneFullView ? (
        <FullCard
          id={id}
          title={name}
          description={description}
          icon={<BsFileEarmarkPersonFill />}
          deleteItem={deleteCharacter}
        />
      ) : (
        <CollapsedCard id={id} title={name} description={description} icon={<BsFileEarmarkPersonFill />} />
      )
    )}
  </div>
);

export default Characters;
