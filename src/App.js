import React, { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RatingPage from "./pages/RatingPage";
import CatalogPage from "./pages/CatalogPage";
import ErrorPage from "./pages/ErrorPage";
import MyProfilePage from "./pages/MyProfilePage";
import PoemPage from "./pages/PoemPage";
import RatingOnVerse from "./components/RatingOnVerse";
import LoggingPage from "./LoggingPage";
import OauthPage from "./OauthPage";
import ServerController from "./models/serverController";
import Container from "react-bootstrap/esm/Container";

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
            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rating" element={<RatingPage />} />
                <Route path="/myProfile" element={<MyProfilePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/poem">
                  <Route path=":id" element={<PoemPage />} />
                  <Route path=":id/rating" element={<RatingOnVerse />} />
                </Route>
                <Route
                  path="/*"
                  element={<ErrorPage to="/error33" replace />}
                />

                <Route
                  path="/oauth"
                  element={<OauthPage submitCode={submitCode} />}
                />
                <Route path="/logs" element={<LoggingPage />} />
              </Routes>
            </Container>
          </div>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </ServerControllerContext.Provider>
  );
}

export { ServerControllerContext, CurrentUserContext };

export default App;
