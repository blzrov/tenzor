import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/Button";
function Recorder(props) {
  if (!props.check)
    return (
      <div>
        <Button className="btn btn-warning m-1 btn m-1 px-4 disabled" disabled>
          Начать запись
        </Button>
      </div>
    );
  else
    return (
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <div>
              <p>
                {status.replace(
                  "idle",
                  "Запись начнётся после нажатия на кнопку"
                )}
              </p>
              <Button
                style={{ fontWeight: "500" }}
                variant="warning"
                className="btn m-1 px-4"
                onClick={startRecording}
              >
                Начать запись
              </Button>
              <Button
                style={{ fontWeight: "500" }}
                className="btn btn-danger m-1"
                onClick={stopRecording}
              >
                Остановить запись
              </Button>
            </div>
            <div>
              <audio src={mediaBlobUrl} controls></audio>
            </div>
            <Button
              style={{ fontWeight: "500" }}
              className="btn btn-primary m-1 px-4"
            >
              Опубликовать
            </Button>
          </div>
        )}
      ></ReactMediaRecorder>
    );
}

export default Recorder;