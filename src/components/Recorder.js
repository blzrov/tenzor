import React, { useContext } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { CurrentUser } from "../App";

function Recorder(props) {
  const currentUser = useContext(CurrentUser);
  let [statusRec, setStatusRec] = React.useState("Опубликовать");

  const onClick = async (mediaBlobUrl) => {
    if (statusRec === "Запись отправлена") {
      alert("Эта запись уже отправлена");
      return;
    }
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "record.wav", {
      type: "audio/wav",
    });
    setStatusRec("Запись отправлена");
    const data = await currentUser.savePoemRecord(
      audioFile,
      props.id,
      props.title
    );
    console.log(data);
  };

  if (!props.check)
    return (
      <div className="media-button">
        <Button
          className="yellow-button btn btn-warning m-1 btn m-1 px-4 disabled "
          disabled
        >
          Начать запись
        </Button>
      </div>
    );
  else {
    return (
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <div>
              <div className="d-flex align-items-center m-2">
                <MySpinner state={status === "recording"} />
                <span className="px-3">
                  {status
                    .replace("idle", "Запись начнётся после нажатия на кнопку")
                    .replace(
                      "recording",
                      "Для отстановки нажмите остановить запись"
                    )
                    .replace(
                      "stopped",
                      "Запись остановлена, нажмите play для прослушивания"
                    )}
                </span>
              </div>

              <div className="media-button">
                <Button
                  style={{ fontWeight: "500" }}
                  className="yellow-button btn m-1 px-4"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setStatusRec("Опубликовать");
                    startRecording();
                  }}
                  disabled={status == "recording"}
                >
                  Начать запись
                </Button>
                <Button
                  style={{ fontWeight: "500" }}
                  className="btn btn-danger m-1"
                  onClick={stopRecording}
                  disabled={status == "idle" || status == "stopped"}
                >
                  Остановить запись
                </Button>
              </div>
            </div>
            <div>
              <audio src={mediaBlobUrl} controls></audio>
            </div>
            <Button
              onClick={() => onClick(mediaBlobUrl)}
              style={{ fontWeight: "500", background: "#753FFF" }}
              className="btn btn-primary m-1 px-4"
              disabled={!mediaBlobUrl || statusRec == "Запись отправлена"}
            >
              {statusRec}
            </Button>
          </div>
        )}
      ></ReactMediaRecorder>
    );
  }
}

function MySpinner(props) {
  if (props.state) {
    return <Spinner animation="grow" variant="danger" size="sm" />;
  }
}

export default Recorder;
