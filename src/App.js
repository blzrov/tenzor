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

function App() {
  return (
    <div className="site">
      <Nav />
      <div className="site-content">
        <Routes>
          <Route exands path="/" element={<Home />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/example" element={<Example />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/log" element={<LoggingPage />} />
          {[...Array(50000).keys()].map((elem) => (
            <>
              <Route
                key={elem}
                path={`/${elem}`}
                element={<PostIdPage id={elem} />}
              />
              <Route
                path={`/${elem}/rating`}
                element={<RatingOnVerse id={elem} />}
              />
            </>
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
