import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home.tsx";
import Schedule from "./pages/Schedule.tsx";
import About from "./pages/About.tsx";

ReactDOM.createRoot(document.getElementById("container")!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/schedule" Component={Schedule} />
        <Route path="/about" Component={About} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);
