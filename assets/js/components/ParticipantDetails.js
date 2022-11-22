import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import logo from '../../images/Logo_blue.svg';
import { useParams } from "react-router-dom";
import axios from 'axios';
import avatar from '../../images/avatar.svg';
import '../../styles/participant/participant.scss'


const ParticipantDetails = () => {

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