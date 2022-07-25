import React from "react";
import Grade from "./grade/Grade";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./play-icon.png";
import Modal from "react-bootstrap/Modal";
function RatingTableOnVerse(props) {
  //to do id 2

  let [data, setData] = React.useState("");
  let [audio, setAudio] = React.useState("");
  React.useEffect(() => {
    fetch("https://zoobrilka-alice-skill.herokuapp.com/api/records/" + props.id)
      .then((response) => response.json())
      .then((response) => handleData(response.response));

    function handleData(data) {
      setData(data);
    }
  }, []);
  function changeAudio(url) {
    if (url == audio) setAudio("");
    else setAudio(url);
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
            <audio src={audio} controls autoPlay style={{ display: "none" }} />
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
      <td>{props.data.owner}</td>
      <td>{props.title}</td>
      <td>
        <button
          style={{ border: "none" }}
          onClick={() => {
            props.setAudio(props.data.url);
          }}
        >
          <img src={play} alt="play"></img>
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
      />
    </tr>
  );
}

function MyVerticallyCenteredModal(props) {
  let [grade, setGrade] = React.useState();
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
            onClick={() => {
              const body = {
                userId: Math.random().toString().split(".")[1].toString(),
                vote: grade,
              };

              let options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              };
              fetch(
                "https://zoobrilka-alice-skill.herokuapp.com/api/record/" +
                  props.id +
                  "/vote",
                options
              )
                .then((response) => response.json())
                .then((response) => console.log(response));
              props.onHide();
            }}
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

export default RatingTableOnVerse;
