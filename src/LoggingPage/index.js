import React, { useEffect, useMemo, useState } from "react";
import { connect } from "socket.io-client";
import "./style.css";

const LoggingPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [io, setIo] = useState();
  const [logs, setLogs] = useState([]);

  const currentLogContent = useMemo(
    () => JSON.stringify(logs[logs.length - 1], null, 2),
    [logs]
  );
  const prevLogContent = useMemo(
    () => (logs.length < 2 ? null : JSON.stringify(logs[0], null, 2)),
    [logs]
  );

  const updateLogs = (newLog) => {
    setLogs((x) => {
      x.push(newLog);
      if (x.length > 2) x = x.slice(1);
      return [...x];
    });
  };

  const selectUser = (userId) => {
    setCurrentUserId(userId);
    setLogs([]);
  };

  useEffect(() => {
    // const io = connect("http://localhost:3001/");
    const io = connect("https://zoobrilka-alice-skill.herokuapp.com/");
    io.emit("users:get");

    io.on("users", (users) => {
      console.log("get users");
      console.log(users);
      setUsers(users);
    });

    io.on("logs:update", (log) => {
      console.log(log);
      updateLogs(log);
    });

    setIo(io);

    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!currentUserId || !io) return;
    io.emit("user:set", currentUserId);
  }, [currentUserId]);

  return (
    <div className="logging_page__wrapper">
      <div className="logging_page__users_list_wrapper">
        <span>Выберите юзера</span>
        <ul
          className="logging_page__users_list"
          onClick={(e) => selectUser(e.target.id)}
        >
          {users.map((userId) => (
            <li
              className={[
                "users_list__item",
                userId === currentUserId ? "users_list__item_selected" : null,
              ].join(" ")}
              key={userId}
              id={userId}
            >
              {userId}
            </li>
          ))}
        </ul>
      </div>
      <div className="logging_page__log_content_wrapper">
        <span>Текущий лог</span>
        <pre>{currentLogContent}</pre>
      </div>
      <div className="logging_page__log_content_wrapper">
        <span>Прошлый лог</span>
        <pre>{prevLogContent ?? "Лога нет"}</pre>
      </div>
    </div>
  );
};

export default LoggingPage;
