import React, { useState, useEffect, useContext } from "react";
import { ServerControllerContext } from "../App";

function Poem(props) {
  const serverController = useContext(ServerControllerContext);
  let [author, setAuthor] = useState("Такого стихотворения ещё нет :с");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");

  useEffect(() => {
    getPoem();
  }, []);

  const getPoem = async () => {
    const data = await serverController.getPoem(props.id);
    setAuthor(data.author.firstName + " " + data.author.lastName);
    setTitle(data.title);
    if (props.setTitle) props.setTitle(data.title);
    setText(data.text);
  };

  return (
    <div>
      <h3>{title}</h3>
      <h4 className="mb-3">{author}</h4>
      <p style={{ whiteSpace: "pre-line" }}>{text}</p>
    </div>
  );
}

export default Poem;
