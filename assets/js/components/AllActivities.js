import React from 'react'
import '../../styles/activity/activity.scss'
import viewIcon from "../../images/view.svg"
import { Link } from "react-router-dom";

const AllActivities = () => {
  return (
    <>
    <table className="table">
<thead className="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nom d'activité</th>
    <th scope="col">Code de référence</th>
    <th scope="col"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">1</th>
    <td>APS</td>
    <td>aps123</td>
    <td><Link to="/activity/1"><img src={viewIcon} alt="" /></Link></td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>ALSH Mercredi</td>
    <td>alsh123</td>
    <td><img src={viewIcon} alt="" /></td>
  </tr>
  <tr>
    <th scope="row">3</th>
    <td>Séjour de vacances</td>
    <td>sdv123</td>
    <td><img src={viewIcon} alt="" /></td>
  </tr>

</tbody>
</table>


  </>
  )
}

export default AllActivities