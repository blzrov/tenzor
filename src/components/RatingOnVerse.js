import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import RatingTableOnVerse from "./RatingTableOnVerse";
function RatingOnVerse(props) {
  let [author, setAuthor] = useState("Такого стихотворения ещё нет :с");
  let [title, setTitle] = useState("");
  fetch("https://zoobrilka-alice-skill.herokuapp.com/api/poem/" + props.id)
    .then((response) => response.json())
    .then((response) => handleData(response.response));

  function handleData(data) {
    setAuthor(data.author.firstName + " " + data.author.lastName);
    setTitle(data.title);
  }
  let [value, setValue] = useState(1);
  function a(num) {
    setValue(num);
    console.log(value);
  }
  return (
    <Container
      className="mt-5"
      style={{ overflow: "auto", fontWeight: "500" }}
    >
      <audio id="ratingAudio" src="" style={{ display: "none" }} />
      <h4>
        {author} - {title}
      </h4>
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
          <h6>Общий рейтинг пользователей</h6>
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
          <h6>Лучшее чтение за неделю</h6>
        </label>
      </div>
      <RatingTableOnVerse value={value} title={title} />
    </Container>
  );
}
export default RatingOnVerse;
