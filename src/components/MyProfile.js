import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import RatingTableOnVerse from "./RatingTableOnVerse";
import { CurrentUser } from "../App";
import play from "./play-icon.png";
import { Button } from "bootstrap";
function MyProfile() {
  const currentUser = useContext(CurrentUser);
  let [data, setData] = useState([]);
  let [audio, setAudio] = React.useState("");
  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const data = await currentUser.getUserRecords(currentUser.id);
    setData(data);
  };

  function changeAudio(url) {
    if (url === audio) setAudio("");
    else setAudio(url);
  }
  console.log(data);

  function remove(id) {
    currentUser.removePoemRecord(id);
  }

  return (
    <Container>
      <div className="row">
        <div className="col">
          <h4>{currentUser.realName}</h4>
          <h5>Мои записи</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Название</th>
                <th scope="col">
                  <audio
                    src={audio}
                    controls
                    autoPlay
                    style={{ display: "none" }}
                  />
                </th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(data.length).keys()].map((elem) => (
                <BestReadTableTr
                  key={elem}
                  data={data[elem]}
                  setAudio={changeAudio}
                  remove={remove}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

function BestReadTableTr(props) {
  if (!props.data) {
    return (
      <tr>
        <th scope="row">Никто пока не записал прочтение :с</th>
        <td></td>
        <td></td>
      </tr>
    );
  }
  if (props.data)
    return (
      <tr>
        <th scope="row">
          <span className="" style={{ marginRight: "20px" }}>
            {props.data.poemName}
          </span>
        </th>
        <td>
          <button
            style={{ border: "none", backgroundColor: "white" }}
            onClick={() => {
              props.setAudio(props.data.url);
            }}
          >
            <img src={play} alt="play"></img>
          </button>
        </td>
        <td>{props.data.rating}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              console.log(props.data.id)
              props.remove(props.data.id);
            }}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
}
export default MyProfile;