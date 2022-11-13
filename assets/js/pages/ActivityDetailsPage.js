import React, { useState } from 'react'

import logo from '../../images/Logo_blue.svg';

import { Link } from "react-router-dom";
import ActivityDetails from '../components/ActivityDetails';



const ActivityDetailsPage = () => {


  return (
    <>
          <nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                      
                      <li> <Link to='/activity/:id/participants'>Voir la liste des participants</Link> </li>
                      <li> <Link to='/all-activities'>Mes activités</Link> </li>
                      <li><Link to="/">Se déconnecter</Link></li>
                 </ul>
             </div>
      </nav>
      <div><ActivityDetails/></div>
     
      </>
    


  )
}

export default ActivityDetailsPage