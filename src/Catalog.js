import { React, useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import useDebounce from "./hooks/useDebounce";
import { ServerControllerContext } from "./App";

function Catalog() {
  let [value, setValue] = useState("");
  const serverController = useContext(ServerControllerContext);
  const debounceValue = useDebounce(value, 100);
  let [datas, setData] = useState([]);
  let [length, setLength] = useState(0);

  useEffect(() => {
    handleData();
  }, [debounceValue]);

  const handleData = async () => {
    const data = await serverController.doSearch(
      debounceValue.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()…]/g, "")
    );
    setData([]);
    setLength(data.length);
    if (!data.length) return;
    if (data) {
      let datas = [];
      {
        [...Array(data.length).keys()].map((elem) => {
          let dataElem = {};
          dataElem.author =
            data[elem].author.firstName + " " + data[elem].author.lastName;
          dataElem.title = data[elem].title;
          dataElem.id = data[elem].id;
          datas.push(dataElem);
        });
      }

      setData(datas);
    }
  };
  return (
    <Container className="mt-5">
      <h3 className="mb-3">Каталог</h3>
      <input
        style={{ background: "#E7E7E7", padding: "15px", paddingLeft: "25px" }}
        className="form-control"
        type="text"
        placeholder="Введите название стихотворения"
        onChange={(event) => {
          setValue(event.target.value.toLowerCase());
        }}
      ></input>
      <CatalogFind length={length} query={value} data={datas} />
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
            <CatalogLink key={elem} id={elem} data={props.data[elem]} />
          ))}
        </ul>
      </div>
    );
}

function CatalogLink(props) {
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
