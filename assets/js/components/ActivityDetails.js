import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import logo from '../../images/Logo_blue.svg';
import { Link } from "react-router-dom";
import activityIcon from '../../images/activity-icon.svg';
import SecondaryNavBar from "../components/SecondaryNavBar.js"

const ActivityDetails = () => {


  const [activity, setActivity] = useState([]);


  let params = useParams();
  const id = params.id;

  useEffect(() => {
      const getActivity = async () => {
        await axios.get(`/api/activities/${id}`)
        .then (response => {
          console.log(response.data);
          const data = response.data;
          setActivity(data);
         
        })
        };
      getActivity();
    }, [id]);

    const startedAt = new Date(activity.startedAt).getHours() + ':' + new Date(activity.startedAt).getMinutes();
    const endedAt = new Date(activity.startedAt).getHours() + ':' + new Date(activity.endedAt).getMinutes();



  return (
    <>

<SecondaryNavBar/>

    <section>
  <div class="container py-5">

  <h3>Fiche de l'activité</h3>
    

    <div class="row">
      <div class="col-lg-4">
        <div class="card details-card mb-4">
          <div class="card-body text-center">
          <div className='icon-container'>
            <img src={activityIcon} alt="avatar"
              class="img-fluid" />
              </div>
            <h5 class="my-3">{activity.name} </h5>
            <p class="text-muted mb-1"> N° de référence: {activity.reference}</p>
            <p class="text-muted mb-1"> Periode: {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}</p>
            
          </div>
        </div>
        <a className='activity-list-btn' href={`/activity/list/${activity.id}`}>Liste des participants de l'activité</a>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Capacité d'accueil</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{activity.capacity}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Horaires</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{startedAt} - {endedAt} </p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Prix</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{activity.price}</p>
              </div>
            </div>
            <hr/>
          
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default ActivityDetails