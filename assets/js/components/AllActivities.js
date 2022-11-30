import React, {useState, useEffect} from 'react'
import '../../styles/activity/activity.scss'
import viewIcon from "../../images/view.svg"
import removeIcon from "../../images/icon-remove.svg"
import modifyIcon from "../../images/icon-modify.svg"
import axios from 'axios';

const AllActivities = () => {

  const [user, setUser] = useState();
  const [activities, setActivities] = useState([]);



 


  // useEffect(() => {
  //   const loggedInUser = window.user;
  //   if(loggedInUser) {
  //     setUser(loggedInUser?.['@id']);
  //     console.log(user);
  //   }
  // })



  useEffect(() => {
    const loggedInUser = window.user;
    const user = loggedInUser?.['@id'];
      console.log(user);
  

  axios.get(`/api/activities?user=${user}`)
  .then((response) => {
    // console.log(response.data['hydra:member']);
    setActivities(response.data['hydra:member']);
    
  })
  
  }, [])






  const handleDelete = (id) => {
    axios.delete(`/api/activities/${id}`)
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
    <th scope="col">Code de référence</th>
    <th scope="col">Nom de l'activité</th>
    <th scope="col">Capacité d'accueil</th>
    <th scope="col">Tarif</th>
    <th scope="col">Voir</th>
    <th scope="col">Supprimer</th>
    <th scope="col">Modifier</th>
  </tr>
</thead>
<tbody>

{activities.map((activity) => (
  <tr key={activity.id}>
      <th scope="row">{activity.reference}</th>
      <td>{activity.name}</td>
      <td>{activity.capacity}</td>
      <td>{activity.price} €</td>
      <td><a href={`/activity-details/${activity.id}`}><img className='my-buttons' src={viewIcon} alt="" /></a></td>
      <td ><img className='remove-btn' src={removeIcon} alt="" onClick={() => handleDelete(activity.id)}></img></td>
      <td><a href={`/activity-modification-form/${activity.id}`}><img className='my-buttons' src={modifyIcon} alt="" /></a></td>
    </tr>
))}

</tbody>
</table>


  </>
  )
}

export default AllActivities