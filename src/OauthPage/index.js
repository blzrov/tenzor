import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OauthPage = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const getToken = async (code) => {
    const res = await fetch(
      `https://oauth.yandex.ru/token?grant_type=authorization_code&code=${code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              "250a4b68f4b9439696580f24d1daa8f7:2e25c4b9ec6e4cd6931018051362a96b"
            ),
        },
      }
    )
      .then((res) => res.json())
      .catch(console.error);
    res ? console.log(res) : alert("Ошибка");
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (!code && !error) return nav("..");
    if (error) return alert("Произошла ошибка");
    getToken(code);
  }, []);

  // console.log();
  //   if(!searchParams.code)
  return <div>Загрузка...</div>;
};

export default OauthPage;
