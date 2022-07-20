import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Micro from "./Micro";

const PostIdPage = (props) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ poemId: props.id }),
  };
  let [author, setAuthor] = useState("Такого стихотворения ещё нет :с");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");

  fetch("https://zoobrilka-alice-skill.herokuapp.com/api/getPoem", options)
    .then((response) => response.json())
    .then((response) => handleData(response.response));

  function handleData(data) {
    setAuthor(data.author);
    setTitle(data.title);
    setText(data.text);
  }

  return (
    <Container>
      <div className="row my-5 ">
        <div
          className="col-5  border-bottom border-primary pb-5 mb-5"
          style={{ minWidth: "310px" }}
        >
          <div
            className="d-flex flex-column align-items-center"
            style={{ fontWeight: "500" }}
          >
            <h3 className="">{title}</h3>
            <h4 className="mb-3">{author}</h4>
            <p className="" style={{ whiteSpace: "pre-line" }}>
              {text}
            </p>
          </div>
        </div>
        <div className="col">
          <Micro id={props.id}/>
        </div>
      </div>
    </Container>
  );
};

export default PostIdPage;
