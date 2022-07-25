import React from "react";
import { Link } from "react-router-dom";
import play from "./play-icon.png";
function BestReadOnPage(props) {
  let [data, setData] = React.useState("");
  let [audio, setAudio] = React.useState("");
  React.useEffect(() => {
    fetch("https://zoobrilka-alice-skill.herokuapp.com/api/records/" + props.id)
      .then((response) => response.json())
      .then((response) => handleData(response.response));

    function handleData(data) {
      setData(data);
    }
  }, [props]);
  function changeAudio(url) {
    if (url == audio) setAudio("");
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
            setAudio={changeAudio}
          />
          <BestReadTableTr
            id={props.id}
            index={2}
            data={data[1]}
            setAudio={changeAudio}
          />
          <BestReadTableTr
            id={props.id}
            index={3}
            data={data[2]}
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
            {props.data.owner}
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
      </tr>
    );
}

export default BestReadOnPage;
