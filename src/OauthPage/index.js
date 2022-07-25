import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OauthPage = ({ submitCode }) => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  // const submitCode = async (code) => {
  //   const tokenData = await getTokenData(code);
  //   if (tokenData) handleTokenData(tokenData);
  //   nav("..");
  // };

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (!code && !error) return nav("..");
    if (error) return alert("Произошла ошибка");
    submitCode(code);
    nav("..");
  }, []);

  return <div>Загрузка...</div>;
};

export default OauthPage;
