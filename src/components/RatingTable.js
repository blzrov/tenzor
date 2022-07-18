import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./play-icon.png";
function RatingTable(props) {
  //to do id 2
  return (
    <Table className="border-primary">
      <thead
        style={{
          background:
            "linear-gradient(267.7deg, #6225FC 4.09%, #B427FF 95.97%)",
          color: "white",
        }}
      >
        <tr style={{ lineHeight: "40px" }}>
          <th>№</th>
          <th>Имя пользователя</th>
          <th>Стихотворение</th>
          <th></th>
          <th>Оценка</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(10).keys()].map((elem) => (
          <RatingTableTr key={elem} id={elem} />
        ))}
      </tbody>
    </Table>
  );
}

function RatingTableTr(props) {
  return (
    <tr style={{ verticalAlign: "middle" }}>
      <td>{props.id + 1}</td>
      <td>Фамилия Имя</td>
      <td>У лукоморья дуб зеленый</td>
      <td>
        <button style={{ border: "none" }}>
          <img src={play} alt="play"></img>
        </button>
      </td>
      <td>5</td>
      <td>
        <Button variant="warning">Оценить</Button>
      </td>
    </tr>
  );
}

export default RatingTable;
