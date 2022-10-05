import React, { useContext, useEffect } from "react";
import VerseOfDay from "../components/VerseOfDay";
import AliceIcon from "../components/img/alice-icon.png";
import { ServerControllerContext } from "../App";

export default function HomePage() {
  const serverController = useContext(ServerControllerContext);

  useEffect(() => {
    getUsersRecords();
  }, []);

  const [usersRecords, setUsersRecords] = React.useState("");
  const getUsersRecords = async () => {
    const data = await serverController?.getUsersRecords(0);
    if (!data || !data.length) return;
    setUsersRecords(data);
  };

  return (
    <div>
      <div
        className="row mb-2 p-5 minW text-white"
        style={{
          borderRadius: "30px",
          background:
            "linear-gradient(256.02deg, #4E22BC -10.04%, #8063A5 93.08%)",
        }}
      >
        <div className="col">
          <h1 className="h1-count">34 590</h1>
          <p>стихотворений по разным темам</p>
        </div>
        <div className="col">
          <h2>Заучивание и прослушивание стихотворений с Алисой</h2>
          <p>легко и просто для любого возраста</p>
        </div>
      </div>

      <div className="row">
        <div className="col my-3 minW">
          <div className="home-item py-4 px-5">
            <h3 className="mb-3 text-center">Рейтинг</h3>
            <table className="table">
              <tbody>
                {!!usersRecords &&
                  [...Array(Math.min(usersRecords.length, 8)).keys()].map(
                    (i) => (
                      <HomeTableTr
                        key={usersRecords[i].userId}
                        index={i}
                        data={usersRecords[i]}
                      />
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col my-3 minW">
          <div className="home-item py-4 px-5">
            <h3 className="mb-3 text-center">Навык Алисы</h3>
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
              <a
                href="https://dialogs.yandex.ru/store/skills/55879c59-demo-uchitel?utm_source=site&utm_medium=badge&utm_campaign=v1&utm_term=d1"
                target="_blank"
                rel="noreferrer"
              >
                <img src={AliceIcon} alt="alice" className="mt-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="col my-3 minW">
          <div className="home-item py-4 px-5">
            <h3 className="mb-3 text-center">Стихотворение дня</h3>
            <VerseOfDay />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeTableTr(props) {
  if (!props.data) return;
  return (
    <tr>
      <th style={{ border: "none" }}>{props.index + 1}</th>
      <td style={{ border: "none" }}>{props.data.records[0].ownerName}</td>
      <td style={{ border: "none" }}>{props.data.userRating}</td>
    </tr>
  );
}
