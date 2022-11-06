import React from 'react'
import '../../styles/account/account.scss'
import logo from '../../images/Logo_blue.svg';
import activityIcon from '../../images/activity-icon.svg';
import addIcon from '../../images/add-icon.svg';
import foldersIcon from '../../images/folders-icon.svg';


const Account_page = () => {
  return (
    <>
     <nav>
        <a href="/homepage"><img src={logo} alt="" /></a> 
        <div className="links">
            <ul>
            <li>Bonjour, user12345!</li>
            <li><a href="">Se déconnecter</a></li>
        </ul>
        </div>
        
    </nav>
       <div className='cards-container'>
       <a href="">
        <div className='card'>
          <div className='icon-container'>
            <img src={activityIcon} alt="" />
          </div>
          <div className='title'>Accéder à mes activités</div>
        </div>
        </a>
        <a href="/addNewActivity">
        <div className='card'>
          <div className='icon-container'>
          <img className='img-add' src={addIcon} alt="" />
          </div>
          <div className='title'>Créer une nouvelle activité</div>
        </div>
        </a>
        <a href="">
        <div className='card'>
          <div className='icon-container'>
          <img src={foldersIcon} alt="" />
          </div>
          <div className='title'>Gerer mes dossiers</div>
        </div>
        </a>
       </div> 
    </>
    

  )
}

export default Account_page