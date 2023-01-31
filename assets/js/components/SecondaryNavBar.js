import React from "react";
import logo from "../../images/Logo_blue.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <a href="/">
        <img src={logo} alt="anim+" />
      </a>
      <div className="links">
        <ul>
          <li>
            {" "}
            <Link to="/all-participants">Mes participants</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/all-activities">Mes activités</Link>{" "}
          </li>

          <li>
            {" "}
            <a href="/logout">Se déconnecter</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
