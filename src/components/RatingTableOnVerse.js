import React, { useContext, useState, useEffect } from "react";

import Grade from "./img/grade/Grade";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./img/play-icon.png";
import pause from "./img/pause-icon.png";
import Modal from "react-bootstrap/Modal";
import { ServerControllerContext } from "../App";

function RatingTableOnVerse(props) {
  //to do id 2

  let [data, setData] = useState("");
  let [audio, setAudio] = useState("");

  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    handleData();
  }, [props.page]);

  const handleData = async () => {
    const data = await serverController.getPoemRecord(
      props.id,
      (props.page - 1) * 10
    );
    setData(data);
  };
  function changeAudio(url) {
    if (url === audio) setAudio("");
    else setAudio(url);
    console.log(url);
  }
  return (
    <Table className="border-primary">
      <thead
        style={{
          background:
            "linear-gradient(256.02deg, #4E22BC -10.04%, #8063A5 93.08%)",
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
          <th>Оценка</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(data.length).keys()].map((elem) => (
          <RatingTableTr
            key={elem}
            id={elem}
            title={props.title}
            audio={audio}
            data={data[elem]}
            setAudio={changeAudio}
            handleData={handleData}
          />
        ))}
      </tbody>
    </Table>
  );
}

function RatingTableTr(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <tr style={{ verticalAlign: "middle" }}>
      <td>{props.id + 1}</td>
      <td>{props.data.ownerName}</td>
      <td>{props.title}</td>
      <td>
        <button
          style={{ border: "none", backgroundColor: "white" }}
          onClick={() => {
            props.setAudio(props.data.url);
          }}
        >
          <PlayOrPause audio={props.audio} data={props.data.url} />
        </button>
      </td>
      <td>{props.data.rating}</td>
      <td>
        <Button className="yellow-button" onClick={() => setModalShow(true)}>
          Оценить
        </Button>
      </td>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.data.id}
        handleData={props.handleData}
      />
    </tr>
  );
}
function PlayOrPause(props) {
  console.log(props.audio);
  if (props.audio == props.data) return <img src={pause} alt="play"></img>;
  return <img src={play} alt="play"></img>;
}

function MyVerticallyCenteredModal(props) {
  let [grade, setGrade] = useState();
  const serverController = useContext(ServerControllerContext);

  const onClick = async () => {
    const data = await serverController.doVote(props.id, grade);
    console.log(data);
    props.onHide();
    props.handleData();
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
          Оцените прочтение по 5-бальной шкале
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center flex-column">
        <Grade setGrade={hanldeGrade} />
        <div className="d-flex justify-content-center mt-3">
          <Button
            type="button"
            value="Submit"
            form="form1"
            variant="warning"
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

export default RatingTableOnVerse;
