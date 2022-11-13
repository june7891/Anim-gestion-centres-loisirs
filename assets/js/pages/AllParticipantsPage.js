import React from 'react'

import logo from '../../images/Logo_blue.svg';
import ParticipantsList from '../components/ParticipantsList';
import { Link } from "react-router-dom";


const ActivityPage = () => {


  return (
    <>
          <nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                      
                      <li> <Link to="/add-activity">Créer une activité</Link> </li>
                      <li> <Link to="/all-activities">Mes activités</Link>  </li>
                      <li> <Link to="/">Se déconnecter</Link></li>
                 </ul>
             </div>
      </nav>
      <div><ParticipantsList /></div>
     
      </>
    


  )
}

export default ActivityPage