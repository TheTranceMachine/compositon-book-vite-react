import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { updateProfile, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../../config/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { SettingsModal } from "../Modal/SettingsModal";
import { FileUploadModal } from "../Modal/FileUploadModal";
import { UserAvatarDropdown } from "../UserAvatarDropdown/UserAvatarDropdown.jsx";
import "./CustomNavbar.scss";

const CustomNavbar = () => {
  const [settingsEditable, setSettingsEditable] = useState(false);
  const [profilePicEditable, setProfilePicEditable] = useState(false);
  const [settingsModalShow, setSettingsModalShow] = useState(false);
  const [picModalShow, setPicModalShow] = useState(false);

  const { currentUser } = useAuth();
  const expand = false;
  const toast = useToast();
  const navigate = useNavigate();

  const updateUser = (props) => {
    updateProfile(currentUser, {
      ...props,
    })
      .then(() => {
        setSettingsEditable(false);
        toast.success("Your user was updated");
      })
      .catch((error) => toast.error(error.message));
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/authenticate");
      })
      .catch((error) => console.log(error));
  };

  const updateProfilePic = (file) => {
    const { uid } = currentUser;
    const storageRef = ref(storage, `${uid}/profile/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            updateUser({ photoURL: url });
            setProfilePicEditable(false);
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Navbar
      key={expand}
      expand={expand}
      className="custom-navbar bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand>Composition book</Navbar.Brand>
        <div className="custom-navbar__right d-flex gap-2">
          <UserAvatarDropdown
            currentUser={currentUser}
            showSettingsModal={() => setSettingsModalShow(true)}
            showProfilePicModal={() => setPicModalShow(true)}
            userSignOut={userSignOut}
          />
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        </div>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
        </Navbar.Offcanvas>
      </Container>
      <SettingsModal
        currentUser={currentUser}
        updateUser={(name, email) => updateUser({ displayName: name, email })}
        editable={settingsEditable}
        setEditable={setSettingsEditable}
        show={settingsModalShow}
        setShow={setSettingsModalShow}
      />
      <FileUploadModal
        currentUser={currentUser}
        updateProfilePic={(file) => updateProfilePic(file)}
        editable={profilePicEditable}
        setEditable={setProfilePicEditable}
        show={picModalShow}
        setShow={setPicModalShow}
      />
    </Navbar>
  );
};

export { CustomNavbar };
