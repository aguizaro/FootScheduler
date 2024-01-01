import React from "react";
import { logo } from "../../public/dumbbell.tsx";
import "../css/navbar.css";

const Navbar = () => {
  //console.log(import.meta.env.VITE_APP_BASE_PATH);
  return (
    <nav className="navbar">
      <div className="logo">{logo}</div>
      <ul className="nav-links">
        <li>
          <a href={`/home`}>Home</a>
        </li>
        <li>
          <a href={`/schedule`}>Schedule</a>
        </li>
        <li>
          <a href={`/about`}>About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
