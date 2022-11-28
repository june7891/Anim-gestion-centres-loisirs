import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const ActivityList = () => {

  const [activity, setActivity] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [checked, setChecked] = useState([]);


  
const handleCheckCount = (e, item) => {

  if (e.target.checked) {
    setChecked([...checked, item]);
  } 
 
  else {
    setChecked((prev) =>
      prev.filter((currItem) => currItem.value !== item.value)
    );
  }


    
}

console.log(checked.length);



  let params = useParams();
  const id = params.id;

  useEffect(() => {
    const getActivity = async () => {
      await axios.get(`/api/activities/${id}`)
      .then (response => {
        console.log(response.data);
        const data = response.data;
        setActivity(data);
        setParticipants(data.participants)
       
      })
      };
    getActivity();
  }, [id]);


  return (
    <>

  <div className=''>

      <h3 className=''>{activity.name}</h3>
      <p className=''>Date: {new Intl.DateTimeFormat('fr-FR', {weekday:"long"}).format(new Date())} {new Date().toLocaleDateString()}</p>
  </div>
  
    <table className="table">
<thead className="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nom</th>
    <th scope="col">Prénom</th>
    <th scope="col">Présence</th>
    <th scope="col">Départ</th>
  </tr>
</thead>
<tbody>
{participants.map((participant, index) => (
  <tr>
    <th key={participant.id} scope="row">1</th>
    <td>{participant.firstname}</td>
    <td>{participant.lastname}</td>
    <td><input type="checkbox" id={participant['@id']} name="present" value={participant['@id']} onChange={(e) => handleCheckCount(e, participant.id)}/></td>
    <td><input type="checkbox" name="departure" id="" /></td>
  </tr>
))}
  





</tbody>
<tfoot>
    <tr>
      <td></td>
      <td></td>
      <th>Total</th>
      <td>{checked.length > 0 ? checked.length : null}</td>
    </tr>
  </tfoot>
</table>


  </>
  )
}

export default ActivityList