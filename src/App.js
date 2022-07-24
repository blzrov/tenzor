import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Rating from "./Rating";
import Catalog from "./Catalog";
import Example from "./Example";
import Error33 from "./Error";
import PostIdPage from "./components/PostIdPage";
import RatingOnVerse from "./components/RatingOnVerse";
import LoggingPage from "./LoggingPage";
import OauthPage from "./OauthPage";
import { getUserInfo } from "./services";

function App() {
  const [accessToken, setAccessToken] = useState("");

  const handleTokenData = (tokenData) => {
    console.log(1);
    if (tokenData.error) {
      alert("Произошла ошибка");
    } else {
      console.log(2);
      console.log(tokenData);
      const { access_token, expires_in, refresh_token } = tokenData;
      setAccessToken(access_token);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    getUserInfo(accessToken);
  }, [accessToken]);

  return (
    <div className="site">
      <Nav />
      <div className="site-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/oauth"
            element={<OauthPage handleTokenData={handleTokenData} />}
          />
          <Route path="/rating" element={<Rating />} />
          <Route path="/example" element={<Example />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/logs" element={<LoggingPage />} />
          <Route path="/poem">
            <Route path=":id" element={<PostIdPage />} />
            <Route path=":id/rating" element={<RatingOnVerse />} />
          </Route>
          <Route path="/*" element={<Error33 to="/error33" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
