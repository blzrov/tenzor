import React from "react";
import { useState } from "react";
import RatingTable from "../components/RatingTable";
import RatingTableV2 from "../components/RatingTableV2";
import Pagination from "react-bootstrap/Pagination";

function RatingPage() {
  let [value, setValue] = useState(1);
  let [page, setPage] = useState(1);

  return (
    <div style={{ overflow: "auto", fontWeight: "500" }}>
      <audio id="ratingAudio" src="" style={{ display: "none" }} />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          defaultChecked
          onChange={() => {
            setValue(1);
            setPage(1);
          }}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          <h5>Общий рейтинг пользователей</h5>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onChange={() => {
            setValue(2);
            setPage(1);
          }}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          <h5>Лучшее чтение за неделю</h5>
        </label>
      </div>
      <StupidCode value={value} page={page} />
      <MyPaginator page={page} setPage={setPage} />
    </div>
  );
}

function MyPaginator(props) {
  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => props.setPage(props.page - 1)}
        disabled={props.page - 1 === 0}
      />
      <Pagination.Item active>{props.page}</Pagination.Item>
      <Pagination.Next onClick={() => props.setPage(props.page + 1)} />
    </Pagination>
  );
}

function StupidCode(props) {
  if (props.value === 1) return <RatingTable page={props.page} />;
  if (props.value === 2) return <RatingTableV2 page={props.page} />;
}
export default RatingPage;
