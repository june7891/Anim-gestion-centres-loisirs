import React from 'react'

import avatar from '../../images/avatar.svg';

const Details = (participant) => {
  return (
    <>
         <div class="col-lg-4">
        <div class="card details-card mb-4">
          <div class="card-body text-center">
          <div className='icon-container'>          

            <img src={require(participant.image).default} alt="{participant.image}" class="img-fluid" />
              </div>
            <h5 class="my-3">{participant.firstname}</h5>
            <p class="text-muted mb-1">Classe: {participant.schoolLevel?.level}</p>
            <p class="text-muted mb-4">Ecole: {participant?.schoolName}</p>
       
          </div>
        </div>
      
          <p><a className='modification-btn' href={`/participant-modification-form/${participant.id}`}>Modifier la fiche de renseignement</a></p>      
        
      </div>
    </>
  )
}

export default Details