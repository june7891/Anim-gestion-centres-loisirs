import React, {useState, useEffect} from 'react'

import logo from '../../images/Logo_blue.svg';
import ParticipantsList from '../components/ParticipantsList';
import { Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
// import ParticipantForm from '../components/ParticipantForm';
import '../../styles/participant/participant.scss'
import {useFormik} from 'formik';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';

const ParticipantsPage = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  const [schoolLevels, setSchoolLevels] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [activities, setActivities] = useState([]);


  const initialValues = {
    firstname:"",
    lastname:"",
    dateOfBirth: "",
    schoolLevel: "",
    schoolType: "",
    schoolName:"",
    address:"",
    city:"",
    postalCode:"",
    ficheSanitaire:"",
    vaccination:"",
    insurance:"",
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
  
  const onSubmit = values => {
    console.log(values)

    
 
    const refreshPage = ()=>{
      window.location.reload();
   }
       axios.post("/api/participants", values)
        .then(function (response) {
        console.log(response)
        handleClose();
        refreshPage();
        })
        .catch(function (error) {
        console.log(error);
    })
  
    
  
  }


  

const validationSchema = Yup.object({
  firstname: Yup.string().required('Champs obligatoire'),
  lastname: Yup.string().required('Champs obligatoire'),
  dateOfBirth: Yup.string().required('Champs obligatoire'),
  schoolLevel: Yup.string().required('Champs obligatoire'),
  schoolType: Yup.string().required('Champs obligatoire')
})

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });



// console.log(formik.touched);


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
   axios.get('/api/activities')
      .then((response) => {
          // console.log(response.data);
          setActivities(response.data['hydra:member']); 
      })
  
  
  
  
         }, [])
  

  return (
    <>
          <nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                        <li onClick={handleShow}>Ajouter un participant </li>
                      <li> <Link to="/all-activities">Mes activités</Link> </li>
                    
                      <li> <Link to="/">Se déconnecter</Link></li>
                 </ul>
             </div>
      </nav>
      <div><ParticipantsList /></div>


      <Modal dialogClassName="participant-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau participant</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        
        <div className='form-container'>
        <form onSubmit={formik.handleSubmit} >

          <div className="row-1">
       
                <label htmlFor="firstname">Prénom*</label>
                <input type="text" name="firstname" id="firstname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstname}/>
                {formik.touched.firstname && formik.errors.firstname ? <p className='error'>{formik.errors.firstname}</p> : null}
        
                <label htmlFor="lastname">Nom*</label>
                <input type="text" name="lastname" id="lastname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname} />
                {formik.touched.lastname && formik.errors.lastname ? <p className='error'>{formik.errors.lastname}</p> : null}
        
                  <label htmlFor="dateOfBirth"> Date de naissance*</label>
                  <input type="date" name="dateOfBirth" id="dateOfBirth" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dateOfBirth}/>
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <p className='error'>{formik.errors.dateOfBirth}</p> : null}
       


          </div>
           
        <div className="row-2">
      
            <select  name="schoolLevel" id="level" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.schoolLevel}>
                    <option value="">Classe*</option>
                    {schoolLevels.map((level) =>
                    <>
                    <option key={level.id} value={level['@id']}>{level?.level}</option>
                    </>
                    )}
            </select>
            {formik.touched.schoolLevel && formik.errors.schoolLevel ? <div className='error'>{formik.errors.schoolLevel}</div> : null}
   

            <select className='school_type' name="schoolType" id="type"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.schoolType}>
                    <option value="">Type d'école*</option>
                    {schoolTypes.map((type) =>
                    <>
                    <option key={type.id} value={type['@id']}>{type?.type}</option>
                    </>
                    )}
            </select>
            {formik.touched.schoolType && formik.errors.schoolType ? <div className='error'>{formik.errors.schoolType}</div> : null}
           
         

              <label className="school_name"  htmlFor="school_name"> Nom d'école</label>
              <input type="text" name="schoolName" id="school_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.schoolName}/>
         
        </div>
   
        
        <div className="row-3">

          <label htmlFor="address"> Adresse</label>
           <input type="text" name="address" id="address" onChange={formik.handleChange} value={formik.values.address} />

           <label className="city" htmlFor="city"> Ville</label>
           <input type="text" name="city" id="city" onChange={formik.handleChange} value={formik.values.city} />

           <label className='postal_code' htmlFor="postalCode"> Code postale</label>
           <input type="text" name="postalCode" id="postalCode" onChange={formik.handleChange} value={formik.values.postalCode}/>
        </div>

           

           
          

          <h3>Information parents</h3>
          
          <div className="row-4">

          <h5>Parent 1</h5>

          <label className='lastName' htmlFor="lastName"> Nom de famille</label>
          <input type="text" name="ParentOne.lastName" id="lastName" onChange={formik.handleChange} value={formik.values.ParentOne.lastName} />

          <label htmlFor="firstname"> Prénom</label>
          <input type="text" name="ParentOne.firstName" id="firstname" onChange={formik.handleChange} value={formik.values.ParentOne.firstName} />
            
          </div>
      
          <div className="row-5">

            <label htmlFor="phoneNumber"> N° de téléphone</label>
          <input type="text" name="ParentOne.phoneNumber" id="phoneNumber" onChange={formik.handleChange} value={formik.values.ParentOne.phoneNumber}/>

          <label className='email' htmlFor="email"> Email</label>
          <input type="email" name="ParentOne.email" id="email" onChange={formik.handleChange} value={formik.values.ParentOne.email} />
          </div>

          
          <div className="row-6">

          <h5>Parent 2</h5>
          <label className='lastName'  htmlFor="lastName"> Nom de famille</label>
           <input type="text" name="ParentTwo.lastName" id="lastName" onChange={formik.handleChange} value={formik.values.ParentTwo.lastName}/>

          <label htmlFor="firstname"> Prénom</label>
          <input type="text" name="ParentTwo.firstName" id="firstname" onChange={formik.handleChange} value={formik.values.ParentTwo.firstName}/>
          </div>
      
      <div className="row-7">

          <label htmlFor="phoneNumber"> N° de téléphone</label>
          <input type="text" name="ParentTwo.phoneNumber" id="phoneNumber" onChange={formik.handleChange} value={formik.values.ParentTwo.phoneNumber} />

          <label className='email' htmlFor="email"> Email</label>
          <input type="email" name="ParentTwo.email" id="email" onChange={formik.handleChange} value={formik.values.ParentTwo.email} />

      </div>

                      <div className='checkbox-container'>
                      <p>Choisissez vos activités</p>
     
                    {activities.map((activity, index) =>
                      <>
                    <input type="checkbox" name={`activities`} key={activity.id} onChange={formik.handleChange} value={activity['@id']} /> <label>{activity?.name}</label>
                   </>
                    )}
        
                </div>
       

          

          {/* <div className='row-8'>
            <h3>Contact d'urgence</h3>
          <label htmlFor="lastName"> Nom de famille</label>
           <input type="text" name="emergencyContact.lastName" id="lastName" onChange={formik.handleChange} value={formik.values.emergencyContact.lastName} />

          <label htmlFor="firstName"> Prénom</label>
          <input type="text" name="emergencyContact.firstName" id="firstName" onChange={formik.handleChange} value={formik.values.emergencyContact.firstName} />

          <label htmlFor="phoneNumber"> N° de téléphone</label>
          <input type="text" name="emergencyContact.phoneNumber" id="phoneNumber" onChange={formik.handleChange} value={formik.values.emergencyContact.phoneNumber}/>
          </div>
          */}

          

           <div className='save-button'><p>Enregistrer participant</p><button type="submit"></button></div>
        </form>
    </div>
        
        
        
        
        </Modal.Body>
        <Modal.Footer>
    
        </Modal.Footer>
      </Modal>
     
      </>
    


  )
}

export default ParticipantsPage