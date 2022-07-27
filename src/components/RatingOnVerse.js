import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import RatingTableOnVerse from "./RatingTableOnVerse";
import { CurrentUser } from "../App";
function RatingOnVerse() {
  let [author, setAuthor] = useState("Такого стихотворения ещё нет :с");
  let [title, setTitle] = useState("");
  let [value, setValue] = useState(1);
  const { id } = useParams();

  const currentUser = useContext(CurrentUser);

  useEffect(() => {
    handleData();
  }, []);

  if (!id) return <></>;

  const handleData = async () => {
    const data = await currentUser.getPoem(id);
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

      <RatingTableOnVerse value={value} title={title} id={id} />
    </Container>
  );
}
export default RatingOnVerse;
