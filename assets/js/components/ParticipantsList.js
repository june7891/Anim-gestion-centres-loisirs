import React from 'react';
import viewIcon from "../../images/view.svg"

const ParticipantsList = () => {
  return (
    <>
      <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td><img src={viewIcon} alt="" /></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td><img src={viewIcon} alt="" /></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td><img src={viewIcon} alt="" /></td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td><img src={viewIcon} alt="" /></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td><img src={viewIcon} alt="" /></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td><img src={viewIcon} alt="" /></td>
    </tr>
  </tbody>
</table>


    </>
  )
}

export default ParticipantsList