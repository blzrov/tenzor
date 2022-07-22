import React from "react";
import g1 from "./1.png";
import g2 from "./2.png";
import g3 from "./3.png";
import g4 from "./4.png";
import g5 from "./5.png";
function Grade() {
  return (
    <form className="d-flex justify-content-center " id="form1">
      <div className="form-check form-check-inline mx-2 mb-3 p-0 position-relative ">
        <input
          className="form-check-input position-absolute"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="option1"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            bottom: "-20px",
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          <img src={g1} alt="g" style={{ maxWidth: "100%" }}></img>
        </label>
      </div>
      <div className="form-check form-check-inline mx-2 mb-3 p-0 position-relative">
        <input
          className="form-check-input position-absolute"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="option2"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            bottom: "-20px",
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          <img src={g2} alt="g" style={{ maxWidth: "100%" }}></img>
        </label>
      </div>
      <div className="form-check form-check-inline mx-2 mb-3 p-0 position-relative ">
        <input
          className="form-check-input position-absolute "
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio3"
          value="option3"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            bottom: "-20px",
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio3">
          <img src={g3} alt="g" style={{ maxWidth: "100%" }}></img>
        </label>
      </div>
      <div className="form-check form-check-inline mx-2 mb-3 p-0  position-relative">
        <input
          className="form-check-input position-absolute "
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio4"
          value="option4"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            bottom: "-20px",
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio4">
          <img src={g4} alt="g" style={{ maxWidth: "100%" }}></img>
        </label>
      </div>
      <div className="form-check form-check-inline mx-2 mb-3 p-0 position-relative">
        <input
          className="form-check-input position-absolute "
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio5"
          value="option5"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            bottom: "-20px",
          }}
        />
        <label className="form-check-label" htmlFor="inlineRadio5">
          <img src={g5} alt="g" style={{ maxWidth: "100%" }}></img>
        </label>
      </div>
    </form>
  );
}
export default Grade;
