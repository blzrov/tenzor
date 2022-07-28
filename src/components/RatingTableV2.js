import React from "react";
import Grade from "./grade/Grade";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./play-icon.png";
import pause from "./pause-icon.png";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { CurrentUser } from "../App";
function RatingTableV2(props) {
  let [data, setData] = React.useState("");
  let [audio, setAudio] = React.useState("");

  React.useEffect(() => {
    fetch(
      "https://zoobrilka-alice-skill.herokuapp.com/api/records?offset=" +
        (props.page - 1) * 10
    )
      .then((response) => response.json())
      .then((response) => handleData(response.response));

    function handleData(data) {
      setData("");
      setData(data);
      console.log(data);
      console.log((props.page - 1) * 10);
    }
  }, [props.page]);

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
            id={elem + 10 * (props.page - 1)}
            audio={audio}
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
      <td>{props.data.ownerName}</td>
      <td>
        <Link
          to={"/poem/" + props.data.poem}
          style={{ textDecoration: "none", color: "black" }}
        >
          {props.data.poemName}
        </Link>
      </td>
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
        id={props.data.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </tr>
  );
}

function PlayOrPause(props) {
  if (props.audio === props.data) return <img src={pause} alt="play"></img>;
  return <img src={play} alt="play"></img>;
}

function MyVerticallyCenteredModal(props) {
  let [grade, setGrade] = React.useState();
  const currentUser = React.useContext(CurrentUser);
  function hanldeGrade(a) {
    setGrade(a);
  }
  const onClick = async () => {
    const data = await currentUser.doVote(props.id, grade);
    console.log(data);
    props.onHide();
  };
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

export default RatingTableV2;
