import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import play from "./play-icon.png";
import pause from "./pause-icon.png";
import { CurrentUser } from "../App";

function BestReadOnPage(props) {
  let [data, setData] = React.useState("");
  let [audio, setAudio] = React.useState("");
  const currentUser = useContext(CurrentUser);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const data = await currentUser.getRecords(props.id);
    setData(data);
    console.log(data);
  };

  function changeAudio(url) {
    if (url === audio) setAudio("");
    else setAudio(url);
  }

  if (false) {
    return <div className="mt-5">123</div>;
  }

  return (
    <div className="mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Лучшее прочтение</th>
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
          </tr>
        </thead>
        <tbody>
          <BestReadTableTr
            id={props.id}
            index={1}
            data={data[0]}
            audio={audio}
            setAudio={changeAudio}
          />
          <BestReadTableTr
            id={props.id}
            index={2}
            data={data[1]}
            audio={audio}
            setAudio={changeAudio}
          />
          <BestReadTableTr
            id={props.id}
            index={3}
            data={data[2]}
            audio={audio}
            setAudio={changeAudio}
          />
        </tbody>
      </table>
      <div className="mt-3 d-flex justify-content-end">
        <Link style={{ color: "black" }} to={"/poem" + `/${props.id}/rating`}>
          Посмотреть все
        </Link>
      </div>
    </div>
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
            {props.data.ownerName}
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
      </tr>
    );
}

function PlayOrPause(props) {
  console.log(props.audio);
  if (props.audio == props.data) return <img src={pause} alt="play"></img>;
  return <img src={play} alt="play"></img>;
}

export default BestReadOnPage;
