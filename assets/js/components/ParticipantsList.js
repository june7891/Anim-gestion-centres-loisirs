import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import viewIcon from "../../images/view.svg"
import removeIcon from "../../images/remove-icon-red.svg";
import modifyIcon from "../../images/icon-modify.svg"
import alphabetIcon from "../../images/a-z-blue.svg"
import alphabetReverseIcon from "../../images/z-a-red.svg";
import loadingIcon from '../../images/Loading_icon.gif';
import DeleteParticipantModal from './DeleteParticipantModal';

const ParticipantsList = () => {

  const [participants, setParticipants] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [user, setUser] = useState([]);
  const [hideDeleteModal, setHideDeleteModal]= useState(false);
  const [participantId, setParticipantId] = useState(0);

  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const inputSelectFilter = useRef(null);

  const handleInput = (e) => {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());

  };

  useEffect(() => {
    const loggedInUser = window.user;
    if(loggedInUser) {
      setUser(loggedInUser?.['roles']);
      // console.log(user[0]);
    }
  })

  useEffect(() => {
    const loggedInUser = window.user;
    const enterprise = loggedInUser?.['enterprise'];
      // console.log(enterprise);
      setLoading(true);
  axios.get(`/api/participants?enterprise=${enterprise}`)
  .then((response) => {
    // console.log(response.data['hydra:member']);
    setParticipants(response.data['hydra:member']);
    setLoading(false);
    
  })
  axios.get(`/api/school_types`)
  .then((response) => {
    // console.log(response.data['hydra:member']);
    setSchoolTypes(response.data['hydra:member']);
    
  })
  
  }, [])

  



    // order filter

    const handleParticipantsFilter = (event) => {
      // console.log(event.target.value)
      const loggedInUser = window.user;
      const enterprise = loggedInUser?.['enterprise'];
    
      if(event.target.value === "alphabet") {
     console.log('it works!')
          axios.get(`/api/participants?enterprise=${enterprise}`)
          .then((response) => {
           
            setParticipants(response.data['hydra:member'].sort((a, b) => a.lastname.localeCompare(b.lastname)));
            // console.log(data);
          })
      }
      if(event.target.value === "alphabetReverse") {
    
          axios.get(`/api/participants?enterprise=${enterprise}`)
          .then((response) => {
           
            setParticipants(response.data['hydra:member'].sort((a, b) => b.lastname.localeCompare(a.lastname)));
            // console.log(data);
          })
      }
      if(event.target.value === "Maternelle") {
    
          axios.get(`/api/participants?enterprise=${enterprise}&schoolType.type=${event.target.value}`)
          .then((response) => {
           
            setParticipants(response.data['hydra:member']);
            // console.log(data);
          })
      }
      if(event.target.value === "Elémentaire") {
    
          axios.get(`/api/participants?enterprise=${enterprise}&schoolType.type=${event.target.value}`)
          .then((response) => {
           
            setParticipants(response.data['hydra:member']);
            // console.log(data);
          })
      }
      if(event.target.value === "Collège") {
    
          axios.get(`/api/participants?enterprise=${enterprise}&schoolType.type=${event.target.value}`)
          .then((response) => {
           
            setParticipants(response.data['hydra:member']);
            // console.log(data);
          })
      }
      if(event.target.value === "Lycée") {
    
          axios.get(`/api/participants?enterprise=${enterprise}&schoolType.type=${event.target.value}`)
          .then((response) => {
           
            setParticipants(response.data['hydra:member']);
            // console.log(data);
          })
      }
  
     
     }

     const hide = (id) => {
      if (hideDeleteModal) {
        setHideDeleteModal(false);
      } else {
        setHideDeleteModal(true);
        setParticipantId(id);
      }
    };
  
  
  
    const deleteParticipant = () => {
      axios.delete(`/api/participants/${participantId}`)
      .then(response => {
        // console.log(response);
        hide();
        location.reload()
      });
    }
  

  return (
    <>
    {participants && participants.length === 0 ? <h4>Vous n'avez aucun participant enregistré</h4> :<h3>Mes participants</h3>}

  <div className='filter-bar'>
      <input type="text" className='search-input' onInput={handleInput}  placeholder='Rechercher par le nom'/>

    <div className='filter-icons'>
      <input className="order-btn" type="image" src={alphabetIcon} value="alphabet" ref={inputSelectFilter} onClick={handleParticipantsFilter}/>
      <input className="order-btn" type="image" src={alphabetReverseIcon} value="alphabetReverse" ref={inputSelectFilter} onClick={handleParticipantsFilter}/>
  </div>
 </div>
    
    <div className='mt-5 filter-school-type-buttons'>
      <h5>Trier par type d'école</h5>
    {schoolTypes.map((schoolType) => (
      <button key={schoolType.id} className="login-btn" value={schoolType.type} onClick={handleParticipantsFilter}>{schoolType.type}</button>
    ))}
    
    </div>

      <table className="table mx-auto my-5">
  <thead className="thead-dark">
    <tr>
      <th className="col">#</th>
      <th className="col-2">Nom</th>
      <th className="col-2">Prénom</th>
      <th className="col-2">Classe</th>
      <th className="col">Voir</th>
      {user[0] === "ROLE_USER" ? ("") : (<th className="col">Supprimer</th>)}
      {user[0] === "ROLE_USER" ? ("") : (<th className="col">Modifier</th>)}
    </tr>
  </thead>

  <tbody>

{ loading ? <img className='loading-icon' src={loadingIcon}/> : participants.filter(participant =>participant.lastname.toLowerCase().startsWith(filter)).map((participant, index) => (
  <tr key={participant.id}>
      <th className="col">{index+1}</th>
      <td className="col-2">{participant.lastname}</td>
      <td className="col-2">{participant.firstname}</td>
      <td>{participant.schoolLevel?.level}</td>
      <td><a href={`/participant-details/${participant.id}`}><img className='my-buttons' src={viewIcon} alt="" /></a></td>
      {user[0] === "ROLE_USER" ? ("") : (<td className="col"><img className='remove-btn' src={removeIcon} alt="" onClick={() => hide(participant.id)}></img></td>)}
      {user[0] === "ROLE_USER" ? ("") : (<td><a href={`/participant-modification-form/${participant.id}`}><img className='my-buttons' src={modifyIcon} alt="" /></a></td>)}
    </tr>
))}
    

  </tbody>
</table>

{hideDeleteModal && (
        <DeleteParticipantModal hideModal={hide} delete={deleteParticipant} />
      )}
    </>
  )
}

export default ParticipantsList