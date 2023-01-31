import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import logo from '../../images/Logo_blue.svg';
import { Link } from "react-router-dom";
import activityIcon from '../../images/activity-icon.svg';
import SecondaryNavBar from "../components/SecondaryNavBar.js"

const ActivityDetails = () => {


  const [activity, setActivity] = useState([]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const loggedInUser = window.user;
    if (loggedInUser) {
      setUser(loggedInUser?.["roles"]);
      // console.log(user[0]);
    }
  }, []);


  let params = useParams();
  const id = params.id;

  useEffect(() => {
      const getActivity = async () => {
        await axios.get(`/api/activities/${id}`)
        .then (response => {
          // console.log(response.data);
          const data = response.data;
          setActivity(data);
         
        })
        };
      getActivity();
    }, [id]);

 
    
    Date.prototype.getFullMinutes = function () {
      if (this.getMinutes() < 10) {
          return '0' + this.getMinutes();
      }
      return this.getMinutes();
   };

    const startedAt = new Date(activity.startedAt).getHours() + ':' + new Date(activity.startedAt).getFullMinutes();
    const endedAt = new Date(activity.endedAt).getHours() + ':' + new Date(activity.endedAt).getFullMinutes();

  return (
    <>

<SecondaryNavBar/>

    <section>
  <div className="container py-5">

  <h3>Fiche de l'activité</h3>
    

    <div className="row">
      <div className="col-lg-4 text-center">
        <div className="card details-card mb-4">
          <div className="card-body text-center">
          <div className='icon-container'>
            <img src={activityIcon} alt="avatar"
              className="img-fluid" />
              </div>
            <h5 className="my-3">{activity.name} </h5>
            <p className="text-muted mb-1 sub-title"> N° de référence:</p>
            <p className="text-muted mb-3"> {activity.reference}</p>
            <p className="text-muted mb-1 sub-title"> Periode: </p>
            <p className='text-muted'> {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}</p>
            
          </div>
        </div>
        
        <div className='activity-btn-container mb-4 d-flex flex-column'>
        {user[0] === "ROLE_USER" ? (
                  ""
                ) : (<a className='modification-btn mb-3' href={`/activity-modification-form/${activity.id}`}>Modifier l'activité</a>)}
           <a className='modification-btn' href={`/activity/list/${activity.id}`}>Liste des participants de l'activité</a>
      </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Capacité d'accueil</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{activity.capacity}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Horaires</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{startedAt} - {endedAt} </p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prix</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{activity.price} €</p>
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