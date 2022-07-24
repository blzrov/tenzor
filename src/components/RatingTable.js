import React from "react";
import Grade from "./grade/Grade";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./play-icon.png";
import Modal from "react-bootstrap/Modal";
function RatingTable(props) {
  let [data, setData] = React.useState("");
  let [audio, setAudio] = React.useState("");

  fetch("https://zoobrilka-alice-skill.herokuapp.com/api/users/records")
    .then((response) => response.json())
    .then((response) => handleData(response.response));

  function handleData(data) {
    setData(data);
  }
  function changeAudio(url) {
    //setData(setAudio(url));
    console.log(url);
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
            <audio src="" autoPlay />
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
            data={data[elem]}
            setAudio={changeAudio}
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
      <td>{props.data.userId}</td>
      <td>id : {props.data.records[0].poem}</td>
      <td>
        <button
          style={{ border: "none" }}
          onClick={() => {
            props.setAudio(props.data.records[0].url);
          }}
        >
          <img src={play} alt="play"></img>
        </button>
      </td>
      <td>{props.data.records[0].rating}</td>
      <td>
        <Button className="yellow-button" onClick={() => setModalShow(true)}>
          Оценить
        </Button>
      </td>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </tr>
  );
}

function MyVerticallyCenteredModal(props) {
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
        <Grade />
        <div className="d-flex justify-content-center mt-3">
          <Button
            type="submit"
            value="Submit"
            form="form1"
            onClick={props.onHide}
            className="yellow-button m-1"
          >
            Оценить
          </Button>

          <Button variant="secondary" onClick={props.onHide} className="m-1">
            Закрыть
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RatingTable;
