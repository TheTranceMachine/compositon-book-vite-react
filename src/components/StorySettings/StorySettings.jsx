import React from "react";
import { Button } from "react-bootstrap";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { RiExpandLeftRightFill } from "react-icons/ri";
import { BsImageFill } from "react-icons/bs";

const fullView = ({ id, title, description, deleteStorySetting }) => (
  <div className="bg-neutral-300 rounded-md border-1 border-neutral-400 mt-3" key={id}>
    <div className="flex gap-2 items-center p-2 border-b border-neutral-400">
      <BsImageFill />
      <div className="font-medium truncate">{title}</div>
    </div>
    <div className="p-2 border-t border-t-neutral-200 border-b border-neutral-400">
      <div className="text-xs text-neutral-500">{description}</div>
    </div>
    <div className="flex p-2 border-t border-t-neutral-200 justify-end">
      <Button
        variant="dark"
        size="sm"
        onClick={() => deleteStorySetting(id, title)}
        className="flex gap-x-1 items-center"
      >
        Delete
      </Button>
    </div>
  </div>
);

const collapsedView = ({ id, title }) => (
  <div className="bg-neutral-300 rounded-md border-1 border-neutral-400 mt-3" key={id}>
    <div className="flex justify-center items-center p-2">
      <BsImageFill />
      {/* <div className="font-medium truncate">{title}</div> */}
    </div>
  </div>
);

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
      paneFullView ? fullView({ id, title, description, deleteStorySetting }) : collapsedView({ id, title })
    )}
  </div>
);

export default StorySettings;
