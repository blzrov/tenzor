import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ServerControllerContext } from "../App";

function VerseOfDay() {
  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    getPoem();
  }, []);

  const [poem, setPoem] = useState({});
  const getPoem = async () => {
    const data = await serverController.getPoem("today");
    if (!data) return;
    setPoem(data);
  };

  return (
    <div className="d-flex flex-column align-items-center ">
      <strong className="mb-2">{poem.title}</strong>
      <p
        style={{
          minHeight: "276px",
          maxHeight: "276px",
          overflow: "hidden",
          whiteSpace: "pre-line",
        }}
      >
        {poem.text}
      </p>

      <Link
        className="btn align-self-end px-4 yellow-button"
        to={"/poem/" + poem.id}
      >
        Перейти
      </Link>
    </div>
  );
}
export default VerseOfDay;
