import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { UserAvatarDropdown } from "../UserAvatarDropdown/UserAvatarDropdown.jsx";
import "./CustomNavbar.scss";

const expand = false;

const CustomNavbar = () => (
  <Navbar
    key={expand}
    expand={expand}
    className="custom-navbar bg-body-tertiary"
  >
    <Container fluid>
      <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
      <div className="custom-navbar__right">
        <UserAvatarDropdown />
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
  </Navbar>
);

export { CustomNavbar };
