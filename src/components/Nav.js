import React from "react";
import Container from "react-bootstrap/esm/Container";
import logo from "../logo-name-lowercase.png";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
            <Link className="nav-link active" to="!#">
              Войти
            </Link>
            <Link className="nav-link active" to="/catalog">
              Поиск
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
