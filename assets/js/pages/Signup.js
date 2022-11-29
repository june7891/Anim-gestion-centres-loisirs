import React from 'react'
// import '../../styles/homepage/homepage.scss'
import logo from '../../images/Logo_white.svg';

const Signup = () => {


  return (
    <>
    <div className='top-page'>
    <div className='links'>
        <ul>
        <li><a href="/login">Se connecter</a></li>
        <li><a href="/signup">Créer un compte</a></li>
    </ul> 
    </div>
   
    <div className='img-container'><a href="/"><img src={logo} alt="Anim+" /></a></div>
    

    </div>
    <div className='signup-form'>
        <form  action="">
            <input className='mb-20' type="email" placeholder='email' />
            <input className="mb-20" type="password" placeholder='mot de passe' />
            <input className="mb-20" type="password" placeholder='répéter mot de passe' />
            <button className='login-btn'>S'inscrire</button>
        </form>
    </div>
    <div className='bottom-page'>
 
    </div>
    </>
  )
}

export default Signup