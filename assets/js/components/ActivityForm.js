import React from 'react'

import addIcon from '../../images/add-icon.svg';

const ActivityForm = () => {
  return (
    <>
        

    <div className='form-container'>
        <form action="">
            <label htmlFor="activity_name">Nom de l'activité</label>
            <input type="text" name="activity_name" id="activity_name" />
            <label htmlFor="reference">Référence</label>
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


            <label htmlFor="days">Jours</label>
            <div className='days-container'>
            <input type="checkbox" name="monday" id="monday" /> 
            <label htmlFor="Monday">Lundi</label>

            <input type="checkbox" name="tuesday" id="tuesday" /> 
            <label htmlFor="tuesday">Mardi</label>

            <input type="checkbox" name="wednesday" id="wednesday" /> 
            <label htmlFor="wednesday">Mercredi</label>

            <input type="checkbox" name="thursday" id="thursday" /> 
            <label htmlFor="thursday">Jeudi</label>

            <input type="checkbox" name="friday" id="friday" /> 
            <label htmlFor="friday">Vendredi</label>

            <input type="checkbox" name="saturday" id="saturday" /> 
            <label htmlFor="saturday">Samedi</label>
            </div>

           <div className='save-button'><p>Enregistrer la nouvelle activité</p><a href=""><img src={addIcon} alt="" /></a></div>
        </form>
    </div>
    </>
    
  )
}

export default ActivityForm