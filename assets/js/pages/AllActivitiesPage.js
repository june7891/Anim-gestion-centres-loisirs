import React, { useState } from 'react'

import logo from '../../images/Logo_blue.svg';
import AllActivities from '../components/AllActivities';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ActivityForm from '../components/ActivityForm';


const ActivityPage = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
          <nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                      <li><Link to ="/all-participants">Mes participants</Link> </li>
                      <li onClick={handleShow}>Créer une activité </li>
                      <li><Link to="/">Se déconnecter</Link></li>
                 </ul>
             </div>
      </nav>
      <div><AllActivities /></div>


      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal dialogClassName="activity-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crééz votre activité</Modal.Title>
        </Modal.Header>
        <Modal.Body> <div><ActivityForm/></div></Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
           Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>


     
      </>
    


  )
}

export default ActivityPage