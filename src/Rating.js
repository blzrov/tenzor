import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import RatingTable from "./components/RatingTable";
import RatingTableV2 from "./components/RatingTableV2";
function Rating() {
  let [value, setValue] = useState(1);

  return (
    <Container className="mt-5" style={{ overflow: "auto", fontWeight: "500" }}>
      <audio id="ratingAudio" src="" style={{ display: "none" }} />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          defaultChecked
          onChange={() => {
            setValue(1);
          }}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          <h5>Общий рейтинг пользователей</h5>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onChange={() => {
            setValue(2);
          }}
          
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          <h5>Лучшее чтение за неделю</h5>
        </label>
      </div>
      <StupidCode value={value} />
    </Container>
  );
}

function StupidCode(props) {
  if (props.value == 1) return <RatingTable />;
  if (props.value == 2) return <RatingTableV2 />;
}
export default Rating;
