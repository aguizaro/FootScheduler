import { Link } from "react-router-dom";
import { logo } from "../../public/dumbbell.tsx";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">{logo}</div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/schedule">Schedule</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
