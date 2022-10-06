import React, { useContext, useState } from "react";
import Grade from "./img/grade/Grade";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ServerControllerContext } from "../App";

export default function MyVCModalGrade(props) {
  let [grade, setGrade] = useState();
  const serverController = useContext(ServerControllerContext);

  const doVote = async () => {
    await serverController.doVote(props.id, grade);
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
            onClick={doVote}
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
