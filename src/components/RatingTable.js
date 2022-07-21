import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import play from "./play-icon.png";
import Modal from "react-bootstrap/Modal";
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
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              1
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              2
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="option3"
            />
            <label className="form-check-label" htmlFor="inlineRadio3">
              3
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio4"
              value="option4"
            />
            <label className="form-check-label" htmlFor="inlineRadio4">
              4
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio5"
              value="option5"
            />
            <label className="form-check-label" htmlFor="inlineRadio5">
              5
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
