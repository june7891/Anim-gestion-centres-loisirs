import React from 'react'


import addIcon from '../../images/add-icon.svg';


const ActivityForm = () => {
  return (
    <>
 
     

    <div className='form-container'>
        <form action="">
        <div className='left'>
            <label htmlFor="activity_name">Nom de l'activité</label>
            <input type="text" name="activity_name" id="activity_name" />
            <label htmlFor="reference">Code de référence</label>
            <input type="text" name="reference" id="reference" />
           
            <select name="type" id="type">
                <option value="">APS du soir</option>
                <option value="">ALSH Mercredi</option>
                <option value="">ALSH Vacances</option>
                <option value="">Séjour de vacances</option>
                <option value="">Sortie adolescents</option>
                <option value="">Sortie Familles</option>
            </select>

            <label htmlFor="capacity"> Capacité d'accueil/Places disponibles</label>
           <input type="text" name="capacity" id="capacity" />

            <label htmlFor="started_at"> Heure du début</label>
           <input type="time" name="started_at" id="started_at" />
            <label htmlFor="ending_at"> Heure de fin</label>
           <input type="time" name="ending_at" id="ending_at" />
           </div>
            <div className='right'>
            <h3>Jours</h3>
        
             <label><input className='checkbox'  type="checkbox" name="monday" id="monday" /> 
           Lundi</label>
            
            <label><input className='checkbox'  type="checkbox" name="tuesday" id="tuesday" /> 
          Mardi</label>
            
            <label><input className='checkbox' type="checkbox" name="wednesday" id="wednesday" /> 
            Mercredi</label>
            
            <label><input className='checkbox'  type="checkbox" name="thursday" id="thursday" /> 
            Jeudi</label>
            
            <label><input className='checkbox'  type="checkbox" name="friday" id="friday" /> 
            Vendredi</label>
            
            <label><input className='checkbox'  type="checkbox" name="saturday" id="saturday" /> Samedi</label> 
           

            </div>
            

           <div className='save-button'><p>Enregistrer la nouvelle activité</p><a href=""><img src={addIcon} alt="" /></a></div>
        </form>
    </div>
    </>
    
  )
}

export default ActivityForm