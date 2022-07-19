import React from "react";
import { Link } from "react-router-dom";
function VerseOfDay() {
  return (
    <div className="d-flex flex-column align-items-center">
      <strong className="mb-2">Название</strong>
      <p style={{ maxHeight: "276px", overflow: "hidden" }}>
        В те дни, когда мне были новы
        <br />
        Все впечатленья бытия –<br />
        И взоры дев, и шум дубровы,
        <br />
        И ночью пенье соловья, –<br />
        Когда возвышенные чувства,
        <br />
        Свобода, слава и любовь
        <br />
        И вдохновенные искусства
        <br />
        Так сильно волновали кровь, –<br />
        Часы надежд и наслаждений
        <br />
        Тоской внезапной осеня,
        <br />
        Тогда какой-то злобный гений
        <br />
        Стал тайно навещать меня.
      </p>
      <Link className="align-self-end btn btn-warning" to="/example">
        Читать далее
      </Link>
    </div>
  );
}
export default VerseOfDay;
