import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
function VerseOfDay() {
  let [id, setID] = useState("");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");

  // fetch("https://zoobrilka-alice-skill.herokuapp.com/api/poem/today")
  //   .then((response) => response.json())
  //   .then((response) => handleData(response.response));

  function handleData(data) {
    setID(data.id);
    setTitle(data.title);
    setText(data.text);
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <strong className="mb-2">{title}</strong>
      <div></div>
      <p
        style={{
          minHeight: "276px",
          maxHeight: "276px",
          overflow: "hidden",
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </p>

      <Link
        className="yellow-button align-self-end btn btn-warning px-4"
        to={"/poem/" + id}
      >
        Перейти
      </Link>
    </div>
  );
}
export default VerseOfDay;
