import { useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import { AuthContext } from "../../Auth";
import { auth } from "../../../config/firebaseConfig";

const UserAvatarDropdown = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/authenticate");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="light">
        <Image
          src="https://randomuser.me/api/portraits/men/62.jpg"
          roundedCircle
          fluid
          height="35"
          width="35"
        />
      </Button>
      <Dropdown.Toggle split variant="light" />
      <Dropdown.Menu align="end">
        <Dropdown.Item href="#/action-1">{currentUser.email}</Dropdown.Item>
        <Dropdown.Item onClick={userSignOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { UserAvatarDropdown };
