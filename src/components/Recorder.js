import React, { useContext } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ServerControllerContext } from "../App";

function Recorder(props) {
  const serverController = useContext(ServerControllerContext);
  let [statusRec, setStatusRec] = React.useState("Опубликовать");

  const savePoemRecord = async (mediaBlobUrl) => {
    if (statusRec === "Запись отправлена") {
      alert("Эта запись уже отправлена");
      return;
    }
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "record.wav", {
      type: "audio/wav",
    });
    const data = await serverController.savePoemRecord(
      audioFile,
      props.id,
      props.title
    );
    setStatusRec(data);
  };

  if (!props.isAgree)
    return (
      <div className="media-button">
        <Button className="btn btn-warning m-1 px-4 yellow-button disabled ">
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
              <div className="m-2 d-flex align-items-center">
                {status === "recording" ? (
                  <Spinner animation="grow" variant="danger" size="sm" />
                ) : null}
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
                  className="btn m-1 px-4 yellow-button"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setStatusRec("Опубликовать");
                    startRecording();
                  }}
                  disabled={status === "recording"}
                >
                  Начать запись
                </Button>
                <Button
                  style={{ fontWeight: "500" }}
                  className="btn btn-danger m-1"
                  onClick={stopRecording}
                  disabled={status === "idle" || status === "stopped"}
                >
                  Остановить запись
                </Button>
              </div>
            </div>
            <div>
              <audio src={mediaBlobUrl} controls></audio>
            </div>
            <Button
              onClick={() => savePoemRecord(mediaBlobUrl)}
              style={{ fontWeight: "500", background: "#753FFF" }}
              className="btn btn-primary m-1 px-4"
              disabled={
                !mediaBlobUrl ||
                statusRec === "Запись отправлена" ||
                statusRec === "Войдите в аккаунт"
              }
            >
              {statusRec}
            </Button>
          </div>
        )}
      ></ReactMediaRecorder>
    );
  }
}

export default Recorder;
