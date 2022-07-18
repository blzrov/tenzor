import React from "react";
import Container from "react-bootstrap/esm/Container";
import logo from "../logo-name-lowercase.png";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="header" style={{ minWidth: "310px" }}>
      <Container>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt="logo"
                width={113}
                style={{ filter: "brightness(10000%)" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/rating">
                    Рейтинг
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/catalog">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="!#">
                    Войти
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="!#">
                    Поиск
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
}
export default Nav;
