import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Rating from "./Rating";
import Catalog from "./Catalog";
import Example from "./Example";
import PostIdPage from "./components/PostIdPage";
import RatingOnVerse from "./components/RatingOnVerse";
import LoggingPage from "./LoggingPage";
import OauthPage from "./OauthPage";

function App() {
  return (
    <div className="site">
      <Nav />
      <div className="site-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oauth" element={<OauthPage />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/example" element={<Example />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/logs" element={<LoggingPage />} />
          <Route path="/poem">
            <Route path=":id" element={<PostIdPage />} />
            <Route path=":id/rating" element={<RatingOnVerse />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
