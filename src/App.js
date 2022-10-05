import React, { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage"
import RatingPage from "./pages/RatingPage";
import CatalogPage from "./pages/CatalogPage";
import ErrorPage from "./pages/ErrorPage";
import MyProfilePage from "./pages/MyProfilePage";
import PoemPage from "./pages/PoemPage";
import PoemRatingPage from "./pages/PoemRatingPage"; //to do
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
            <Container className="my-5">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/rating" element={<RatingPage />} />
                <Route path="/myProfile" element={<MyProfilePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/poem">
                  <Route path=":id" element={<PoemPage />} />
                  <Route path=":id/rating" element={<PoemRatingPage />} />
                </Route>
                <Route
                  path="/oauth"
                  element={<OauthPage submitCode={submitCode} />}
                />
                <Route path="/logs" element={<LoggingPage />} />
                <Route path="/*" element={<ErrorPage replace />} />
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
