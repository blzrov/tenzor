import React from "react";
import Container from "react-bootstrap/esm/Container";
import Micro from "./Micro";

const PostIdPage = (props) => {
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
            <h3 className="">Название стиха с id {props.id}</h3>
            <h4 className="mb-3">Автор стиха id {props.id}</h4>
            <p className="">Стих с id {props.id}</p>
          </div>
        </div>
        <div className="col">
          <Micro />
        </div>
      </div>
    </Container>
  );
};

export default PostIdPage;
