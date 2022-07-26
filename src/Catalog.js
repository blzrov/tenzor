import { React, useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import useDebounce from "./hooks/useDebounce";
import { CurrentUser } from "./App";

function Catalog() {
  let [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);
  const currentUser = useContext(CurrentUser);
  let [author, setAuthor] = useState("");
  let [title, setTitle] = useState("");
  let [id, setID] = useState("");

  let [author2, setAuthor2] = useState("");
  let [title2, setTitle2] = useState("");
  let [id2, setID2] = useState("");

  let [author3, setAuthor3] = useState("");
  let [title3, setTitle3] = useState("");
  let [id3, setID3] = useState("");

  let [author4, setAuthor4] = useState("");
  let [title4, setTitle4] = useState("");
  let [id4, setID4] = useState("");

  let [author5, setAuthor5] = useState("");
  let [title5, setTitle5] = useState("");
  let [id5, setID5] = useState("");
  let [length, setLength] = useState(0);

  useEffect(() => {
    handleData();
  }, [debounceValue]);

  const handleData = async () => {
    const data = await currentUser.doSearch(debounceValue);
    if (!data.length) return;
    if (data) {
      setLength(data.length);
      setAuthor(data[0].author.firstName + " " + data[0].author.lastName);
      setTitle(data[0].title);
      setID(data[0].id);

      setAuthor2(data[1].author.firstName + " " + data[1].author.lastName);
      setTitle2(data[1].title);
      setID2(data[1].id);

      setAuthor3(data[2].author.firstName + " " + data[2].author.lastName);
      setTitle3(data[2].title);
      setID3(data[2].id);

      setAuthor4(data[3].author.firstName + " " + data[3].author.lastName);
      setTitle4(data[3].title);
      setID4(data[3].id);

      setAuthor5(data[4].author.firstName + " " + data[4].author.lastName);
      setTitle5(data[4].title);
      setID5(data[4].id);
    }
  };
  return (
    <Container className="mt-5">
      <h3 className="mb-3">Каталог</h3>
      <input
        className="form-control"
        type="text"
        placeholder="Введите название стихотворения"
        onChange={(event) => {
          setValue(event.target.value.toLowerCase());
        }}
      ></input>
      <CatalogFind
        length={length}
        query={debounceValue}
        author={author}
        title={title}
        author2={author2}
        title2={title2}
        author3={author3}
        title3={title3}
        author4={author4}
        title4={title4}
        author5={author5}
        title5={title5}
        id={id}
        id2={id2}
        id3={id3}
        id4={id4}
        id5={id5}
      />
    </Container>
  );
}
export default Catalog;

function CatalogFind(props) {
  if (props.length == 0) return;
  if (props.query)
    return (
      <div>
        <h4 className="my-3">Результаты поиска по {props.query}</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              className="p-2"
              style={{ color: "black" }}
              to={"/poem" + `/${props.id}`}
            >
              {props.author} - {props.title}
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="p-2"
              style={{ color: "black" }}
              to={"/poem" + `/${props.id2}`}
            >
              {props.author2} - {props.title2}
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="p-2"
              style={{ color: "black" }}
              to={"/poem" + `/${props.id3}`}
            >
              {props.author3} - {props.title3}
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="p-2"
              style={{ color: "black" }}
              to={"/poem" + `/${props.id4}`}
            >
              {props.author4} - {props.title4}
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="p-2"
              style={{ color: "black" }}
              to={"/poem" + `/${props.id5}`}
            >
              {props.author5} - {props.title5}
            </Link>
          </li>
        </ul>
      </div>
    );
}
