import React from "react";
import Container from "react-bootstrap/esm/Container";
import logo from "../logo-name-lowercase.png";
import yandexLogo from "./yandex-img.svg";
import find from "./find-icon.png";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ minWidth: "310px", background: "#af88e2" }}
    >
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="logo"
              width={126}
              style={{ filter: "brightness(10000%)", marginTop: "-4.5px" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link active" to="/rating">
              Рейтинг
            </Link>
            <Link className="nav-link active" to="/catalog">
              Каталог
            </Link>
          </Nav>
          <Nav>
            <IsAuthorized />
            <Link className="nav-link active" to="/catalog">
              <img src={find} alt="find" width="24"></img>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function IsAuthorized() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Link
        disabled
        className="nav-link active"
        to="/"
        onClick={(e) => {
          setModalShow(true);
          e.preventDefault();
        }}
      >
        Войти
      </Link>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Авторизация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Вход через социальные сети:</h6>
        <a href="!#" alt="yandex">
          <img style={{ maxWidth: "100%" }} src={yandexLogo}></img>
        </a>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Header;
