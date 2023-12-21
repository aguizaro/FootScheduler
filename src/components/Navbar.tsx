import { Link } from "react-router-dom";
import { logo } from "../../public/dumbbell.tsx";

const Navbar = () => {
  const homeLink = `${import.meta.env["BASE_URL"]}home`;
  const scheduleLink = `${import.meta.env["BASE_URL"]}schedule`;
  const aboutLink = `${import.meta.env["BASE_URL"]}about`;

  <nav className="navbar">
    <div className="logo">{logo}</div>
    <ul className="nav-links">
      <li>
        <Link to={homeLink}>Home</Link>
      </li>
      <li>
        <Link to={scheduleLink}>Schedule</Link>
      </li>
      <li>
        <Link to={aboutLink}>About</Link>
      </li>
    </ul>
  </nav>;
};

export default Navbar;
