import React from 'react'
import logo from '../../images/Logo_blue.svg';

const NavBar = () => {
  return (
    <nav>
    <a href="/"><img src={logo} alt="anim+" /></a> 
    <div className="links">
        <ul>
        <li>Bonjour, {user.email}</li>
        <li> <a href="/user-account">Mon compte</a></li>
        <li> <a href="/logout">Me déconnecter</a></li>
    </ul>
    </div>
    
</nav>
  )
}

export default NavBar