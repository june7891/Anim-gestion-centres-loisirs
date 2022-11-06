import React, { useState } from 'react'
import '../../styles/activity/activity.scss'
import logo from '../../images/Logo_blue.svg';
import ActivityForm from './ActivityForm';
import Listings from './Listings';

const Activity_page = () => {
    const [index, setIndex] = useState(0);

  return (
    <>
          <nav>
              <a href="/homepage"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                      <li onClick={() => { setIndex(0) } }> Mes dossiers</li>
                      <li onClick={() => { setIndex(1) } }> Mes activités </li>
                      <li> <a href="">Se déconnecter</a></li>
                 </ul>
             </div>
      </nav>
      <div hidden={index != 0}><ActivityForm /></div>
      <div hidden={index != 1}><Listings /></div>
      </>
    


  )
}

export default Activity_page