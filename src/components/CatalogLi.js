import { React } from "react";
import { Link } from "react-router-dom";

export default function CatalogLi(props) {
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
