import React from "react";
import { useState } from "react";
import Recorder from "./Recorder";
import BestReadOnPage from "./BestReadOnPage";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";


function Micro(props) {
  let [checkbox, setCheckbox] = useState(false);
  function Check() {
    setCheckbox(!checkbox);
  }
  return (
    <Container>
      <div className="row">
        <div className="col" style={{ fontWeight: "500" }}>
          <h3>Аудиодорожка</h3>
          <p>
            Нажмите кнопку “Записать”, если хотите записать вариант прочтения
            данного стихотворения.
          </p>
          <p>Вы не записали ещё ни одной дорожки.</p>
          <Form>
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  style={{ color: "#545454" }}
                  onChange={Check}
                  type={type}
                  id={`default-${type}`}
                  label={`Согласен с правилами использования сайта`}
                />
              </div>
            ))}
          </Form>
          <Recorder check={checkbox} />
          <BestReadOnPage id={props.id} />
        </div>
      </div>
    </Container>
  );
}
export default Micro;
