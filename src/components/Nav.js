import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import logo from "../logo-name-lowercase.png";
import yandexLogo from "./yandex-img.svg";
import find from "./find-icon.png";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CurrentUserContext } from "../App";

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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function IsAuthorized() {
  const [modalShow, setModalShow] = useState(false);
  const nav = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const onClick = (e) => {
    e.preventDefault();
    setModalShow(true);
  };
  if (currentUser)
    return (
      <>
        <AfterAuthorized currentUser={currentUser} />
      </>
    );
  else
    return (
      <>
        <Link disabled className="nav-link active" to="/" onClick={onClick}>
          {"Войти"}
        </Link>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
}

function AfterAuthorized(props) {
  return (
    <>
      <Link disabled className="nav-link active" to="/myprofile">
        {props.currentUser.displayName}
      </Link>
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} aria-labelledby="myLargeModalLabel" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Авторизация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "0 auto" }}>
        <h6 style={{ textAlign: "center" }}>Вход через социальные сети:</h6>
        <a
          // target="_blank"
          // rel="noreferrer"
          href="https://oauth.yandex.ru/authorize?response_type=code&client_id=250a4b68f4b9439696580f24d1daa8f7"
          alt="Yandex"
        >
          <img
            style={{ maxWidth: "100%" }}
            src={yandexLogo}
            alt="sign in"
          ></img>
        </a>
      </Modal.Body>
    </Modal>
  );
}
export default Header;
