import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./play-icon.png";
import Modal from "react-bootstrap/Modal";
import grade1 from "../img/grade1.svg";
import grade2 from "../img/grade2.svg";
import grade3 from "../img/grade3.svg";
import grade4 from "../img/grade4.svg";
import grade5 from "../img/grade5.svg";
import selected1 from "../img/selected1.svg";

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
        {[...Array(15).keys()].map((elem) => (
          <RatingTableTr key={elem} id={elem} />
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
      <td>Фамилия Имя</td>
      <td>У лукоморья дуб зеленый</td>
      <td>
        <button style={{ border: "none" }}>
          <img src={play} alt="play"></img>
        </button>
      </td>
      <td>5</td>
      <td>
        <Button variant="warning" onClick={() => setModalShow(true)}>
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
  //меняет при клике фото оценки
  function choice(e) {
    e.target.setAttribute( 'src', {selected1});
    e.target.setAttribute('alt', 'selected');
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
        <form className="d-flex justify-content-center " id="form1">
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="inlineRadio1" >
              <img 
                src={grade1}
                alt="grade-1"
                width={50}
                onClick={choice}
              />
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                style={{display: "none"}}
              />
              <p className="grade" style={{textAlign: "center"}}>1</p>
            </label>
          </div>
          <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineRadio2">
              <img 
                src={grade2}
                alt="grade-2"
                width={50}
                onClick={choice}
              />
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
                style={{display: "none"}}
              />
              <p className="grade" style={{textAlign: "center"}}>2</p>
            </label>
          </div>
          <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineRadio3">
              <img 
                src={grade3}
                alt="grade-3"
                width={50}
                onClick={choice}
              />
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
                style={{display: "none"}}
              />
              <p className="grade" style={{textAlign: "center"}}>3</p>
            </label>
          </div>
          <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineRadio4">
              <img 
                src={grade4}
                alt="grade-4"
                width={50}
                onClick={choice}
              />
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio4"
                value="option4"
                style={{display: "none"}}
              />
              <p className="grade" style={{textAlign: "center"}}>4</p>
            </label>
          </div>
          <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineRadio5">
              <img 
                src={grade5}
                alt="grade-5"
                width={50}
                onClick={choice}
              />
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio5"
                value="option5"
                style={{display: "none"}}
              />
              <p className="grade" style={{textAlign: "center"}}>5</p>
            </label>
          </div>
        </form>
        <div className="d-flex justify-content-center mt-3">
          <Button
            type="submit"
            value="Submit"
            form="form1"
            variant="warning"
            onClick={props.onHide}
            className="m-1"
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
