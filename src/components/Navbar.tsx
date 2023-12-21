// Navbar.tsx
import { Link } from "react-router-dom";
import { logo } from "../../public/dumbbell.tsx";

const Navbar = () => {
  const basePath = import.meta.env.BASE_URL;
  console.log(basePath);

  return (
    <nav className="navbar">
      <div className="logo">{logo}</div>
      <ul className="nav-links">
        <li>
          <Link to={`${basePath}/home`}>Home</Link>
        </li>
        <li>
          <Link to={`${basePath}/schedule`}>Schedule</Link>
        </li>
        <li>
          <Link to={`${basePath}/about`}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
