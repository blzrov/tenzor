import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Micro from "../components/Micro";
import { ServerControllerContext } from "../App";
import Container from "react-bootstrap/esm/Container";
import BestReadOnPage from "../components/BestReadOnPage";

const PoemPage = () => {
  let [author, setAuthor] = useState("Такого стихотворения ещё нет :с");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  const { id } = useParams();
  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    getPoem();
  }, []);

  const getPoem = async () => {
    const data = await serverController.getPoem(id);
    setAuthor(data.author.firstName + " " + data.author.lastName);
    setTitle(data.title);
    setText(data.text);
  };

  if (!id) return <></>;

  return (
    <div className="row">
      <div className="col-5 mb-5 pb-5 border-bottom border-primary minW">
        <div
          className="d-flex flex-column align-items-center"
          style={{ fontWeight: "500" }}
        >
          <div>
            <h3>{title}</h3>
            <h4 className="mb-3">{author}</h4>
            <p style={{ whiteSpace: "pre-line" }}>{text}</p>
          </div>
        </div>
      </div>
      <div className="col ">
        <Container
          style={{ position: "sticky", top: "2rem", fontWeight: "500" }}
        >
          <Micro id={id} title={title} />
          <BestReadOnPage id={id} />
        </Container>
      </div>
    </div>
  );
};

export default PoemPage;
