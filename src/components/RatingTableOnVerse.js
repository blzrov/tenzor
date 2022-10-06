import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { ServerControllerContext } from "../App";
import UniversalTr from "./UniversalTr";

function RatingTableOnVerse(props) {
  //to do id 2

  let [data, setData] = useState("");
  let [audio, setAudio] = useState("");

  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    getPoemRecord();
  }, [props.page]);

  const getPoemRecord = async () => {
    const data = await serverController.getPoemRecord(
      props.id,
      (props.page - 1) * 10
    );
    setData(data);
  };

  function changeAudio(url) {
    if (url === audio) setAudio("");
    else setAudio(url);
  }

  return (
    <Table className="border-primary">
      <thead
        style={{
          background:
            "linear-gradient(256.02deg, #4E22BC -10.04%, #8063A5 93.08%)",
          border: "1px solid #000000",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          color: "white",
        }}
      >
        <tr style={{ lineHeight: "40px" }}>
          <th>№</th>
          <th>Имя пользователя</th>
          <th>Стихотворение</th>
          <th>
            <audio
              src={audio}
              controls
              onEnded={() => {
                changeAudio("");
              }}
              autoPlay
              style={{ display: "none" }}
            />
          </th>
          <th>Оценка</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(data.length).keys()].map((elem) => (
          <UniversalTr
            title={props.title}
            audio={audio}
            data={data[elem]}
            setAudio={changeAudio}
            handleData={getPoemRecord}
            //
            key={elem}
            index={elem + 10 * (props.page - 1)}
            name={data[elem].ownerName}
            url={data[elem].url}
            id2={data[elem].id}
            userRating={data[elem].rating}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default RatingTableOnVerse;
