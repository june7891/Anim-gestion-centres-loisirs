import React, { useState } from 'react'

import logo from '../../images/Logo_blue.svg';
import AllActivities from '../components/AllActivities';
import { Link } from "react-router-dom";



const ActivityPage = () => {


  return (
    <>
          <nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                      <li><Link to ="/all-participants">Mes dossiers </Link> </li>
                      <li> <Link to="/add-activity">Créer une activité</Link></li>
                      <li><Link to="/">Se déconnecter</Link></li>
                 </ul>
             </div>
      </nav>
      <div><AllActivities /></div>
     
      </>
    


  )
}

export default ActivityPage