import React from 'react'
import logo from '../../images/Logo_blue.svg';
import { Link } from "react-router-dom";
import imgError from '../../images/404.jpg';


const NotFound = () => {
  return (
    <>
      <nav>
        <a href="/">
          <img src={logo} alt="anim+" />
        </a>
        <div className="links navbar-notfound">
          <ul>
            <li>
              <a href="/register">M'inscrire</a>
            </li>

            <li>
              <a href="/login">Me connecter</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className='error404'>
        <h4>La page demandée n'existe pas!</h4>
        <img src={imgError} alt="error" />
      </div>
    </>
  );
}

export default NotFound