const getTokenData = async (code) => {
  const body = `grant_type=authorization_code&code=${code}&client_id=250a4b68f4b9439696580f24d1daa8f7&client_secret=2e25c4b9ec6e4cd6931018051362a96b`;
  const res = await fetch(`https://oauth.yandex.ru/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })
    .then((res) => res.json())
    .catch(console.error);
  return res ?? null;
};
//?oauth_token=${token}
const getUserInfo = async (token) => {
  console.log(3);
  const params = {
    method: "GET",
    // Authorization: "OAuth AQAAAAAq0WpQAAhChs52VS--YUDtkT_tdVqpMtg",
    headers: new Headers({
      // Authorization: "OAuth AQAAAAAq0WpQAAhChs52VS--YUDtkT_tdVqpMtg",
      // Host: "oauth.yandex.ru",
    }),
  };
  const res = await fetch(
    `https://login.yandex.ru/info?oauth_token=${token}`,
    params
  )
    .then((res) => res.json())
    .catch(console.error);
  console.log(res);
};

export { getTokenData, getUserInfo };
