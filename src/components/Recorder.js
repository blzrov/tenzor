import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/Button";

function Recorder(props) {
  if (!props.check)
    return (
      <div>
        <Button
          className="yellow-button btn btn-warning m-1 btn m-1 px-4 disabled "
          disabled
        >
          Начать запись
        </Button>
      </div>
    );
  else {
    async function UploadAudio(myFile) {
      console.log(myFile);
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record: { myFile }, userId: 25, poemId: 1 }),
      };
      fetch("https://zoobrilka-alice-skill.herokuapp.com/api/record", options)
        .then((response) => response.json())
        .then((response) => console.log(response));
      //
    }
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
              <Button
                style={{ fontWeight: "500" }}
                className="yellow-button btn m-1 px-4"
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
              onClick={async () => {
                const audioBlob = await fetch(mediaBlobUrl).then((r) =>
                  r.blob()
                );
                const audioFile = new File([audioBlob], "record.wav", {
                  type: "audio/wav",
                });
                const formData = new FormData(); // preparing to send to the server

                formData.append("record", audioFile); // preparing to send to the server
                let options = {
                  method: "POST",
                  body: {
                    record: formData,
                    userId: 25,
                    poemId: 1,
                  },
                };
                console.log(formData);
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
