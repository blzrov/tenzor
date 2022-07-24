import React from "react";
import Container from "react-bootstrap/esm/Container";
import VerseOfDay from "./components/VerseOfDay";
import AliceIcon from "./components/Frame62.png";
function Home() {
  let [data, setData] = React.useState("");

  fetch("https://zoobrilka-alice-skill.herokuapp.com/api/users/records")
    .then((response) => response.json())
    .then((response) => handleData(response.response));

  function handleData(data) {
    setData(data);
    console.log(data);
  }
  return (
    <Container>
      <div
        className="row text-white p-5 my-2 mt-5"
        style={{
          background:
            "linear-gradient(256.02deg, #4E22BC -10.04%, #8063A5 93.08%)",
          borderRadius: "30px",
          minWidth: "310px",
        }}
      >
        <div className="col">
          <div>
            <h1 className="h1-count">34 590</h1>
            <p>стихотворений по разным темам</p>
          </div>
        </div>
        <div className="col">
          <div>
            <h2>Заучивание и прослушивание стихотворений с Алисой</h2>
            <p>легко и просто для любого возраста</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col my-3" style={{ minWidth: "310px" }}>
          <div className="home-item p-4 px-5" style={{ lineHeight: "23px" }}>
            <h3 className="text-center mb-3">Рейтинг</h3>
            <table className="table">
              <tbody>
                {[...Array(data.length).keys()].map((elem) => (
                  <HomeTableTr key={elem} id={elem} data={data[elem]} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col my-3" style={{ minWidth: "310px" }}>
          <div className="home-item p-4 px-5" style={{ lineHeight: "23px" }}>
            <h3 className="text-center mb-3">Навык Алисы</h3>
            <p>
              Алиса поможет Вам выучить стихотворение любой сложности и длины.
              <br />
              Среди огромной библиотеки авторов и стихотворений Вы сможете найти
              подходящее именно Вам.
              <br />
              Переходите в навык “Зубрилка” и убедитесь в этом сами!
            </p>
            <p>
              Возвращайтесь, записывайте свою версию стиха и становитесь лучшим
              чтецом!
            </p>
            <div className="text-center">
              <a href="https://dialogs.yandex.ru/">
                <img src={AliceIcon} alt="alice" className="mt-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="col my-3" style={{ minWidth: "310px" }}>
          <div className="home-item p-4 px-5" style={{ lineHeight: "23px" }}>
            <h3 className="text-center mb-3">Стихотворение дня</h3>
            <VerseOfDay />
          </div>
        </div>
      </div>
    </Container>
  );
}

function HomeTableTr(props) {
  //todo
  return (
    <tr>
      <th style={{ border: "none" }}>{props.id + 1}</th>
      <td style={{ border: "none" }}>{props.data.userId}</td>
      <td style={{ border: "none" }}>{props.data.records[0].rating}</td>
    </tr>
  );
}

export default Home;
