import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Poem from "../components/Poem";
import Micro from "../components/Micro";
import BestReadOnPage from "../components/BestReadOnPage";
import Container from "react-bootstrap/esm/Container";

export default function PoemPage() {
  const [title, setTitle] = useState("");
  const { id } = useParams();

  useEffect(() => {}, []);

  if (!id) return <></>;

  return (
    <div className="row">
      <div className="col-5 mb-5 pb-5 border-bottom border-primary minW">
        <div
          className="d-flex flex-column align-items-center"
          style={{ fontWeight: "500" }}
        >
          <Poem id={id} setTitle={setTitle} />
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
}
