import React from "react";
import { Link } from "react-router-dom";
import play from "./play-icon.png";
function BestReadOnPage(props) {
  return (
    <div className="mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Лучшее прочтение</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          <BestReadTableTr id={props.id} index={1} />
          <BestReadTableTr id={props.id} index={2} />
          <BestReadTableTr id={props.id} index={3} />
        </tbody>
      </table>
      <div className="mt-3 d-flex justify-content-end">
        <Link style={{ color: "black" }} to={"/poem" + `/${props.id}/rating`}>
          Посмотреть все
        </Link>
      </div>
    </div>
  );
}

function BestReadTableTr(props) {
  return (
    <tr>
      <th scope="row">
        <span className="" style={{ marginRight: "20px" }}>
          Миша иванов
        </span>
        <button style={{ border: "none" }}>
          <img src={play} alt="play"></img>
        </button>
      </th>
      <td>5</td>
    </tr>
  );
}

export default BestReadOnPage;
