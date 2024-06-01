import { IoCloseCircleSharp } from "react-icons/io5";
import { BsImageFill } from "react-icons/bs";
import { settingsStore } from "../../reducers/settingReducer";

const StorySettings = ({ closeStorySettingsPane }) => {
  const { settings } = settingsStore.getState();
  return (
    <div className="py-2 px-3 h-full bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="font-medium truncate">Story Settings</div>
        <IoCloseCircleSharp onClick={() => closeStorySettingsPane()} />
      </div>
      {settings.map(({ id, title, description }) => (
        <div className="bg-amber-300 rounded-md border-1 border-amber-400 shadow-md shadow-slate-400 mt-3" key={id}>
          <div className="p-2 border-b border-amber-400 flex gap-2 items-center">
            <BsImageFill />
            <div className="font-medium">{title}</div>
          </div>
          <div className="p-2 border-t border-t-amber-200">
            <div className="text-xs text-gray-500">{description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StorySettings;
