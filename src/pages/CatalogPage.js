import { React, useState, useEffect, useContext } from "react";
import { ServerControllerContext } from "../App";
import useDebounce from "../components/hooks/useDebounce";
import { Link } from "react-router-dom";

function CatalogPage() {
  const serverController = useContext(ServerControllerContext);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [length, setLength] = useState(0);
  const debounceValue = useDebounce(value, 100);

  useEffect(() => {
    doSearch();
  }, [debounceValue]);

  const doSearch = async () => {
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
        return;
      });
      setResults(results);
    }
  };

  return (
    <div>
      <h3 className="mb-3">Каталог</h3>
      <CatalogInput setValue={setValue} />
      <h4 className="my-3">
        {value ? "Результаты поиска по" : null} {value}
      </h4>
      <CatalogUl length={length} query={value} data={results} />
    </div>
  );
}
export default CatalogPage;

function CatalogInput(props) {
  return (
    <input
      className="form-control"
      type="text"
      placeholder="Введите название стихотворения"
      onChange={(event) => {
        props.setValue(event.target.value.toLowerCase());
      }}
      style={{
        background: "#E7E7E7",
        padding: "15px",
        paddingLeft: "25px",
      }}
    />
  );
}

function CatalogUl(props) {
  if (props.query)
    return (
      <ul className="list-group">
        {[...Array(props.data.length).keys()].map((elem) => (
          <CatalogLi key={elem} id={elem} data={props.data[elem]} />
        ))}
      </ul>
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
