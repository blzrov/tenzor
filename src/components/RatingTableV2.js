import React, { useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import UniversalTr from "./UniversalTr";

function RatingTableV2(props) {
  let [data, setData] = useState("");
  let [audio, setAudio] = useState("");
  let [up, setUP] = useState("");

  React.useEffect(() => {
    fetch(
      "https://zoobrilka-alice-skill.herokuapp.com/api/records?offset=" +
        (props.page - 1) * 10
    )
      .then((response) => response.json())
      .then((response) => handleData(response.response));

    function handleData(data) {
      setData("");
      setData(data);
    }
  }, [props.page, up]);

  function changeAudio(url) {
    if (url === audio) setAudio("");
    else setAudio(url);
    console.log(url);
  }

  function handleData() {
    setUP(new Date().toString());
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
            key={elem}
            index={elem + 10 * (props.page - 1)}
            audio={audio}
            setAudio={changeAudio}
            handleData={handleData}
            name={data[elem].ownerName}
            url={data[elem].url}
            id2={data[elem].id}
            userRating={data[elem].rating}
            title={data[elem].poemName}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default RatingTableV2;
