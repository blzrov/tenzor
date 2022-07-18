import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import RatingTable from "./components/RatingTable";
function Rating() {
  let [value, setValue] = useState(1);
  function a(num) {
    setValue(num);
    console.log(value);
  }
  return (
    <Container
      className="mt-5"
      style={{ overflow: "scroll", fontWeight: "500" }}
    >
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          defaultChecked
          onClick={() => {
            a(1);
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
          onClick={() => {
            a(2);
          }}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          <h5>Лучшее чтение за неделю</h5>
        </label>
      </div>
      <RatingTable id={value} />
    </Container>
  );
}
export default Rating;
