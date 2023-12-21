import { Link } from "react-router-dom";
import { logo } from "../../public/dumbbell.tsx";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">{logo}</div>
      <ul className="nav-links">
        <li>
          <Link to="/FootScheduler/home">Home</Link>
        </li>
        <li>
          <Link to="/FootScheduler/schedule">Schedule</Link>
        </li>
        <li>
          <Link to="/FootScheduler/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
