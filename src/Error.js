import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
function Error() {
  return (
    <Container>
      <div className="row my-5">
        <h3>Такой страницы не существует :c</h3>
        <Link className="nav-link active" to="/">
          <h4>Вернуться на сайт</h4>
        </Link>
      </div>
    </Container>
  );
}
export default Error;
