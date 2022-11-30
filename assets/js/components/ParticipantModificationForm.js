import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import logo from '../../images/Logo_blue.svg';
import { useParams } from "react-router-dom";
import axios from 'axios';
import avatar from '../../images/avatar.svg';
import {useFormik} from 'formik';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup'
import '../../styles/participant/participant.scss';
import EasyEdit, {Types} from 'react-easy-edit';


const ParticipantModificationForm = () => {

    const [participant, setParticipant] = useState([]);
    const [parentOne, setParentOne] = useState([]);
    const [parentTwo, setParentTwo] = useState([]);

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
          })
          };
        getParticipant();
      }, [id]);

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
    
      
      const [schoolLevels, setSchoolLevels] = useState([]);
      const [schoolTypes, setSchoolTypes] = useState([]);
      const [activities, setActivities] = useState([]);
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
          const user = loggedInUser?.['@id'];
            console.log(user);
       axios.get(`/api/activities?user=${user}`)
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
             const updateParentTwoLastname = (value) => {
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
             const updateParentTwoFirstname = (value) => {
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
             const updateParentTwoEmail = (value) => {
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



             function getOptions() {
              const options = [];
              activities.map((activity, index) => {
                (options[index] = {label: activity.name, value: activity['@id']})
              })
              // console.log(options);
              return options;
             }

           

             const participantData = {
              user,
              firstname:"",
              lastname:"",
              dateOfBirth: "",
              schoolLevel: "",
              schoolType: "",
              schoolName:"",
              address:"",
              city:"",
              postalCode:"",
              ParentOne:{
                firstName:"",
                lastName:"",
                phoneNumber:"",
                email:""
               },
               ParentTwo:{
                firstName:"",
                lastName:"",
                phoneNumber:"",
                email:""
              },
              activities: []
            //   emergencyContact: {
            //     // particpantId: ,
            //     firstName:"",
            //     lastName:"",
            //     phoneNumber:""
            // }
          }
            
       
        
          



  return (
<>


<nav>
              <a href="/"><img src={logo} alt="logo" /> </a>
              <div className="links">
                  <ul>
                        <li> <Link to="/all-participants">Mes participants</Link> </li>
                      <li> <Link to="/all-activities">Mes activités</Link> </li>
                      <li> <a href="/logout">Me déconnecter</a></li>
                 </ul>
             </div>
      </nav>

    <section>
  <div class="container py-5">
    

    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src={avatar} alt="avatar"
              class="img-fluid" />
            <h5 class="my-3">{participant.lastname} {participant.firstname}</h5>
            <p class="text-muted mb-1">{participant.schoolLevel?.level}</p>
            <p class="text-muted mb-4">{participant?.schoolName}</p>
       
          </div>
        </div>
       
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Nom de famille</p>
           
              </div>
              <div class="col-sm-9">
             
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantLastname}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "lastname", id: 1}}
                  placeholder={participant.lastname}
                  value={participant.lastname}
                  />
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Prénom</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0"></p>
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantFirstname}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "firstname", id: 2}}
                  placeholder={participant.firstname}
                  />
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Date de naissance</p>
              
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.DATE}
                  onSave={updateParticipantDateOfBirth}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "dateOfBirth", id: 1}}
                  placeholder={participant.dateOfBirth}
                  />
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Adresse</p>
              </div>
              <div class="col-sm-9">
              
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantAddress}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "address", id: 1}}
                  placeholder={participant.address}
                
                  />
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantPostalCode}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "postalCode", id: 1}}
                  placeholder={participant.postalCode}
        
                  />
                <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParticipantCity}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "city", id: 1}}
                  placeholder={participant.city}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p>PARENT 1</p>
            </div>
            </div>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Nom de famille</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOneLastname}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentOne.lastName", id: 1}}
                  placeholder={parentOne.lastName}
                  />
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Prénom</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOneFirstname}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentOne.firstName", id: 1}}
                  placeholder={parentOne.firstName}
                  />
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOneEmail}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentOne.email", id: 1}}
                  placeholder={parentOne.email}
                  />
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">N° de téléphone</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentOnePhoneNumber}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentOne.phoneNumber", id: 1}}
                  placeholder={parentOne.phoneNumber}
                  />
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p>PARENT 2</p>
            </div>
            </div>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Nom de famille</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoLastname}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentTwo.lastName", id: 1}}
                  placeholder={parentTwo.lastName}
                  />
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Prénom</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoFirstname}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentTwo.firstName", id: 1}}
                  placeholder={parentTwo.firstName}
                  />
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoEmail}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentTwo.email", id: 1}}
                  placeholder={parentTwo.email}
                  />
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">N° de téléphone</p>
              </div>
              <div class="col-sm-9">
              <EasyEdit
                  type={Types.TEXT}
                  onSave={updateParentTwoPhoneNumber}
                  onCancel={cancel}
                  saveButtonLabel="Save Me"
                  cancelButtonLabel="Cancel Me"
                  attributes={{ name: "parentTwo.email", id: 1}}
                  placeholder={parentTwo.email}
                  />
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Inscrit(e) aux activités suivantes</p>
              </div>
              <div class="col-sm-9">
                <EasyEdit
                  type={Types.CHECKBOX}
                  options={getOptions()}
                  onSave={save}
                  placeholder="Choisissez les activités"
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