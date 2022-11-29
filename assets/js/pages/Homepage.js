import React from 'react'
// import '../../styles/homepage/homepage.scss'
import logo from '../../images/Logo_white.svg';

const Homepage = () => {


  return (
    <>
    <div className='top-page'>
    <div className='links'>
        <ul>
        <li><a href="/login">Se connecter</a></li>
        <li><a href="/signup">Créer un compte</a></li>
    </ul> 
    </div>
   
    <div className='img-container'><a href="/"><img src={logo} alt="Anim+" /></a></div>
    

    </div>
    <div className='description'>
    <h4>c’est une application qui permet au personnel de pointer les présences des participants et enregistrer les dossiers d'inscription. </h4>
 
<p>Elle convient à tous types d’activités : </p> 
 
 <ul>
  <li> Accueil de Loisirs Sans Hébergement ;</li>
  <li>Accueil Périscolaire ;</li>
  <li> Ateliers.</li>
 </ul>

 
<p>Cette application s’adresse également aux différents types de structures : </p>
 
<ul>
  <li> ALSH ;</li>
  <li> Restauration scolaire ;</li>
  <li> Centre de loisirs ;</li>
  <li> Centre social ;</li>
  <li> Garderie périscolaire.</li>
</ul>
 
 


<p>Anim+ est une application simple qui permet de savoir à tout moment qui est présent dans la structure et consulter les dossiers d'inscription.</p>


</div>
  

    <div className='bottom-page'>
 
    </div>
    </>
  )
}

export default Homepage

