import React, { useContext, useEffect, useState } from "react";
import MyVCModalGrade from "./MyVCModalGrade";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./img/play-icon.png";
import pause from "./img/pause-icon.png";
import { Link } from "react-router-dom";
import { ServerControllerContext } from "../App";

function RatingTable(props) {
  let [data, setData] = React.useState("");
  let [audio, setAudio] = React.useState("");

  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    getUsersRecords();
  }, [props.page]);
  const getUsersRecords = async () => {
    const data = await serverController.getUsersRecords((props.page - 1) * 10);
    if (!data) return;
    setData(data);
  };

  function changeAudio(url) {
    if (url === audio) setAudio("");
    else setAudio(url);
  }

  return (
    <Table className="border-primary">
      <thead
        style={{
          background:
            "linear-gradient(256.02deg, #4E22BC -10.04%, #8063A5 93.08%)",
          backgroundAttachment: "fixed",
          border: "1px solid #000000",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          color: "white",
        }}
      >
        <tr style={{ lineHeight: "40px" }}>
          <th>№</th>
          <th>Имя пользователя</th>
          <th>Стихотворение</th>
          <th>
            <audio
              src={audio}
              controls
              onEnded={() => {
                changeAudio("");
              }}
              autoPlay
              style={{ display: "none" }}
            />
          </th>
          <th>Рейтинг</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(data.length).keys()].map((elem) => (
          <RatingTableTr
            key={elem}
            id={elem + 10 * (props.page - 1)}
            audio={audio}
            data={data[elem]}
            setAudio={changeAudio}
            handleData={getUsersRecords}
          />
        ))}
      </tbody>
    </Table>
  );
}

function RatingTableTr(props) {
  const [modalShow, setModalShow] = useState(false);
  if (props.data.records.length === 0) return;

  return (
    <tr style={{ verticalAlign: "middle" }}>
      <td>{props.id + 1}</td>
      <td>{props.data.records[0].ownerName}</td>
      <td>
        <Link
          className="hover-underline"
          to={"/poem/" + props.data.records[0].poem}
          style={{ textDecoration: "none", color: "black" }}
        >
          {props.data.records[0].poemName}
        </Link>
      </td>
      <td>
        <button
          style={{ border: "none", backgroundColor: "white" }}
          onClick={() => {
            props.setAudio(props.data.records[0].url);
          }}
        >
          <PlayOrPause audio={props.audio} data={props.data.records[0].url} />
        </button>
      </td>
      <td>{props.data.userRating}</td>
      <td>
        <Button className="yellow-button" onClick={() => setModalShow(true)}>
          Оценить
        </Button>
      </td>
      <MyVCModalGrade
        id={props.data.records[0].id}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleData={props.handleData}
      />
    </tr>
  );
}

function PlayOrPause(props) {
  console.log(props.audio);
  if (props.audio === props.data) return <img src={pause} alt="play"></img>;
  return <img src={play} alt="play"></img>;
}

export default RatingTable;
