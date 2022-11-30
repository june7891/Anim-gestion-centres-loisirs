import React, { useState } from 'react'

import logo from '../../images/Logo_blue.svg';
import ActivityForm from '../components/ActivityForm';
import { Link } from "react-router-dom";



const ActivityPage = () => {


  return (
    <>
          <nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                      
                      <li> <Link to='/all-participants'>Mes dossiers</Link> </li>
                      <li> <Link to='/all-activities'>Mes activités</Link> </li>
                      <li><a href="/logout">Me déconnecter</a></li>
                 </ul>
             </div>
      </nav>
      <div><ActivityForm /></div>
     
      </>
    


  )
}

export default ActivityPage