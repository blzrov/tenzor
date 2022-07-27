import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import RatingTableOnVerse from "./RatingTableOnVerse";
import { CurrentUser } from "../App";
import play from "./play-icon.png";
import pause from "./pause-icon.png";
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
    <Container className="mt-5">
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
                    onEnded={() => {
                      changeAudio("");
                    }}
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
                  audio={audio}
                />
              ))}
            </tbody>
          </table>
          <Link
            to="/"
            className="btn btn-light"
            onClick={() => {
              currentUser.signOut();
            }}
          >
            Выйти
          </Link>
        </div>
      </div>
    </Container>
  );
}

function BestReadTableTr(props) {
  if (!props.data) {
    return (
      <tr>
        <th scope="row">У вас нет записей</th>
        <td></td>
        <td></td>
      </tr>
    );
  }
  if (props.data)
    return (
      <tr style={{ verticalAlign: "middle" }}>
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
            <PlayOrPause audio={props.audio} data={props.data.url} />
          </button>
        </td>
        <td>{props.data.rating}</td>
        <td>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              console.log(props.data.id);
              props.remove(props.data.id);
            }}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
}

function PlayOrPause(props) {
  console.log(props.audio);
  if (props.audio == props.data) return <img src={pause} alt="play"></img>;
  return <img src={play} alt="play"></img>;
}
export default MyProfile;
