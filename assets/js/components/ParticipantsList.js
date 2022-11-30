import axios from 'axios';
import React, {useEffect, useState} from 'react';
import viewIcon from "../../images/view.svg"
import removeIcon from "../../images/icon-remove.svg"
import modifyIcon from "../../images/icon-modify.svg"
const ParticipantsList = () => {

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const loggedInUser = window.user;
    const user = loggedInUser?.['@id'];
      console.log(user);
  axios.get(`/api/participants?user=${user}`)
  .then((response) => {
    // console.log(response.data['hydra:member']);
    setParticipants(response.data['hydra:member']);
    
  })
  
  }, [])
  // console.log(participants);
  
  const handleDelete = (id) => {
    axios.delete(`/api/participants/${id}`)
    .then(response => {
      console.log(response);
      location.reload()
    });

  }
  return (
    <>
      <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">Classe</th>
      <th scope="col">Voir</th>
      <th scope="col">Supprimer</th>
      <th scope="col">Modifier</th>
    </tr>
  </thead>
  <tbody>

{participants.map((participant) => (
  <tr key={participant.id}>
      <th scope="row">{participant.id}</th>
      <td>{participant.lastname}</td>
      <td>{participant.firstname}</td>
      <td>{participant.schoolLevel?.level}</td>
      <td><a href={`/participant-details/${participant.id}`}><img className='my-buttons' src={viewIcon} alt="" /></a></td>
      <td ><img className='remove-btn' src={removeIcon} alt="" onClick={() => handleDelete(participant.id)}></img></td>
      <td><a href={`/participant-modification-form/${participant.id}`}><img className='my-buttons' src={modifyIcon} alt="" /></a></td>
    </tr>
))}
    

  </tbody>
</table>


    </>
  )
}

export default ParticipantsList