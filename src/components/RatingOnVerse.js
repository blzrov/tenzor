import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Pagination from "react-bootstrap/Pagination";
import RatingTableOnVerse from "./RatingTableOnVerse";
import { ServerControllerContext } from "../App";
function RatingOnVerse() {
  let [author, setAuthor] = useState("Такого стихотворения ещё нет :с");
  let [title, setTitle] = useState("");
  let [value, setValue] = useState(1);
  let [page, setPage] = useState(1);
  const { id } = useParams();

  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    handleData();
  }, []);

  if (!id) return <></>;

  const handleData = async () => {
    const data = await serverController.getPoem(id);
    setAuthor(data.author.firstName + " " + data.author.lastName);
    setTitle(data.title);
  };

  function a(num) {
    setValue(num);
    console.log(value);
  }

  return (
    <Container className="mt-5" style={{ overflow: "auto", fontWeight: "500" }}>
      <audio id="ratingAudio" src="" style={{ display: "none" }} />
      <Link
        to={"/poem/" + id}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h4>
          {author} - {title}
        </h4>
      </Link>

      <RatingTableOnVerse value={value} title={title} id={id} page={page} />
      <AdvancedExample page={page} setPage={setPage} />
    </Container>
  );
}

function AdvancedExample(props) {
  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => props.setPage(props.page - 1)}
        disabled={props.page - 1 === 0}
      />
      <Pagination.Item active>{props.page}</Pagination.Item>
      <Pagination.Next onClick={() => props.setPage(props.page + 1)} />
    </Pagination>
  );
}
export default RatingOnVerse;
