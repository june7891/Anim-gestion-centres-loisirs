import React from 'react'
// import '../../styles/homepage/homepage.scss'
import logo from '../../images/Logo_white.svg';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Login = () => {

  const initialValues = {
    email:'',
    password:''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
    .email("Format de email n'est pas valide")
    .required('Champs obligatoire'),
      
    password: Yup.string()
    .required('Champs obligatoire')
  })


  const onSubmit = values => {
    console.log(values);

    axios.post('api/login', values)
    .then(response=> {
      console.log(response.headers);
    })
    .catch(error => {
      console.log(error.response.data.error)
      
      })
  }

  return (
    <>
    <div className='top-page'>
    <div className='links'>
        <ul>
        <li><a href="/login">Se connecter</a></li>
        <li><a href="/signup">Créer un compte</a></li>
        <li><a href="/api/logout">Se déconnecter</a></li>
    </ul> 
    </div>
   
    <div className='img-container'><a href="/"><img src={logo} alt="Anim+" /></a></div>
    

    </div>
 <div className='login-form'>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
          formik => {
            return <Form className='form'>
            <input className='mb-20' type="email" name="email" placeholder='Email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}  />
            {formik.touched.email && formik.errors.email ? <p className='error'>{formik.errors.email}</p> : null}
            <input className="mb-20" type="password" name='password' placeholder='Mot de passe' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}  />
            {formik.touched.password && formik.errors.password ? <p className='error'>{formik.errors.password}</p> : null}
            <button className='login-btn' type='submit' disabled={!formik.isValid}>Se connecter</button>
           </Form>
           
          }
        }
    </Formik>
 </div>




   
        
            
       
   
    <div className='bottom-page'>
 
    </div>
    </>
  )
}

export default Login