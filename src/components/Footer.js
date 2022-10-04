import React from "react";
import Container from "react-bootstrap/esm/Container";
import logo from "./img/logo-name-lowercase.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="footer mt-5 minW"
      style={{
        width: "100%",
        height: "195px",
        overflow: "hidden",
        background: "#8063A5",
      }}
    >
      <Container>
        <nav className="navbar navbar-expand-lg navbar-dark d-block ">
          <ul
            className="navbar-nav d-flex justify-content-between align-items-center "
            style={{ height: "180px" }}
          >
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <img
                  src={logo}
                  alt="logo"
                  width={126}
                  style={{ filter: "brightness(10000%)" }}
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/example">
                О проекте
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="!#">
                denblzrv@gmail.com
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="https://tensor.ru/">
                © 2022
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
export default Footer;
