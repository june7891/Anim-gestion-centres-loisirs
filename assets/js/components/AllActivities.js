import React, {useState, useEffect} from 'react'
import '../../styles/activity/activity.scss'
import viewIcon from "../../images/view.svg"
import removeIcon from "../../images/remove-icon-red.svg"
import modifyIcon from "../../images/icon-modify.svg"
import axios from 'axios';
import activityIcon from '../../images/activity-icon.svg';

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
   
   <h3>Mes activités</h3>

<div className='cards-container'>
{activities.map((activity) => (

    
        <div className='card'>
          <div className='icon-container'>
            <img src={activityIcon} alt="" />
          </div>
          <div className='title'>{activity.name}</div>
          <div className='btn-container'>
          <a href={`/activity-details/${activity.id}`}><img className='my-buttons' src={viewIcon} alt="" /></a>
          <img className='remove-btn my-buttons' src={removeIcon} alt="" onClick={() => handleDelete(activity.id)}></img>
          <a href={`/activity-modification-form/${activity.id}`}><img className='my-buttons' src={modifyIcon} alt="" /></a>
          </div>
        </div>


        ))}

        </div>

  </>
  )
}

export default AllActivities