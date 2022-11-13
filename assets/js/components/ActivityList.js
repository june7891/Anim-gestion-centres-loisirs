import React from 'react'

const ActivityList = () => {
  return (
    <>
    <table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nom</th>
    <th scope="col">Prénom</th>
    <th scope="col">Présence</th>
    <th scope="col">Départ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td><input type="checkbox" name="present" id="" /></td>
    <td><input type="checkbox" name="departure" id="" /></td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>Jacob</td>
    <td>Thornton</td>
    <td><input type="checkbox" name="" id="" /></td>
    <td><input type="checkbox" name="" id="" /></td>
  </tr>
  <tr>
    <th scope="row">3</th>
    <td>Larry</td>
    <td>the Bird</td>
    <td><input type="checkbox" name="" id="" /></td>
    <td><input type="checkbox" name="" id="" /></td>
  </tr>
  <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td><input type="checkbox" name="" id="" /></td>
    <td><input type="checkbox" name="" id="" /></td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>Jacob</td>
    <td>Thornton</td>
    <td><input type="checkbox" name="" id="" /></td>
    <td><input type="checkbox" name="" id="" /></td>
  </tr>
  <tr>
    <th scope="row">3</th>
    <td>Larry</td>
    <td>the Bird</td>
    <td><input type="checkbox" name="" id="" /></td>
    <td><input type="checkbox" name="" id="" /></td>
  </tr>

</tbody>
<tfoot>
    <tr>
      <td></td>
      <td></td>
      <th>Total</th>
      <td>256</td>
    </tr>
  </tfoot>
</table>


  </>
  )
}

export default ActivityList