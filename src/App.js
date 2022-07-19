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
          {[...Array(50000).keys()].map((elem) => (
            <Route
              key={elem}
              path={`/${elem}`}
              element={<PostIdPage id={elem} />}
            />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
