import React, {  useState } from "react";
import MyVCModalGrade from "./MyVCModalGrade";
import Button from "react-bootstrap/Button";
import play from "./img/play-icon.png";
import pause from "./img/pause-icon.png";

export default function UniversalTr(props) {
  const [modalShow, setModalShow] = useState(false);
  //   if (props.data.records.length === 0) return;

  return (
    <tr style={{ verticalAlign: "middle" }}>
      <td>{props.index + 1}</td>
      <td>{props.name}</td>
      <td>
        {/* <Link
          className="hover-underline"
          to={"/poem/" + props.data.records[0].poem}
          style={{ textDecoration: "none", color: "black" }}
        >
          {props.title}
        </Link> */}
        {props.title}
      </td>
      <td>
        <button
          style={{ border: "none", backgroundColor: "white" }}
          onClick={() => {
            props.setAudio(props.url);
          }}
        >
          <PlayOrPause audio={props.audio} data={props.url} />
        </button>
      </td>
      <td>{props.userRating}</td>
      <td>
        <Button className="yellow-button" onClick={() => setModalShow(true)}>
          Оценить
        </Button>
      </td>
      <MyVCModalGrade
        id={props.id2}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleData={props.handleData}
      />
    </tr>
  );
}

function PlayOrPause(props) {
    if (props.audio === props.data) return <img src={pause} alt="play"/>
    return <img src={play} alt="play"/>
  }