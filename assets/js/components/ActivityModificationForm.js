
import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import activityIcon from '../../images/activity-icon.svg';
import EasyEdit, {Types} from 'react-easy-edit';
import SecondaryNavBar from "../components/SecondaryNavBar.js"

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
      const endedAt = new Date(activity.endedAt).getHours() + ':' + new Date(activity.endedAt).getMinutes();
  

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
      const updateStartHour = (value) => {
        console.log(value)
        axios.put(`/api/activities/${id}`, {
          startedAt: value
        })
        .then(function (response) {
        console.log(response)
        })
        .catch(function (error) {
        console.log(error);
    })
   }
      const updateEndHour = (value) => {
        // console.log(Number(value))
        axios.put(`/api/activities/${id}`, {
          endedAt: value
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
    <SecondaryNavBar/>

  <section>
<div className="container py-5">
  

  <div className="row">
    <div className="col-lg-4">
      <div className="card mb-4">
        <div className="card-body text-center">
          <img src={activityIcon} alt="avatar"
            className="img-fluid" />
          <h5 className="my-3">   <EasyEdit
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
          <p className="text-muted mb-1"> N° de référence:
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
          <p className="text-muted mb-1"> Periode: 
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
    <div className="col-lg-8">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Capacité d'accueil</p>
            </div>
            <div className="col-sm-9">
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
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Horaires</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">
                  <EasyEdit
                  type="time"
                  onSave={updateStartHour}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "startedAt", id: 1}}
                  placeholder={startedAt}
                  value={startedAt}
                  /> - <EasyEdit
                  type="time"
                  onSave={updateEndHour}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "endedAt", id: 1}}
                  placeholder={endedAt}
                  value={endedAt}
                  /> 
                   </p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Prix</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">  
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