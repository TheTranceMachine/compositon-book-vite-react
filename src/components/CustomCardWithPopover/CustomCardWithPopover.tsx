import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const FullCard = ({ id, title, description, icon, deleteItem }) => (
  <div className="bg-neutral-300 rounded-md border-1 border-neutral-400 mt-3" key={id}>
    <div className="flex gap-2 items-center p-2 border-b border-neutral-400">
      {icon}
      <div className="font-medium truncate">{title}</div>
    </div>
    <div className="p-2 border-t border-t-neutral-200 border-b border-neutral-400">
      <div className="text-xs text-neutral-500">{description}</div>
    </div>
    <div className="flex p-2 border-t border-t-neutral-200 justify-end">
      <Button variant="dark" size="sm" onClick={() => deleteItem(id, title)} className="flex gap-x-1 items-center">
        Delete
      </Button>
    </div>
  </div>
);

const popover = ({ id, title, description, icon }) => (
  <Popover id={id} key={id}>
    <Popover.Header className="flex gap-2 items-center">
      {icon}
      <div className="font-medium truncate">{title}</div>
    </Popover.Header>
    <Popover.Body>{description}</Popover.Body>
  </Popover>
);

const CollapsedCard = ({ id, title, description, icon }) => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover({ id, title, description, icon })} key={id}>
    <div className="bg-neutral-300 rounded-md border-1 border-neutral-400 mt-3 cursor-pointer" key={id}>
      <div className="flex justify-center items-center p-2">{icon}</div>
    </div>
  </OverlayTrigger>
);

export { FullCard, CollapsedCard };
