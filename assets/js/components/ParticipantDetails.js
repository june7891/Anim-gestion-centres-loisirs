import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import logo from '../../images/Logo_blue.svg';
import { useParams } from "react-router-dom";
import axios from 'axios';
import avatar from '../../images/avatar.svg';
import '../../styles/participant/participant.scss'
import {useFormik} from 'formik';
import * as Yup from 'yup'



const ParticipantDetails = () => {

    const [participant, setParticipant] = useState([]);
    const [parentOne, setParentOne] = useState([]);
    const [parentTwo, setParentTwo] = useState([]);
    const [activities, setActivities] = useState([]);

    let params = useParams();
    const id = params.id;

    const initialValues = {
      image: ""
  }

  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}

  const onSubmit = values => {
    console.log(values.image);

    const formData = new FormData();
    formData.append('image', values.image);


    axios({method: "post",
            url: `/api/participants/${id}/image`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
  })
    .then(function (response) {
    console.log(response.data)
  
    })
    .catch(function (error) {
    console.log(error);
})

  }

  const formik = useFormik({
    initialValues,
    onSubmit
  });

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
            setActivities(data.activities);
          })
          };
        getParticipant();
      }, [id]);


  console.log(activities);

  return (
<>


<nav>
              <a href="/"><img src={logo} alt="" /> </a>
              <div className="links">
                  <ul>
                        <li> <Link to="/all-participants">Mes participants</Link> </li>
                      <li> <Link to="/all-activities">Mes activités</Link> </li>
                    
                      <li> <Link to="/">Se déconnecter</Link></li>
                 </ul>
             </div>
      </nav>

    <section>
  <div class="container py-5">
    

    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src={participant.image} alt={participant.image}
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
                <p class="text-muted mb-0">{participant.lastname}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Prénom</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{participant.firstname}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Adresse</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{participant.address}, {participant.postalCode} {participant.city}</p>
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
                <p class="text-muted mb-0">{parentOne?.lastName}</p>
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Prénom</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{parentOne?.firstName}</p>
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{parentOne?.email}</p>
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">N° de téléphone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{parentOne?.phoneNumber}</p>
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
                <p class="text-muted mb-0">{parentTwo?.lastName}</p>
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Prénom</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{parentTwo?.firstName}</p>
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{parentTwo?.email}</p>
              </div>
            </div>
            <hr/>
           
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">N° de téléphone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{parentTwo?.phoneNumber}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Inscrit(e) aux activités suivantes</p>
              </div>
              
              {activities?.map((activity) => (
                <div class="col-sm-9">
                <p class="text-muted mb-0">{activity.name}</p>
                 </div>
                ))}
               
             
            </div>
            <hr/>

           


            <div className='row-9'>

            <h3>Joindre les pièces complémentaires</h3>

              <form onSubmit={formik.handleSubmit}>
            <label htmlFor="photo">Photo</label>
            <input type="file" id="photo" name="image" accept="image/png, image/jpeg" onChange={(e) => formik.setFieldValue('image', e.target.files[0])}/>

            {/* <label htmlFor="fiche_sanitaire">Fiche sanitaire</label>
            <input type="file" id="fiche_sanitaire" name="ficheSanitaire" accept="image/png, image/jpeg, .pdf" onChange={(e) => formik.setFieldValue('ficheSanitaire', e.target.files[0])}/>

            <label htmlFor="vaccination">Vaccins</label>
            <input type="file" id="vaccination" name="vaccination" accept="image/png, image/jpeg, .pdf" onChange={(e) => formik.setFieldValue('vaccination', e.target.files[0])}/>

            <label htmlFor="insurance">Assurance</label>
            <input type="file" id="insurance" name="insurance" accept="image/png, image/jpeg, .pdf" onChange={(e) => formik.setFieldValue('insurance', e.target.files[0])}/> */}
                
                <button type="submit">Enregistrer</button>
            </form>
          </div>
       
            
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