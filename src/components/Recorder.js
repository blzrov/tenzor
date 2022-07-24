import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/Button";

function Recorder(props) {
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
              <p>
                {status
                  .replace("idle", "Запись начнётся после нажатия на кнопку")
                  .replace("recording", "Запись идёт")
                  .replace("stopped", "Запись остановлена")}
              </p>
              <div className="media-button">
                <Button
                  style={{ fontWeight: "500" }}
                  className="yellow-button btn m-1 px-4"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    startRecording();
                  }}
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
            </div>
            <div>
              <audio src={mediaBlobUrl} controls></audio>
            </div>
            <Button
              onClick={async () => {
                const audioBlob = await fetch(mediaBlobUrl).then((r) =>
                  r.blob()
                );
                const audioFile = new File([audioBlob], "record.wav", {
                  type: "audio/wav",
                });
                const body = new FormData(); // preparing to send to the server

                body.append("record", audioFile);
                body.append("userId", new Date().toString());
                body.append("poemId", props.id);
                let options = {
                  method: "POST",
                  body,
                };
                console.log(body);
                fetch(
                  "https://zoobrilka-alice-skill.herokuapp.com/api/record",
                  options
                )
                  .then((response) => response.json())
                  .then((response) => console.log(response));
              }}
              style={{ fontWeight: "500", background: "#753FFF" }}
              className="btn btn-primary m-1 px-4"
            >
              Опубликовать
            </Button>
          </div>
        )}
      ></ReactMediaRecorder>
    );
  }
}

export default Recorder;
