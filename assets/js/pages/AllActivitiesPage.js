import React, { useState, useEffect } from 'react'

import logo from '../../images/Logo_blue.svg';
import AllActivities from '../components/AllActivities';
import { Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import ActivityForm from '../components/ActivityForm';
import '../../styles/activity/activity.scss'


const ActivityPage = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState([]);



  useEffect(() => {
    const loggedInUser = window.user;
    if(loggedInUser) {
      setUser(loggedInUser?.['roles'])
    }
  })

  return (
    <>
          <nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                      <li><Link to ="/all-participants">Mes participants</Link> </li>
                      {user[0] === 'ROLE_USER' ? '' : <li onClick={handleShow}>Créer une activité </li>}
                      <li><a href="/logout">Se déconnecter</a> </li>
                 </ul>
             </div>
      </nav>
      <div><AllActivities /></div>



      <Modal dialogClassName="activity-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <h3>Crééz votre activité</h3> </Modal.Title>
        </Modal.Header>
        <Modal.Body> <div><ActivityForm/></div></Modal.Body>
        <Modal.Footer>
      
        
        </Modal.Footer>
      </Modal>


     
      </>
    


  )
}

export default ActivityPage