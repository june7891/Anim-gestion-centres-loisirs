import React, {useState, useEffect} from 'react'
import '../../styles/activity/activity.scss'
import viewIcon from "../../images/view.svg"
import removeIcon from "../../images/remove-icon-red.svg"
import modifyIcon from "../../images/icon-modify.svg"
import axios from 'axios';
import activityIcon from '../../images/activity-icon.svg';
import loadingIcon from '../../images/Loading_icon.gif';

const AllActivities = () => {

  const [enterprise, setEnterprise] = useState();
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);



 


  useEffect(() => {
    const loggedInUser = window.user;
    if(loggedInUser) {
      setUser(loggedInUser?.['roles']);
      console.log(user[0]);
    }
  })



  useEffect(() => {
    const loggedInUser = window.user;
    console.log(loggedInUser);
    const enterprise = loggedInUser?.['enterprise'];
      console.log(enterprise);
      setLoading(true)

  axios.get(`/api/activities?enterprise=${enterprise}`)
  .then((response) => {
    // console.log(response.data['hydra:member']);
    
    setActivities(response.data['hydra:member']);
    setLoading(false)
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
   
   {activities.length === 0 ? <h4>Vous n'avez aucune activité enregistrée!</h4> : <h3>Mes activités</h3>}

<div className='cards-container'>
{loading ? <img className='loading-icon' src={loadingIcon}/> : activities.map((activity) => (

    
        <div className='card'>
          <div className='icon-container'>
            <img src={activityIcon} alt="" />
          </div>
          <div className='title'>{activity.name}</div>
          <div className='btn-container'>
          <a href={`/activity-details/${activity.id}`}><img className='my-buttons' src={viewIcon} alt="" /></a>
          {user[0] === 'ROLE_USER' ? '' : <><img className='remove-btn my-buttons' src={removeIcon} alt="" onClick={() => handleDelete(activity.id)}></img> 
          <a href={`/activity-modification-form/${activity.id}`}><img className='my-buttons' src={modifyIcon} alt="" /></a></>}
          </div>
        </div>


        ))}

        </div>

  </>
  )
}

export default AllActivities