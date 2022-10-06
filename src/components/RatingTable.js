import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ServerControllerContext } from "../App";
import UniversalTr from "./UniversalTr";

function RatingTable(props) {
  let [data, setData] = useState("");
  let [audio, setAudio] = useState("");

  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    getUsersRecords();
  }, [props.page]);
  
  const getUsersRecords = async () => {
    const data = await serverController.getUsersRecords((props.page - 1) * 10);
    if (!data) return;
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
          backgroundAttachment: "fixed",
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
          <th>Рейтинг</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(data.length).keys()].map((elem) => (
          <UniversalTr
            key={elem}
            index={elem + 10 * (props.page - 1)}
            name={data[elem].records[0].ownerName}
            title={data[elem].records[0].poemName}
            audio={audio}
            url={data[elem].records[0].url}
            id2={data[elem].records[0].id}
            userRating={data[elem].userRating}
            setAudio={changeAudio}
            handleData={getUsersRecords}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default RatingTable;
