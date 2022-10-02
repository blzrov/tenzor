import { React, useState, useEffect, useContext } from "react";
import { ServerControllerContext } from "./App";
import useDebounce from "./hooks/useDebounce";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

function Catalog() {
  const serverController = useContext(ServerControllerContext);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [length, setLength] = useState(0);
  const debounceValue = useDebounce(value, 100);

  useEffect(() => {
    handleData();
  }, [debounceValue]);

  const handleData = async () => {
    const data = await serverController.doSearch(
      debounceValue.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()…]/g, "")
    );
    setResults([]);
    setLength(data.length);
    if (!data.length) return;
    if (data) {
      let results = [];
      [...Array(data.length).keys()].map((i) => {
        let resultElem = {};
        resultElem.author =
          data[i].author.firstName + " " + data[i].author.lastName;
        resultElem.title = data[i].title;
        resultElem.id = data[i].id;
        results.push(resultElem);
      });
      setResults(results);
    }
  };

  return (
    <Container>
      <div className="mt-5">
        <h3 className="mb-3">Каталог</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Введите название стихотворения"
          onChange={(event) => {
            setValue(event.target.value.toLowerCase());
          }}
          style={{
            background: "#E7E7E7",
            padding: "15px",
            paddingLeft: "25px",
          }}
        ></input>
        <CatalogFind length={length} query={value} data={results} />
      </div>
    </Container>
  );
}

export default Catalog;

function CatalogFind(props) {
  if (props.query)
    return (
      <div>
        <h4 className="my-3">Результаты поиска по {props.query}</h4>
        <ul className="list-group">
          {[...Array(props.data.length).keys()].map((elem) => (
            <CatalogLi key={elem} id={elem} data={props.data[elem]} />
          ))}
        </ul>
      </div>
    );
}

function CatalogLi(props) {
  return (
    <li className="list-group-item p-3">
      <Link
        className="p-2"
        style={{ color: "black" }}
        to={"/poem" + `/${props.data.id}`}
      >
        {props.data.author} - {props.data.title}
      </Link>
    </li>
  );
}
