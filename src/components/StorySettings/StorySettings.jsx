import { Button } from "react-bootstrap";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BsImageFill } from "react-icons/bs";

const StorySettings = ({ storySettings, closeStorySettingsPane, deleteStorySetting }) => (
  <div className="py-2 px-3 h-full bg-white">
    <div className="flex justify-between items-center mb-3">
      <div className="font-medium truncate">Story Settings</div>
      <IoCloseCircleSharp onClick={() => closeStorySettingsPane()} className="cursor-pointer" />
    </div>
    {storySettings.map(({ id, title, description }) => (
      <div className="bg-amber-300 rounded-md border-1 border-amber-400 shadow-md shadow-slate-400 mt-3" key={id}>
        <div className="flex gap-2 items-center p-2 border-b border-amber-400">
          <BsImageFill />
          <div className="font-medium truncate">{title}</div>
        </div>
        <div className="p-2 border-t border-t-amber-200 border-b border-amber-400">
          <div className="text-xs text-gray-500">{description}</div>
        </div>
        <div className="flex p-2 border-t border-t-amber-200 justify-end">
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
    ))}
  </div>
);

export default StorySettings;
