import React from 'react'
import '../../styles/account/account.scss'
import logo from '../../images/Logo_blue.svg';
import activityIcon from '../../images/activity-icon.svg';
import addIcon from '../../images/add-icon.svg';
import foldersIcon from '../../images/folders-icon.svg';
import { Link } from "react-router-dom";

const Account_page = () => {
  return (
    <>
     <nav>
        <a href="/homepage"><img src={logo} alt="" /></a> 
        <div className="links">
            <ul>
            <li>Bonjour, user12345!</li>
            <li><Link to="/">Se déconnecter</Link></li>
        </ul>
        </div>
        
    </nav>
       <div className='cards-container'>
       <a href="/all-activities">
        <div className='card'>
          <div className='icon-container'>
            <img src={activityIcon} alt="" />
          </div>
          <div className='title'>Mes activités</div>
        </div>
        </a>
   
       
        <a href="/all-participants">
        <div className='card'>
          <div className='icon-container'>
          <img  className="img-participant" src={foldersIcon} alt="" />
          </div>
          <div className='title'>Mes participants</div>
        </div>
        </a>
       </div> 
    </>
    

  )
}

export default Account_page