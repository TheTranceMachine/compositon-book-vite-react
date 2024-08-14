import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import "./UserAvatarDropdown.scss";

const UserAvatarDropdown = ({ currentUser, showSettingsModal, showProfilePicModal, userSignOut }) => {
  const { photoURL } = currentUser;
  return (
    <Dropdown as={ButtonGroup} size="sm">
      <Button variant="light" className="border">
        <Image
          src={photoURL ? photoURL : "https://randomuser.me/api/portraits/men/62.jpg"}
          roundedCircle
          fluid
          onClick={showProfilePicModal}
          className="user-avatar-dropdown__img"
        />
      </Button>
      <Dropdown.Toggle split variant="light" className="border" />
      <Dropdown.Menu align="end">
        <Dropdown.Item onClick={showSettingsModal}>Settings</Dropdown.Item>
        <Dropdown.Item onClick={userSignOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { UserAvatarDropdown };
