import React, {useState} from 'react'
import axios from 'axios';

const EmailModal = (props) => {


    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
      
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
      
    };
console.log(inputs);
    const handleSubmit = (event) => {
      console.log(inputs);
      event.preventDefault();

      const refreshPage = ()=>{
        window.location.reload();
     }
  
      axios
        .post("https://localhost:8000/api/sendEmail", inputs)
        .then(function (response) {
          console.log(response.data);
          refreshPage();
        });
    };





  return (
    <>
        <form className="text-align" onSubmit={handleSubmit}>
        
            <div className='d-flex'>
       
            <input type="checkbox" name="emailOne" id="emailOne" className=" mb-4" value={props.parentOne} onChange={handleChange} />    
             <label htmlFor='emailOne'>{props.parentOne}</label>
            </div>

            <div className='d-flex'>
           
            <input type="checkbox" name="emailTwo" id="emailTwo" className="mb-4" value={props.parentTwo} onChange={handleChange}/> 
            <label htmlFor="emailTwo">{props.parentTwo}</label>
            </div>
            <textarea className="form-control mb-4" name="message" id="message" cols="30" rows="10" placeholder="Message" require onChange={handleChange}></textarea>
            <button type='submit' className='login-btn'>Envoyer</button>
        </form>
    </>
  )
}

export default EmailModal