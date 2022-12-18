import React, {useState} from 'react'

const EmailModal = (props) => {


    const [message, setMessage] = useState();


   

const sendMessage = () => {
  const email = props.text;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("message", message);

  axios
    .post("/api/sendEmail", {
      data: formData,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};



  return (
    <>
        <form className="text-align" onSubmit={sendMessage}>
        
            <input type="email"  name="email" className="form-control mb-4" value={props.text} />
            <textarea className="form-control mb-4" name="message" id="message" cols="30" rows="10" placeholder="Message" value={message} require onChange={event => setMessage(event.target.value)}></textarea>
            <button type='submit' className='login-btn'>Envoyer</button>
        </form>
    </>
  )
}

export default EmailModal