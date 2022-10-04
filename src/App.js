import React, { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rating from "./pages/Rating";
import Catalog from "./Catalog";
import ErrorPage from "./pages/ErrorPage";
import MyProfile from "./pages/MyProfile";
import PostIdPage from "./pages/PostIdPage";
import RatingOnVerse from "./components/RatingOnVerse";
import LoggingPage from "./LoggingPage";
import OauthPage from "./OauthPage";
import ServerController from "./models/serverController";

const ServerControllerContext = createContext(new ServerController());
const CurrentUserContext = createContext(null);

function App() {
  const serverController = useContext(ServerControllerContext);
  const [currentUser, setCurrentUser] = useState(null);
  const submitCode = async (code) => {
    (await serverController.doLogin(code)).getUserInfo().then(setCurrentUser);
  };

  useEffect(() => {
    serverController.getUserInfo().then(setCurrentUser);
  }, []);

  return (
    <ServerControllerContext.Provider value={serverController}>
      <CurrentUserContext.Provider value={currentUser}>
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
              <Route path="/myProfile" element={<MyProfile />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/logs" element={<LoggingPage />} />
              <Route path="/poem">
                <Route path=":id" element={<PostIdPage />} />
                <Route path=":id/rating" element={<RatingOnVerse />} />
              </Route>
              <Route path="/*" element={<ErrorPage to="/error33" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </ServerControllerContext.Provider>
  );
}

export { ServerControllerContext, CurrentUserContext };

export default App;
