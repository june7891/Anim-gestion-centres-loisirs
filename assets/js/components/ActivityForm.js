import React, {useEffect, useState} from 'react'
import axios from 'axios';

import addIcon from '../../images/add-icon.svg';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import { FormFloating } from 'react-bootstrap';

const ActivityForm = () => {

  const [workingDays, setWorkingDays] = useState([]);

  const initialValues = {
    name:"",
    capacity: 0,
    reference: "",
    startedAt: "",
    endedAt: "",
    price: 0,
    startDate:"",
    endDate:""
}
  
  const onSubmit = values => {
    console.log(values)
 
  //   const refreshPage = ()=>{
  //     window.location.reload();
  //  }
       axios.post("/api/activities", values)
        .then(function (response) {
        console.log(response)
        // refreshPage();
        })
        .catch(function (error) {
        console.log(error);
    })
  
    
  
  }


  

const validationSchema = Yup.object({
  name: Yup.string().required('Champs obligatoire'),
  reference: Yup.string().required('Champs obligatoire')
})

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });







  // useEffect(() => {
  //   axios.get('/api/working_days')
  //     .then((response) => {
  //         console.log(response.data['hydra:member']);
  //         setWorkingDays(response.data['hydra:member']);
  //     })
  
  //        }, [])

  return (
    <>
 
     

    <div className='activity-form-container'>
        <form onSubmit={formik.handleSubmit}>
        <div className='left'>
            <label htmlFor="activity_name">Nom de l'activité</label>
            <input type="text" name="name" id="activity_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            {formik.touched.name && formik.errors.name ? <p className='error'>{formik.errors.name}</p> : null}
            <label htmlFor="reference">Code de référence</label>
            <input type="text" name="reference" id="reference" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.reference}/>
            {formik.touched.reference && formik.errors.reference ? <p className='error'>{formik.errors.reference}</p> : null}

            <label htmlFor="capacity"> Capacité d'accueil/Places disponibles</label>
           <input type="number" name="capacity" id="capacity" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.capacity} />
           
            <label htmlFor="started_at"> Heure du début</label>
           <input type="time" name="startedAt" id="started_at" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startedAt}/>
           

            <label htmlFor="ending_at"> Heure de fin</label>
           <input type="time" name="endedAt" id="ending_at" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endedAt}/>
           </div>
            <div className='right'>
            <h3>Période d'ouverture</h3>
        
            <label htmlFor="startDate"> Date du début</label>
           <input type="date" name="startDate" id="startDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startDate}/>
           

            <label htmlFor="endDate"> Date de fin</label>
           <input type="date" name="endDate" id="endDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate}/>
  

            </div>
            

           <div className='save-button'><p>Enregistrer la nouvelle activité</p><button type='submit'>Enregistrer</button></div>
        </form>
    </div>
    </>
    
  )
}

export default ActivityForm