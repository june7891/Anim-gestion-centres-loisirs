import React from 'react'
import logo from '../../images/Logo_blue.svg';

const NavBar = () => {
  return (
    <nav>
        <img src={logo} alt="" />
        <div className="links">
            <ul>
            <li>Bonjour, user12345!</li>
            <li><a href="/logout">Se déconnecter</a></li>
        </ul>
        </div>
        
    </nav>
  )
}

export default NavBar