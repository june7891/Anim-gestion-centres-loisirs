import React from 'react'
import '../../styles/homepage/homepage.scss'
import logo from '../../images/Logo_white.svg';

const Homepage = () => {


  return (
    <>
    <div className='top-page'>
    <div className='links'>
        <ul>
        <li><a href="">Se connecter</a></li>
        <li><a href="">Créer un compte</a></li>
    </ul> 
    </div>
   
    <div className='img-container'><img src={logo} alt="Anim+" /></div>
    

    </div>
    <div className='login-form'>
        <form  action="">
            <input className='mb-20' type="email" placeholder='email' />
            <input className="mb-20" type="password" placeholder='mot de passe' />
            <button className='btn'>Se connecter</button>
        </form>
    </div>
    <div className='bottom-page'>
 
    </div>
    </>
  )
}

export default Homepage