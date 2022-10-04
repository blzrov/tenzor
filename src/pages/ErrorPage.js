import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="row my-5">
      <h3>Такой страницы не существует :c</h3>
      <Link className="nav-link active" to="/">
        <h4>Вернуться на сайт</h4>
      </Link>
    </div>
  );
}

export default ErrorPage;
