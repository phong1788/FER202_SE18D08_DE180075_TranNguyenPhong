import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import News from "./components/News";
import About from "./components/About";
import Contact from "./components/Contact";
import Quiz from "./components/Quiz";
import Navigation from "./components/Navigation";


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
}

export default App;
