import axios from 'axios';
import React, {useEffect, useState} from 'react';
import viewIcon from "../../images/view.svg"
import removeIcon from "../../images/icon-remove.svg"
import modifyIcon from "../../images/icon-modify.svg"
const ParticipantsList = () => {

  const [participants, setParticipants] = useState([]);

  const [filter, setFilter] = useState('');

  const handleInput = (e) => {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());

  };

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

      <input type="text" className='search-input' onInput={handleInput}  placeholder='rechercher'/>
      <select name="" id="">Trier par:</select>
      <table className="table mx-auto my-5">
  <thead className="thead-dark">
    <tr>
      <th class="col">#</th>
      <th class="col-2">Nom</th>
      <th class="col-2">Prénom</th>
      <th class="col-2">Classe</th>
      <th class="col">Voir</th>
      <th class="col">Supprimer</th>
      <th class="col">Modifier</th>
    </tr>
  </thead>
  <tbody>

{participants.filter(participant =>participant.lastname.toLowerCase().includes(filter)).map((participant) => (
  <tr key={participant.id}>
      <th class="col">{participant.id}</th>
      <td class="col-2">{participant.lastname}</td>
      <td class="col-2">{participant.firstname}</td>
      <td>{participant.schoolLevel?.level}</td>
      <td><a href={`/participant-details/${participant.id}`}><img className='my-buttons' src={viewIcon} alt="" /></a></td>
      <td class="col"><img className='remove-btn' src={removeIcon} alt="" onClick={() => handleDelete(participant.id)}></img></td>
      <td><a href={`/participant-modification-form/${participant.id}`}><img className='my-buttons' src={modifyIcon} alt="" /></a></td>
    </tr>
))}
    

  </tbody>
</table>


    </>
  )
}

export default ParticipantsList