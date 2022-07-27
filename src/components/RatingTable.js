import React, { useContext, useEffect, useState } from "react";
import Grade from "./grade/Grade";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./play-icon.png";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { CurrentUser } from "../App";
function RatingTable(props) {
  if (props.value == 1) {
  }
  let [data, setData] = React.useState("");
  let [audio, setAudio] = React.useState("");

  const currentUser = useContext(CurrentUser);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const data = await currentUser.getUsersRecords();
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
            "linear-gradient(267.7deg, #6225FC 4.09%, #B427FF 95.97%)",
          color: "white",
        }}
      >
        <tr style={{ lineHeight: "40px" }}>
          <th>№</th>
          <th>Имя пользователя</th>
          <th>Стихотворение</th>
          <th>
            <audio src={audio} controls autoPlay style={{ display: "none" }} />
          </th>
          <th>Рейтинг</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(data.length).keys()].map((elem) => (
          <RatingTableTr
            key={elem}
            id={elem}
            data={data[elem]}
            setAudio={changeAudio}
          />
        ))}
      </tbody>
    </Table>
  );
}

function RatingTableTr(props) {
  const [modalShow, setModalShow] = useState(false);
  const currentUser = useContext(CurrentUser);
  if (props.data.records.length == 0) return;

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
          <img src={play} alt="play"></img>
        </button>
      </td>
      <td>{props.data.userRating}</td>
      <td>
        <Button className="yellow-button" onClick={() => setModalShow(true)}>
          Оценить
        </Button>
      </td>
      <MyVerticallyCenteredModal
        id={props.data.records[0].id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </tr>
  );
}

function MyVerticallyCenteredModal(props) {
  let [grade, setGrade] = useState();
  const currentUser = useContext(CurrentUser);

  const onClick = async () => {
    const data = await currentUser.doVote(props.id, grade);
    props.onHide();
  };

  function hanldeGrade(a) {
    setGrade(a);
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Оцените прочтение по 5-балной шкале
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center flex-column">
        <Grade setGrade={hanldeGrade} />
        <div className="d-flex justify-content-center mt-3">
          <Button
            type="button"
            value="Submit"
            form="form1"
            onClick={onClick}
            className="yellow-button m-1"
          >
            Оценить
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              setGrade();
              props.onHide();
            }}
            className="m-1"
          >
            Закрыть
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RatingTable;
