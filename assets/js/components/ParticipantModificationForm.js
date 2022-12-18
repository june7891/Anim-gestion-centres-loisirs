import React, {useState, useEffect} from 'react'

import { useParams } from "react-router-dom";
import axios from 'axios';

import '../../styles/participant/participant.scss';
import EasyEdit, {Types} from 'react-easy-edit';
import SecondaryNavBar from "../components/SecondaryNavBar.js"

const ParticipantModificationForm = () => {

    const [participant, setParticipant] = useState([]);
    const [parentOne, setParentOne] = useState([]);
    const [parentTwo, setParentTwo] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        const getParticipant = async () => {
          await axios.get(`/api/participants/${id}`)
          .then (response => {
            console.log(response.data);
            const data = response.data;
            setParticipant(data);
            console.log(data.ParentOne);
            setParentOne(data.ParentOne);
            setParentTwo(data.ParentTwo);
            setParticipantActivities(data.activities);
          })
          };
        getParticipant();
      }, [id]);

  
    
      
      const [schoolLevels, setSchoolLevels] = useState([]);
      const [schoolTypes, setSchoolTypes] = useState([]);
      const [activities, setActivities] = useState([]);
      const [participantActivities, setParticipantActivities] = useState([]);
      const [user, setUser] = useState();
      
      
    
      useEffect(() => {
        const loggedInUser = window.user;
        if(loggedInUser) {
          setUser(loggedInUser?.['@id']);
        }
      })
  
    
    
      useEffect(() => {
        axios.get('/api/school_levels')
          .then((response) => {
              // console.log(response.data);
              setSchoolLevels(response.data['hydra:member']);
          })
      
       axios.get('/api/school_types')
          .then((response) => {
              // console.log(response.data);
              setSchoolTypes(response.data['hydra:member']); 
          })
    
          const loggedInUser = window.user;
          const enterprise = loggedInUser?.['enterprise'];
            console.log(user);
       axios.get(`/api/activities?enterprise=${enterprise}`)
          .then((response) => {
              // console.log(response.data);
              setActivities(response.data['hydra:member']); 
          })
             }, [])


             // easyEdit

             const save = (value) => {console.log(value)}
             const cancel = () => {console.log("Cancelled")}

             const updateParticipantFirstname= (value) => {
                  // console.log(value)
                  axios.put(`/api/participants/${id}`, {
                    firstname: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParticipantLastname = (value) => {
                  // console.log(value)
                  axios.put(`/api/participants/${id}`, {
                    lastname: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParticipantDateOfBirth = (value) => {
                  // console.log(value)
                  axios.put(`/api/participants/${id}`, {
                    dateOfBirth: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateSchoolName = (value) => {
                  // console.log(value)
                  axios.put(`/api/participants/${id}`, {
                    schoolName: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParticipantAddress = (value) => {
                  // console.log(value)
                  axios.put(`/api/participants/${id}`, {
                    address: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParticipantPostalCode = (value) => {
                  // console.log(value)
                  axios.put(`/api/participants/${id}`, {
                    postalCode: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParticipantCity = (value) => {
                  // console.log(value)
                  axios.put(`/api/participants/${id}`, {
                    city: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentOneLastname = (value) => {
                  // console.log(value)
                  const id = parentOne.id;
                 
                  axios.put(`/api/parent_ones/${id}`, {
                    lastName: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentOneFirstname = (value) => {
                  // console.log(value)
                  const id = parentOne.id;
                 
                  axios.put(`/api/parent_ones/${id}`, {
                    firstName: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentOneEmail = (value) => {
                  // console.log(value)
                  const id = parentOne.id;
                 
                  axios.put(`/api/parent_ones/${id}`, {
                    email: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentOnePhoneNumber = (value) => {
                  // console.log(value)
                  const id = parentOne.id;
                 
                  axios.put(`/api/parent_ones/${id}`, {
                    phoneNumber: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentTwoPhoneNumber = (value) => {
                  // console.log(value)
                  const id = parentTwo.id;
                 
                  axios.put(`/api/parent_twos/${id}`, {
                    phoneNumber: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentTwoLastname = (value) => {
                  // console.log(value)
                  const id = parentTwo.id;
                 
                  axios.put(`/api/parent_twos/${id}`, {
                    lastName: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentTwoFirstname = (value) => {
                  // console.log(value)
                  const id = parentTwo.id;
                 
                  axios.put(`/api/parent_twos/${id}`, {
                    firstName: value
                  })
                  .then(function (response) {
                  console.log(response)
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateParentTwoEmail = (value) => {
                  // console.log(value)
                  const id = parentTwo.id;
                 
                  axios.put(`/api/parent_twos/${id}`, {
                    email: value
                  })
                  .then(function (response) {
                  console.log(response)
                  location.reload();
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }
             const updateActivities = (value) => {
                  console.log(value)
                  const id = participant.id;
                 
                  axios.put(`/api/participants/${id}`, {
                    activities: value
                  })
                  .then(function (response) {
                  console.log(response)
                  location.reload();
                  })
                  .catch(function (error) {
                  console.log(error);
              })
             }



             function getOptions() {
              const options = [];
              activities.map((activity, index) => {
                (options[index] = {label: activity.name, value: activity['@id']})
              })
              // console.log(options);
              return options;
             }

           

        

  return (
<>

<SecondaryNavBar/>



    <section>
  <div className="container py-5">

  <h3>Modification des information</h3>
    

    <div className="row">
      <div className="col-lg-4">
        <div className="card details-card  mb-4">
          <div className="card-body text-center">
          <div className='profile-image-container'>
          {participant.image &&  <img src={ require(`../../../public/images/uploads/participants_files/${participant.image}`)} alt={participant.image} className="img-fluid" />}
              </div>
            <h5 className="my-3">{participant.lastname} {participant.firstname}</h5>
            <p className="text-muted mb-1">{participant.schoolLevel?.level}</p>
            <p className="text-muted mb-4"> <EasyEdit
                  type={Types.TEXT}
                  onSave={updateSchoolName}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "schoolName", id: 1}}
                  placeholder={participant.schoolName}
                  value={participant.schoolName}
                  /></p>
       
          </div>
        </div>

        <div className='profile-btn-container'>
           <p><a className='modification-btn' href={`/participant-details/${participant.id}`}>Voir la fiche de renseignements</a></p>
              
          </div>
       
      </div>
      <div className="col-lg-8">
        <div className="card mb-4 participant-detail-card-body">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
           
              </div>
              <div className="col-sm-9">
             
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantLastname}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "lastname", id: 1}}
                  placeholder={participant.lastname}
                  value={participant.lastname}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0"></p>
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantFirstname}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "firstname", id: 2}}
                  placeholder={participant.firstname}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Date de naissance</p>
              
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.DATE}
                  onSave={updateParticipantDateOfBirth}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "dateOfBirth", id: 1}}
                  placeholder={new Date(participant.dateOfBirth).toLocaleDateString()}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Adresse</p>
              </div>
              <div className="col-sm-9">
              
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantAddress}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "address", id: 1}}
                  placeholder={participant.address}
                
                  />
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantPostalCode}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "postalCode", id: 1}}
                  placeholder={participant.postalCode}
        
                  />
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantCity}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "city", id: 1}}
                  placeholder={participant.city}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p className="details-title" >PARENT 1</p>
            </div>
            </div>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOneLastname}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentOne.lastName", id: 1}}
                  placeholder={parentOne.lastName}
                  />
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOneFirstname}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentOne.firstName", id: 1}}
                  placeholder={parentOne.firstName}
                  />
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOneEmail}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentOne.email", id: 1}}
                  placeholder={parentOne.email}
                  />
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">N° de téléphone</p>
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOnePhoneNumber}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentOne.phoneNumber", id: 1}}
                  placeholder={parentOne.phoneNumber}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p className="details-title">PARENT 2</p>
            </div>
            </div>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoLastname}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentTwo.lastName", id: 1}}
                  placeholder={parentTwo.lastName}
                  />
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoFirstname}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentTwo.firstName", id: 1}}
                  placeholder={parentTwo.firstName}
                  />
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-6">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoEmail}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentTwo.email", id: 1}}
                  placeholder={parentTwo.email}
                  />
              </div>
             
            </div>
            <hr/>
           
              
            <div className="row">
            <div className="col-sm-3">
                <p className="mb-0">N° de téléphone</p>
              </div>
              <div className="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoPhoneNumber}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "parentTwo.phoneNumber", id: 1}}
                  placeholder={parentTwo.phoneNumber}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Inscrit(e) aux activités suivantes</p>
              </div>
              <div className="col-sm-9">
              {participantActivities?.length == 0 ? <p className="text-muted mb-0">Aucune activité</p> : participantActivities?.map((activity) => (
                
                <p className="text-muted mb-0">{activity.name}</p>
                
                ))}
                </div>

                <div className="col-sm-3">
                <p className="mb-0">Ajouter</p>
              </div>
              <div className="col-sm-9">
                <EasyEdit
                  type={Types.CHECKBOX}
                  options={getOptions()}
                  onSave={updateActivities}
                  onCancel={cancel}
                  saveButtonLabel="Modifier"
                  cancelButtonLabel="Annuler"
                  attributes={{ name: "actitvities", id: 1}}
                  placeholder={"Modifier les activités"}
                  instructions="Cochez les activités"
                  />
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

export default ParticipantModificationForm