import { React, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
function Catalog() {
  let [value, setValue] = useState(false);
  return (
    <Container className="mt-5">
      <h3 className="mb-3">Каталог</h3>
      <input
        className="form-control"
        type="text"
        placeholder="Введите автора или название стихотворения"
        onChange={(event) => setValue(event.target.value)}
      ></input>
      <CatalogFind query={value} />
    </Container>
  );
}
export default Catalog;

function CatalogFind(props) {
  if (props.query)
    return (
      <div>
        <h4 className="my-3">Результаты поиска по {props.query}</h4>
        <ul class="list-group">
          <li class="list-group-item">
            <Link style={{ color: "black" }} to="/example">
              Первый результат поиска
            </Link>
          </li>
        </ul>
      </div>
    );
}
