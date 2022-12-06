
import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import logo from '../../images/Logo_blue.svg';
import { Link } from "react-router-dom";
import activityIcon from '../../images/activity-icon.svg';
import EasyEdit, {Types} from 'react-easy-edit';

const ActivityModificationForm = () => {
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
  

      const cancel = () => {console.log("Cancelled")}

      const updateCapacity = (value) => {
        // console.log(Number(value))
        axios.put(`/api/activities/${id}`, {
          capacity: Number(value)
        })
        .then(function (response) {
        console.log(response)
        })
        .catch(function (error) {
        console.log(error);
    })
  }
      const updatePrice = (value) => {
        // console.log(Number(value))
        axios.put(`/api/activities/${id}`, {
          price: Number(value)
        })
        .then(function (response) {
        console.log(response)
        })
        .catch(function (error) {
        console.log(error);
    })
  }
      const updateName = (value) => {
        // console.log(Number(value))
        axios.put(`/api/activities/${id}`, {
          name: value
        })
        .then(function (response) {
        console.log(response)
        })
        .catch(function (error) {
        console.log(error);
    })
   }
      const updateReference = (value) => {
        // console.log(Number(value))
        axios.put(`/api/activities/${id}`, {
          reference: value
        })
        .then(function (response) {
        console.log(response)
        })
        .catch(function (error) {
        console.log(error);
    })
   }
      const updateStartDate = (value) => {
        // console.log(Number(value))
        axios.put(`/api/activities/${id}`, {
          startDate: value
        })
        .then(function (response) {
        console.log(response)
        })
        .catch(function (error) {
        console.log(error);
    })
   }
      const updateEndDate = (value) => {
        // console.log(Number(value))
        axios.put(`/api/activities/${id}`, {
          endDate: value
        })
        .then(function (response) {
        console.log(response)
        })
        .catch(function (error) {
        console.log(error);
    })
   }

  return (
    <>
    <nav>
            <a href="/"><img src={logo} alt="" /> </a>
            <div className="links">
                <ul>
                      <li> <Link to="/all-participants">Mes participants</Link> </li>
                    <li> <Link to="/all-activities">Mes activités</Link> </li>
                  
                    <li> <Link to="/logout">Se déconnecter</Link></li>
               </ul>
           </div>
    </nav>

  <section>
<div class="container py-5">
  

  <div class="row">
    <div class="col-lg-4">
      <div class="card mb-4">
        <div class="card-body text-center">
          <img src={activityIcon} alt="avatar"
            class="img-fluid" />
          <h5 class="my-3">   <EasyEdit
                  type="text"
                  onSave={updateName}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "name", id: 1}}
                  placeholder={activity.name}
                  value={activity.name}
                  />
                  </h5>
          <p class="text-muted mb-1"> N° de référence:
                  <EasyEdit
                  type="text"
                  onSave={updateReference}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "reference", id: 1}}
                  placeholder={activity.reference}
                  value={activity.reference}
                  />
            </p>
          <p class="text-muted mb-1"> Periode: 
                  <EasyEdit
                  type="date"
                  onSave={updateStartDate}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "startDate", id: 1}}
                  placeholder={new Date(activity.startDate).toLocaleDateString()}
                  value={new Date(activity.startDate).toLocaleDateString()}
                  />
                  -
                  <EasyEdit
                  type="date"
                  onSave={updateEndDate}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "endDate", id: 1}}
                  placeholder={new Date(activity.endDate).toLocaleDateString()}
                  value={new Date(activity.endDate).toLocaleDateString()}
                  />
          
          {/* {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()} */}
          
          </p>
     
        </div>
      </div>
     
    </div>
    <div class="col-lg-8">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Capacité d'accueil</p>
            </div>
            <div class="col-sm-9">
              <EasyEdit
                  type="number"
                  onSave={updateCapacity}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "capacity", id: 1}}
                  placeholder={activity.capacity}
                  value={activity.capacity}
                  />
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
              <p class="text-muted mb-0">  
                  <EasyEdit
                  type="number"
                  onSave={updatePrice}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "price", id: 1}}
                  placeholder={activity.price}
                  value={activity.price}
                  /></p>
            </div>
          </div>
          <hr/>
         
         <a href={`/activity/list/${activity.id}`}>Liste des participants de l'activité</a>
         
          
        </div>
      </div>
      
    </div>
  </div>
</div>
</section>
  </>
  )
}

export default ActivityModificationForm