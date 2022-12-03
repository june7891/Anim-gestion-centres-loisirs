import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';

import addIcon from '../../images/add-icon.svg';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const ActivityForm = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = window.user;
    if(loggedInUser) {
      setUser(loggedInUser?.['@id']);
    }
  })


  const initialValues = {
    user,
    activityDay: 
    [
      {
        activityDate:"",
      }
    ],
    name:"",
    capacity: 0,
    reference: "",
    price:0,
    startedAt: "",
    endedAt: "",
    price: 0,
    startDate: "",
    endDate: "",
}





  const onSubmit = (values, index) => {
  

    values.user = user;
    console.log(values);
  
    

 
    const refreshPage = ()=>{
      window.location.reload();
   }
       axios.post("/api/activities", values)
        .then(function (response) {
        console.log(response)
        refreshPage();
        })
        .catch(function (error) {
        console.log(error.response);
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

// datepicker
// const [selectedDates, setSelectedDates] = useState();
// const [displayDateArray, setDisplayDateArray] = useState([]);
// const [array, setArray] = useState([]);


// const handleChange = (date) => {

//   let myDate = new Date(date).toLocaleDateString();
//   const formatDate = moment().format("YYYY-MM-DD");
//   setSelectedDates(date);
//   setArray(current => [...current, myDate ])
//   setDisplayDateArray(current => [...current, myDate]);

   
// }
// console.log(array);





  return (
    <>
 
     

    <div className='activity-form-container'>
        <form onSubmit={formik.handleSubmit}>
  
            <label htmlFor="activity_name">Nom de l'activité</label>
            <div className="block-1">

                      <input type="text" name="name" id="activity_name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                      {formik.touched.name && formik.errors.name ? <p className='error'>{formik.errors.name}</p> : null}
                      <label htmlFor="reference">Code de référence</label>
                      <input type="text" name="reference" id="reference" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.reference}/>
                      {formik.touched.reference && formik.errors.reference ? <p className='error'>{formik.errors.reference}</p> : null}

            </div>
           
           <div className="block-2">

              <label htmlFor="capacity"> Capacité d'accueil</label>
           <input className='small-input' type="number" name="capacity" id="capacity" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.capacity} />
            
            <label htmlFor="capacity"> Prix</label>
           <input className='small-input' type="number" name="capacity" id="capacity" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />
           </div>

          
           
           <div className="block-3">

                 <label htmlFor="started_at"> Heure du début</label>
                 <input className='small-input' type="time" name="startedAt" id="started_at" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startedAt}/>

                <label htmlFor="ending_at"> Heure de fin</label>
                <input className='small-input' type="time" name="endedAt" id="ending_at" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endedAt}/>
      
           </div>
       
         
            <h4>Période d'ouverture</h4>
        
            <label htmlFor="startDate"> Date du début</label>
           <input className='medium-input' type="date" name="startDate" id="startDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startDate}/>
           

            <label htmlFor="endDate"> Date de fin</label>
           <input className='medium-input' type="date" name="endDate" id="endDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate}/>
  
           <h4>Jours d'ouverture</h4>

     
        {/* <div>
          <DatePicker
          name={`activityDay[0]['activityDate']`}
          selected={selectedDates}
          onChange= {date => handleChange(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
          isClearable
           />

        </div>
        <div>
        <div>Dates choisies</div>
        
       {displayDateArray.map((day, index) => (
      <div key={day.id}>
        <input type="checkbox" name={`activityDay[${index}].activityDate`} onChange={formik.handleChange} value={day}/> <label>{day}</label>
      </div>

      
       ))}
        
        </div> */}

           <div className='btn-container' ><p>Enregistrer la nouvelle activité</p><button className='save-button' type='submit'></button></div>
        </form>

     
         {/* <p key={days.id}> {days}</p> */}
    </div>
    </>
   
  )
}

export default ActivityForm