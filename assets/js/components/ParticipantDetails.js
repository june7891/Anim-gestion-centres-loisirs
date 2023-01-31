import React, {useState, useEffect} from 'react'

import { useParams } from "react-router-dom";
import axios from 'axios';

import '../../styles/participant/participant.scss'
import {useFormik} from 'formik';

import SecondaryNavBar from "../components/SecondaryNavBar.js"

import Modal from 'react-bootstrap/Modal';
import EmailModal from './EmailModal';


const ParticipantDetails = () => {

    const [participant, setParticipant] = useState([]);
    const [image, setImage] = useState();
    const [parentOne, setParentOne] = useState([]);
    const [parentTwo, setParentTwo] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loadingReportData, setLoadingReportData] = useState(true);

    const [show, setShow] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    const [user, setUser] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseEmail = () => setShowEmail(false);
    const handleShowEmail = () => setShowEmail(true);


    let params = useParams();
    const id = params.id;

    useEffect(() => {
      const loggedInUser = window.user;
      if(loggedInUser) {
        setUser(loggedInUser?.['roles']);
        // console.log(user[0]);
      }
    })




    useEffect(() => {
    
      axios.get(`/api/participants/${id}`)
        .then (response => {
          // console.log(response.data);
          const data = response.data;
          setParticipant(data);
          // console.log(data.ParentOne);
          setParentOne(data.ParentOne);
          setParentTwo(data.ParentTwo);
          setActivities(data.activities);
         
        })
        
      
   
    }, [id]);

   

    const initialValues = {
      image: "",
      vaccination:"",
      insurance: "",
      ficheSanitaire:""
  }

 

  const onSubmit = values => {
    console.log(values.image);
    console.log(values.vaccination);
    console.log(values.insurance);
    console.log(values.ficheSanitaire);

    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('vaccination', values.vaccination);
    formData.append('insurance', values.insurance);
    formData.append('ficheSanitaire', values.ficheSanitaire);
    console.log(formData);



    axios({method: "post",
            url: `/api/participants/${id}/files`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
  })
    .then(function (response) {
    // console.log(response)
    window.location.reload();
  
    })
    .catch(function (error) {
    console.log(error);
})

  }

  const formik = useFormik({
    initialValues,
    onSubmit
  });

      

  return (
<>

<SecondaryNavBar/>
    <section>
  <div className="container py-5">
  <h3>Fiche de renseignements</h3>

    <div className="row">
      <div className="col-lg-4 text-center">
        <div className="card details-card mb-4">
          <div className="participant-card-body card-body text-center">
          <div className='profile-image-container'>
           {participant.image &&  <img src={ require(`../../../public/images/uploads/participants_files/${participant.image}`)} alt={participant.image} className="img-fluid" />}
            {/* <img src={ require(`../../../public/images/${image}`)} alt={participant.image} class="img-fluid" /> */}
              </div>
            <h5 className="my-3"> {participant.firstname} {participant.lastname}</h5>
            <p className="text-muted mb-1">Classe: {participant.schoolLevel?.level}</p>
            <p className="text-muted mb-4">Ecole: {participant?.schoolName}</p>
       
          </div>
        </div>
{user[0] === "ROLE_USER" ? ("") : (
        <div className='profile-btn-container mb-4'>
           <a className='modification-btn' href={`/participant-modification-form/${participant.id}`}>Modifier la fiche de renseignement</a>
              
            <a className='modification-btn' onClick={handleShowEmail} >Contacter les parents</a>
          </div>)} 

   
        

      <Modal dialogClassName="email-modal" show={showEmail} onHide={handleCloseEmail}>
        <Modal.Header closeButton>
          <Modal.Title> <h3>Contacter la famille</h3> </Modal.Title>
        </Modal.Header>
        <Modal.Body> <EmailModal parentOne={parentOne.email} parentTwo={parentTwo.email}/> </Modal.Body>
      </Modal>
      
       
      </div>

      <div className="col-lg-8">
        <div className="card mb-4 participant-detail-card-body">
          <div className="card-body participant-detail-card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{participant.lastname}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{participant.firstname}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Date de naissance</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{new Date(participant.dateOfBirth).toLocaleDateString()}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Adresse</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{participant.address}, {participant.postalCode} {participant.city}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p className='details-title'>PARENT 1</p>
            </div>
            </div>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{parentOne?.lastName}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{parentOne?.firstName}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-6">
                <p className="text-muted mb-0">{parentOne?.email}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">N° de téléphone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{parentOne?.phoneNumber}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p className='details-title'>PARENT 2</p>
            </div>
            </div>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{parentTwo?.lastName}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{parentTwo?.firstName}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-6">
                <p className="text-muted mb-0">{parentTwo?.email}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">N° de téléphone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{parentTwo?.phoneNumber}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Inscrit(e) aux activités suivantes</p>
              </div>
              <div className="col-sm-9">
              {activities?.length == 0 ? <p className="text-muted mb-0">Aucune activité</p> : activities?.map((activity) => (
                
                <p key={activity.id} className="text-muted mb-0"><a href={`/activity-details/${activity.id}`}>{activity.name}</a></p>
                
                ))}
                </div>
             
            </div>
            <hr/>

           

            {user[0] === "ROLE_USER" ? ("") : (
            <div className='row-9'>

            <p className='details-title'>Joindre les pièces complémentaires</p>
                  <p>(formats png, jpeg autorisés)</p>
              <form onSubmit={formik.handleSubmit} className="file-form">
            <label htmlFor="photo">Photo</label>
            <input type="file" id="photo" name="image" accept="image/png, image/jpeg" onChange={(e) => formik.setFieldValue('image', e.target.files[0])}/>
                
            {participant.image &&   <a href={require(`../../../public/images/uploads/participants_files/${participant.image}`)} download>Télécharger la photo</a>}
            <label htmlFor="fiche_sanitaire">Fiche sanitaire</label>
            <input type="file" id="fiche_sanitaire" name="ficheSanitaire" accept="image/png, image/jpeg" onChange={(e) => formik.setFieldValue('ficheSanitaire', e.target.files[0])}/>
           
            {participant.ficheSanitaire &&   <a href={require(`../../../public/images/uploads/participants_files/${participant.ficheSanitaire}`)} download>Fiche sanitaire</a>}
            <label htmlFor="vaccination">Vaccins</label>
            <input type="file" id="vaccination" name="vaccination" accept="image/png, image/jpeg" onChange={(e) => formik.setFieldValue('vaccination', e.target.files[0])}/>
            
            {participant.vaccination &&   <a href={require(`../../../public/images/uploads/participants_files/${participant.vaccination}`)} download>Vaccins</a>}
            <label htmlFor="insurance">Assurance</label>
            <input type="file" id="insurance" name="insurance" accept="image/png, image/jpeg" onChange={(e) => formik.setFieldValue('insurance', e.target.files[0])}/>
          
            {participant.insurance &&   <a href={require(`../../../public/images/uploads/participants_files/${participant.insurance}`)} download>Assurance</a>}
    
                <button className='login-btn' type="submit">Enregistrer</button>
            </form>
          </div>)}
       
            
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
</section>
</>

  )
}

export default ParticipantDetails