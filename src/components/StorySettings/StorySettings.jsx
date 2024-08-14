import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { BsImageFill } from "react-icons/bs";
import { FullCard, CollapsedCard } from "../CustomCardWithPopover/CustomCardWithPopover";

const StorySettings = ({ storySettings, toggleStorySettingsPane, paneFullView, deleteStorySetting }) => (
  <div className={`${paneFullView ? "px-3 py-2" : "px-1 py-2.5"}`}>
    <div className={`flex ${paneFullView ? "justify-between" : "justify-center"} items-center mb-3`}>
      {paneFullView && <div className="font-medium truncate">Story Settings</div>}
      {paneFullView ? (
        <TbLayoutSidebarRightExpandFilled
          onClick={() => toggleStorySettingsPane(!paneFullView)}
          className="cursor-pointer"
        />
      ) : (
        <TbLayoutSidebarLeftExpandFilled
          onClick={() => toggleStorySettingsPane(!paneFullView)}
          className="cursor-pointer"
        />
      )}
    </div>
    {storySettings.map(({ id, title, description }) =>
      paneFullView ? (
        <FullCard
          id={id}
          title={title}
          description={description}
          icon={<BsImageFill />}
          deleteItem={deleteStorySetting}
        />
      ) : (
        <CollapsedCard id={id} title={title} description={description} icon={<BsImageFill />} />
      )
    )}
  </div>
);

export default StorySettings;
