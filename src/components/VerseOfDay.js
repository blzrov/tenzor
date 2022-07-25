import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CurrentUser } from "../App";
function VerseOfDay() {
  const currentUser = useContext(CurrentUser);

  let [id, setID] = useState("");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const data = await currentUser.getPoem("today");
    setID(data.id);
    setTitle(data.title);
    setText(data.text);
  };
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
