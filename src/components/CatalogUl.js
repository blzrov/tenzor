import { React, useState, useEffect, useContext } from "react";
import { ServerControllerContext } from "../App";
import useDebounce from "../components/hooks/useDebounce";
import CatalogLi from "./CatalogLi";

export default function CatalogUl(props) {
  const serverController = useContext(ServerControllerContext);
  const [results, setResults] = useState([]);
  const debounceValue = useDebounce(props.value, 100);

  useEffect(() => {
    doSearch();
  }, [debounceValue]);

  const doSearch = async () => {
    setResults([]);
    const data = await serverController.doSearch(
      debounceValue.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()…]/g, "")
    );

    if (!data.length) return;
    if (data) {
      const results = [];
      data.map((elem) => {
        const resultElem = {};
        resultElem.author = elem.author.firstName + " " + elem.author.lastName;
        resultElem.title = elem.title;
        resultElem.id = elem.id;
        results.push(resultElem);
      });
      setResults(results);
    }
  };

  if (props.value)
    return (
      <ul className="list-group">
        {results.map((elem, index) => (
          <CatalogLi key={index} id={index} data={elem} />
        ))}
      </ul>
    );
}
