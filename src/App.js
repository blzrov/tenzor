import React, { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Rating from "./Rating";
import Catalog from "./Catalog";
import Example from "./Example";
import Error33 from "./Error";
import PostIdPage from "./components/PostIdPage";
import RatingOnVerse from "./components/RatingOnVerse";
import LoggingPage from "./LoggingPage";
import OauthPage from "./OauthPage";
import UserController from "./models/UserController";

const CurrentUser = createContext(new UserController());

function App() {
  const currentUser = useContext(CurrentUser);
  const nav = useNavigate();

  const submitCode = async (code) => {
    await (await currentUser.doLogin(code)).getUserInfo();
  };

  useEffect(() => {
    currentUser.getUserInfo();
  }, []);

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="site">
        <Nav />
        <div className="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/oauth"
              element={<OauthPage submitCode={submitCode} />}
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
    </CurrentUser.Provider>
  );
}

export { CurrentUser };

export default App;
